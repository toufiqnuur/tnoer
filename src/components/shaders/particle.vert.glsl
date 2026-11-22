#version 300 es
precision highp float;

layout(location = 0) in vec2 a_gridPos;

uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouseActive;
uniform vec2 u_resolution;
uniform float u_dpr;

out float v_elevation;
out float v_depth;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(
		mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
		mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
		u.y
	);
}

float fbm(vec2 p) {
	float value = 0.0;
	float amplitude = 0.5;
	for (int i = 0; i < 4; i++) {
		value += amplitude * noise(p);
		p *= 2.1;
		amplitude *= 0.5;
	}
	return value;
}

void main() {
	float x = a_gridPos.x;
	float z = a_gridPos.y;

	float centerMask = exp(-pow(x * 1.45, 2.0));

	float wave1 = sin(x * 4.5 + u_time * 1.2 + z * 2.0) * 0.5 + 0.5;
	float detailNoise = fbm(vec2(x * 3.5 - u_time * 0.4, z * 2.5 + u_time * 0.2));

	float elevation = (wave1 * 0.4 + detailNoise * 0.85) * centerMask;

	float aspect = u_resolution.x / max(u_resolution.y, 1.0);
	vec2 diff = vec2((x - u_mouse.x) * aspect, (z * 0.25) - u_mouse.y);
	float dist = length(diff);

	float mouseEffect = exp(-dist * 4.5) * u_mouseActive;
	float ripple = sin(dist * 18.0 - u_time * 6.0) * 0.08 * mouseEffect;
	elevation += (mouseEffect * 0.45) + ripple;

	float y = (elevation - 0.5) * 0.75 + (z * 0.06);

	float jitterX = (hash(a_gridPos * 12.3) - 0.5) * 0.008;
	float jitterY = (hash(a_gridPos * 45.6) - 0.5) * 0.012;

	gl_Position = vec4(x + jitterX, y + jitterY, 0.0, 1.0);

	float baseSize = mix(1.8, 3.8, elevation);
	gl_PointSize = baseSize * (1.0 - abs(z) * 0.3) * u_dpr;

	v_elevation = elevation;
	v_depth = z;
}
