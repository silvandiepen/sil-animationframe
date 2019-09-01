var i = 0;
var requestAnimationFrame, cancelAnimationFrame;

if (!process.server) {
	requestAnimationFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
}

var animationFrame = function (fn, delay, max) {
	// Do the function
	fn();
	// If there is a max, increase the steps
	if (max) { i++; }

	// Stop the process if it's not running in window or when max is made.
	if (process.server || i >= max) {
		cancelAnimationFrame(animationFrame);
		return;
	}
	if (!process.server) {
		// Do the function, with a delay
		setTimeout(function () {
			requestAnimationFrame(function() {
				animationFrame(fn, delay, max);
			});
		}, delay);
	}
};

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;

	Vue.mixin({
		methods: {
			animationFrame: animationFrame
		}
	});	
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default animationFrame;
export { install };
