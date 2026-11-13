const resume = 'https://sev.my.id/tnoer-resume'

export default function Hero() {
	return (
		<div className="hero py-8">
			<div className="container md:flex md:flex-wrap md:items-center md:justify-center md:gap-24">
				<div className="mx-auto h-56 w-56 overflow-hidden rounded-full border-8 border-white bg-blue-400 shadow-md md:mx-0 dark:border-white/50">
					<img
						className="pt-8 pl-1"
						src="/assets/img/profile-me.png"
						width={256}
						height={256}
						alt="Profile"
						loading="eager"
						fetchPriority="high"
						sizes="256px"
					/>
				</div>
				<div className="mt-8 text-center md:mt-0 md:text-left">
					<div className="text-4xl font-bold tracking-tight md:text-6xl">I&apos;m Toufiq.</div>
					<div className="mt-2 text-xl capitalize md:mt-3">Fullstack web developer</div>
					<div className="mt-8 space-x-4">
						<a
							className="rounded-xl border-r border-b border-blue-500 bg-linear-to-tl from-blue-500/90 to-blue-400/90 px-4 py-2.5 text-sm font-semibold text-white shadow-md backdrop-blur-2xl dark:from-blue-600/90 dark:to-blue-500/90"
							href={resume}
							target="_blank"
							rel="noreferrer"
						>
							Get Resume
						</a>
						<a
							className="rounded-xl border-r border-b border-blue-200 bg-linear-to-tl from-blue-100 to-transparent px-4 py-2.5 text-sm font-semibold text-blue-500 shadow-md backdrop-blur-2xl dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800 dark:text-blue-400"
							href="#contacts"
						>
							Get in touch
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
