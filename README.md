# AnimationFrame

Use the animation frame with a single function, don't think about all the prefixes and ways to do it, this Vue mixin makes it's workable with only one function.

You can use this as simple as an Interval with a timeout, but it won't block or fill your browser up. It uses the animationframe to determine if a function can be called.

### Install

`npm install @sil/animationframe`

### Example

```js
import animationFrame from '@sil/animationframe';

animationFrame(()=>{
	// Your animation
	console.log('hoi!');
},3000);

```

### Max

The function accepts also an extra argument 'max' which can be set to do a certain function only a set amount of times. 

Set the argument after the time, this is the max amount of times. In the example below, the console.log will be fired 100 times with an interval of 3 seconds.

```js
animationFrame(()=>{
	// Your animation
	console.log('hoi!');
},3000,100); 
```


### As a Vue Mixin.

This function can be easily used as a Vue mixin.

In _Nuxt_

Create a file for your mixins, in the plugins folder. Add this to your nuxt.config.js

nuxt.config:

```js
plugins: [{ src: '~plugins/global.mixins.js' , ssr: true }]
```

global.mixins.js

```js
import Vue from 'vue';
import animationFrame from '@sil/animationframe';


Vue.mixin({
	methods: {
		animationFrame: animationFrame;
	}
});
```

