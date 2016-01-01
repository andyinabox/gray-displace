precision highp float;

uniform vec2 iResolution;

#pragma glslify: checker = require(glsl-checker)

void main() {
	vec2 uv = vec2(gl_FragCoord.xy / iResolution.xy);

	uv.x *= iResolution.x / iResolution.y;

	// create single pixel grid
	float gray = checker(uv, min(iResolution.x, iResolution.y));

  gl_FragColor.rgb = vec3(gray);
  gl_FragColor.a = 1.0;

}