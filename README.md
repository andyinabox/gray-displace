# Gray Displacer

![Gray Displacer](https://c2.staticflickr.com/2/1470/23836884549_e3fb895959_z.jpg)

I'm playing around with various perceptual effects that come from using the old-fashioned 2px x 2px black and white repeating background, which our eyes percieve to be gray (think original Mac desktop background).

![Macintosh 128k](https://upload.wikimedia.org/wikipedia/en/5/50/Apple_Macintosh_Desktop.png)

This sketch uses a GLSL shader to generate the pattern, and then displacing it with the input from an attached webcam. This is all made possible by WebGL and [stack.gl](http://stack.gl/) (among other things).


## Usage

### Development

First install dependencies:

```bash
npm install
```

Then run the server

```bash
npm start
```

Now open http://localhost:9966/ to see it in action!

Note: I'm using [budo](https://github.com/mattdesl/budo) to run the local server, which you may already have installed globally. You could easily run using other similar tools like [beefy](https://github.com/chrisdickinson/beefy) or [wzrd](https://github.com/maxogden/wzrd), for instance: `beefy index.js --live -- -t glslify`.

### Build

(Not there yet)

