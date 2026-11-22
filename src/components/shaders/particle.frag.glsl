#version 300 es
precision highp float;

in float v_elevation;
in float v_depth;

out vec4 outColor;

void main() {
	vec2 coord = gl_PointCoord - vec2(0.5);
	float dist = length(coord);
	if (dist > 0.5) discard;

	float alpha = smoothstep(0.5, 0.05, dist);

	vec3 deepBlue = vec3(0.02, 0.18, 0.65);
	vec3 electricBlue = vec3(0.05, 0.60, 1.0);
	vec3 brightCyan = vec3(0.50, 0.95, 1.0);

	vec3 color = mix(deepBlue, electricBlue, clamp(v_elevation * 1.5, 0.0, 1.0));
	color = mix(color, brightCyan, clamp((v_elevation - 0.35) * 2.2, 0.0, 1.0));

	float depthFade = 1.0 - abs(v_depth) * 0.55;
	float intensity = alpha * depthFade * mix(0.22, 0.65, v_elevation);

	outColor = vec4(color * intensity, intensity);
}
