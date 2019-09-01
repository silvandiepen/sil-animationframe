
let i = 0;
let requestAnimationFrame, cancelAnimationFrame;

if (!process.server) {
	requestAnimationFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
}

const animationFrame = (fn, delay, max) => {
	// Do the function
	fn();
	// If there is a max, increase the steps
	if (max) i++;

	// Stop the process if it's not running in window or when max is made.
	if (process.server || i >= max) {
		cancelAnimationFrame(animationFrame);
		return;
	}
	if (!process.server) {
		// Do the function, with a delay
		setTimeout(() => {
			requestAnimationFrame(function() {
				animationFrame(fn, delay, max);
			});
		}, delay);
	}
};
export default animationFrame;