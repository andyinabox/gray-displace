precision highp float;
uniform sampler2D videoTexture;
varying vec2 texCoord;
void main() {
	vec4 color = texture2D(videoTexture, texCoord);
	float avg = (color.r + color.g + color.b) / 3.0;
	vec3 rgb = color.rgb;
	if(avg > 0.7) {
		rgb = vec3(1.0);
	}

	if(avg < 0.3) {
		rgb = vec3(0.0);
	}

  gl_FragColor.rgb = rgb;
  gl_FragColor.a = color.a;
}