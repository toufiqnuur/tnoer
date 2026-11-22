import { useEffect, useRef } from 'react'
import vertexShaderSource from './shaders/particle.vert.glsl?raw'
import fragmentShaderSource from './shaders/particle.frag.glsl?raw'

export default function ParticleWaveform({ className = '' }: { className?: string }) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const wrapperEl = wrapperRef.current
		const canvasEl = canvasRef.current
		if (!wrapperEl || !canvasEl) return

		const gl = canvasEl.getContext('webgl2', {
			alpha: true,
			antialias: false,
			premultipliedAlpha: false,
			powerPreference: 'high-performance'
		})
		if (!gl) return

		const wrapper = wrapperEl
		const canvas = canvasEl
		const context = gl

		function compile(type: number, source: string) {
			const shader = context.createShader(type)
			if (!shader) return null
			context.shaderSource(shader, source)
			context.compileShader(shader)
			if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
				context.deleteShader(shader)
				return null
			}
			return shader
		}

		const vertexShader = compile(context.VERTEX_SHADER, vertexShaderSource)
		const fragmentShader = compile(context.FRAGMENT_SHADER, fragmentShaderSource)
		if (!vertexShader || !fragmentShader) return

		const program = context.createProgram()
		if (!program) return

		context.attachShader(program, vertexShader)
		context.attachShader(program, fragmentShader)
		context.linkProgram(program)
		if (!context.getProgramParameter(program, context.LINK_STATUS)) return
		context.useProgram(program)

		const uTime = context.getUniformLocation(program, 'u_time')
		const uMouse = context.getUniformLocation(program, 'u_mouse')
		const uMouseActive = context.getUniformLocation(program, 'u_mouseActive')
		const uResolution = context.getUniformLocation(program, 'u_resolution')
		const uDpr = context.getUniformLocation(program, 'u_dpr')

		const vao = context.createVertexArray()
		const vbo = context.createBuffer()
		context.bindVertexArray(vao)
		context.bindBuffer(context.ARRAY_BUFFER, vbo)
		context.enableVertexAttribArray(0)
		context.vertexAttribPointer(0, 2, context.FLOAT, false, 0, 0)

		context.enable(context.BLEND)
		context.blendFunc(context.ONE, context.ONE)

		const pointer = {
			targetX: 0,
			targetY: 0,
			x: 0,
			y: 0,
			targetActive: 0,
			active: 0
		}
		const size = { w: 0, h: 0, dpr: 1 }
		let columns = 0
		let rows = 0
		let particleCount = 0

		let rafId: number | null = null
		let lastTs = 0
		let startedAt = performance.now()
		let inView = true
		let visible = !document.hidden
		let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

		const shouldRun = () => inView && visible && !reduced

		function buildGrid() {
			columns = Math.max(120, Math.min(260, Math.round(size.w / 6)))
			rows = Math.max(40, Math.min(65, Math.round(size.h / 8)))
			particleCount = columns * rows

			const positions = new Float32Array(particleCount * 2)
			let ptr = 0
			for (let r = 0; r < rows; r++) {
				const z = (r / (rows - 1)) * 2 - 1
				for (let c = 0; c < columns; c++) {
					const x = (c / (columns - 1)) * 2 - 1
					positions[ptr++] = x
					positions[ptr++] = z
				}
			}

			context.bindBuffer(context.ARRAY_BUFFER, vbo)
			context.bufferData(context.ARRAY_BUFFER, positions, context.STATIC_DRAW)
		}

		function render(now: number) {
			rafId = null

			const dt = lastTs ? Math.min((now - lastTs) / 1000, 0.05) : 0.016
			lastTs = now
			const kPointer = 1 - Math.exp(-dt * 5)
			const kActive = 1 - Math.exp(-dt * 3)

			pointer.x += (pointer.targetX - pointer.x) * kPointer
			pointer.y += (pointer.targetY - pointer.y) * kPointer
			pointer.active += (pointer.targetActive - pointer.active) * kActive

			const elapsed = reduced ? 0 : (now - startedAt) * 0.001

			context.clearColor(0, 0, 0, 0)
			context.clear(context.COLOR_BUFFER_BIT)

			if (particleCount > 0) {
				context.bindVertexArray(vao)
				context.uniform1f(uTime, elapsed)
				context.uniform2f(uMouse, pointer.x, pointer.y)
				context.uniform1f(uMouseActive, pointer.active)
				context.uniform2f(uResolution, canvas.width, canvas.height)
				context.uniform1f(uDpr, size.dpr)
				context.drawArrays(context.POINTS, 0, particleCount)
			}

			if (shouldRun()) rafId = requestAnimationFrame(render)
		}

		function syncLoop() {
			if (!shouldRun()) {
				if (rafId !== null) {
					cancelAnimationFrame(rafId)
					rafId = null
				}
				return
			}
			if (rafId === null) rafId = requestAnimationFrame(render)
		}

		function resize() {
			const w = wrapper.clientWidth
			const h = wrapper.clientHeight
			if (w <= 0 || h <= 0) return

			const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
			canvas.width = Math.max(1, Math.floor(w * dpr))
			canvas.height = Math.max(1, Math.floor(h * dpr))
			context.viewport(0, 0, canvas.width, canvas.height)

			size.w = w
			size.h = h
			size.dpr = dpr
			buildGrid()

			if (rafId === null) render(performance.now())
		}

		const resizeObserver = new ResizeObserver(resize)
		resizeObserver.observe(wrapper)

		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				inView = entries[0]?.isIntersecting ?? true
				syncLoop()
			},
			{ threshold: 0 }
		)
		intersectionObserver.observe(wrapper)

		const onVisibility = () => {
			visible = !document.hidden
			syncLoop()
		}

		const onReducedChange = (event: MediaQueryListEvent) => {
			reduced = event.matches
			if (reduced) {
				if (rafId !== null) {
					cancelAnimationFrame(rafId)
					rafId = null
				}
				render(performance.now())
			} else {
				startedAt = performance.now()
				lastTs = 0
				syncLoop()
			}
		}

		const container = wrapper.parentElement ?? wrapper

		const onPointerMove = (event: PointerEvent) => {
			const rect = canvas.getBoundingClientRect()
			if (rect.width <= 0 || rect.height <= 0) return
			pointer.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1
			pointer.targetY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
			pointer.targetActive = 1
		}

		const onPointerReset = () => {
			pointer.targetActive = 0
		}

		container.addEventListener('pointermove', onPointerMove)
		container.addEventListener('pointerleave', onPointerReset)
		container.addEventListener('pointercancel', onPointerReset)
		window.addEventListener('pointerup', onPointerReset)
		document.addEventListener('visibilitychange', onVisibility)
		reduceQuery.addEventListener('change', onReducedChange)

		resize()
		syncLoop()

		return () => {
			if (rafId !== null) cancelAnimationFrame(rafId)
			resizeObserver.disconnect()
			intersectionObserver.disconnect()
			container.removeEventListener('pointermove', onPointerMove)
			container.removeEventListener('pointerleave', onPointerReset)
			container.removeEventListener('pointercancel', onPointerReset)
			window.removeEventListener('pointerup', onPointerReset)
			document.removeEventListener('visibilitychange', onVisibility)
			reduceQuery.removeEventListener('change', onReducedChange)
			context.deleteBuffer(vbo)
			context.deleteVertexArray(vao)
			context.deleteProgram(program)
			context.deleteShader(vertexShader)
			context.deleteShader(fragmentShader)
		}
	}, [])

	return (
		<div
			ref={wrapperRef}
			className={`pointer-events-none absolute z-0 mask-[radial-gradient(closest-side,black_40%,transparent_100%)] [-webkit-mask-image:radial-gradient(closest-side,black_40%,transparent_100%)] ${className}`}
		>
			<div className="orb-ambient absolute inset-0" />
			<canvas ref={canvasRef} aria-hidden className="relative block h-full w-full" />
		</div>
	)
}
