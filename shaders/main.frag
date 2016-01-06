precision highp float;

uniform sampler2D grayTexture;
uniform sampler2D videoTexture;
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 texCoord;

#pragma glslify: checker = require(glsl-checker)

void main() {
	vec2 uv = vec2(gl_FragCoord.xy / iResolution.xy);
	// uv.x *= iResolution.x / iResolution.y;

	vec4 video = texture2D(videoTexture, texCoord);
	// vec4 grayBase = texture2D(grayTexture, texCoord);

	vec2 st = texCoord.st + vec2((video.x-0.5)*0.01*iMouse.y, (video.z-0.5)*0.01*iMouse.y);

	float checkerSize = max(iResolution.x, iResolution.y);
	float grayNormalVal = checker(uv, checkerSize);
	float grayOffsetVal = checker(st, checkerSize);
	vec4 grayNormal = vec4(grayNormalVal, grayNormalVal, grayNormalVal, 1.0);
	vec4 grayOffset = vec4(grayOffsetVal, grayOffsetVal, grayOffsetVal, 1.0);

  gl_FragColor = mix(grayNormal, grayOffset, iMouse.x);
}