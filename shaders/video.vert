attribute vec2 position;
varying vec2 texCoord;
uniform vec2 iMouse;
void main() {
  gl_Position = vec4(position, 0, 1);
  texCoord = vec2(0.5,0.5) * (position + 1.0);
}