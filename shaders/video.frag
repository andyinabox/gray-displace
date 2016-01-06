precision highp float;
uniform sampler2D videoTexture;
varying vec2 texCoord;

// #pragma glslify: crosshatch = require('glsl-crosshatch-filter') 

void main() {
	vec4 color = texture2D(videoTexture, texCoord);

  // gl_FragColor.rgb = crosshatch(color.rgb);
  // gl_FragColor.a = 1.0;
  
  gl_FragColor = color;
}