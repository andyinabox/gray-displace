var shell = require('gl-now')();
var glShader = require('gl-shader');
var glFbo = require('gl-fbo');
var glTexture2d = require('gl-texture2d');
var fillScreen = require('a-big-triangle');
var glslify = require('glslify');
var videoGrabber = require('./lib/videoGrabber.js');

var video = videoGrabber(640, 480);

var mainShader
	, grayShader
	, videoShader
	, videoTexture
	, grayFbo
	, videoFbo;


shell.on('gl-init', function() {
	var gl = shell.gl;

	// setup shaders
	mainShader = glShader(gl, glslify('./shaders/main.vert'), glslify('./shaders/main.frag'));
	grayShader = glShader(gl, glslify('./shaders/gray.vert'), glslify('./shaders/gray.frag'));
	videoShader = glShader(gl, glslify('./shaders/video.vert'), glslify('./shaders/video.frag'));
	
	// setup fbos
	grayFbo = glFbo(gl, [gl.drawingBufferWidth, gl.drawingBufferHeight]);
	videoFbo = glFbo(gl, [gl.drawingBufferWidth, gl.drawingBufferHeight]);
});

shell.on('tick', function() {
	var gl = shell.gl;

	console.log('iResolution', gl.drawingBufferWidth, gl.drawingBufferHeight);

	// is there video ready?
	if(video.readyState === video.HAVE_ENOUGH_DATA) {
		if(videoTexture) {
	  	videoTexture.setPixels(video);
		} else {
			videoTexture = glTexture2d(gl, video);
		} 

		// update fbo
		videoFbo.bind();
			videoShader.bind();
			videoShader.uniforms.videoTexture = videoTexture.bind();
			fillScreen(gl);
	}	

	// bind gray fbo
	grayFbo.bind();
		grayShader.bind()
		grayShader.uniforms.iResolution = [gl.drawingBufferWidth, gl.drawingBufferHeight];
		fillScreen(gl);



});

shell.on('gl-render', function(t) {
	var gl = shell.gl;

	// bind shader
	mainShader.bind();
		mainShader.uniforms.iResolution = [gl.drawingBufferWidth, gl.drawingBufferHeight];
		mainShader.uniforms.grayTexture = grayFbo.color[0].bind(1);
		mainShader.uniforms.videoTexture = videoFbo.color[0].bind(2);

	// draw big triangle
	fillScreen(gl);
});

shell.on("gl-error", function(e) {
  throw new Error("WebGL not supported :(")
});