# Vue AnimationFrame

Use the animation frame with a single function, don't think about all the prefixes and ways to do it, this Vue mixin makes it's workable with only one function.

You can use this as simple as an Interval with a timeout, but it won't block or fill your browser up. It uses the animationframe to determine if a function can be called.

### Install

`npm install @sil/animationframe`

### Example

```js
import animationFrame from '@sil/animationframe';

...
	methods: {
		doSomeAnimation(){
			animationFrame(()=>{
				// Your animation
				console.log('hoi!');
			},3000);
		}
	}
...

```
