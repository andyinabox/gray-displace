var shell = require('gl-now')();
var createShader = require('gl-shader');
var gessoCanvas = require('a-big-triangle');
var glslify = require('glslify');

var vert = glslify('./shaders/shader.vert');
var frag = glslify('./shaders/shader.frag');


shell.on('gl-init', function() {
	var gl = shell.gl;

	shader = createShader(gl, vert, frag);
});

shell.on('gl-render', function(t) {
	var gl = shell.gl;

	// bind shader
	shader.bind();
	shader.uniforms.iResolution = [gl.drawingBufferWidth, gl.drawingBufferHeight];

	// draw big triangle
	gessoCanvas(gl);
});

shell.on("gl-error", function(e) {
  throw new Error("WebGL not supported :(")
});