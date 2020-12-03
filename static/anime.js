// Spiraling basketball
anime({
  targets: 'svg',
  translateX: 1250,
  scale: 2.5,
  rotate: '1turn',
  duration: 6000,
  rotateX: 4
});
//Bouncing Basketball     
var bouncingBall = anime({
	targets: '.sidebar',
	translateY: '50vh',
	duration: 350,
	loop: true,
	direction: 'alternate',
	easing: 'easeInCubic',
	scaleX: {
		value: .9,
		duration: 50,
		delay: 300
	}
});

document.getElementById("myHeader").addEventListener("click", myFunction);

function myFunction() {
  bouncingBall.loop = false;
};