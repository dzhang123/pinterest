var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
var images = ["images/pic1.jpg", "images/pic2.jpg", "images/pic3.jpg", "images/pic4.jpg", "images/pic5.jpg"];
for (let i = 0; i < images.length; i++) {
  var newImage = document.createElement('img');
  newImage.setAttribute('src', images[i]);
  thumbBar.appendChild(newImage);
  newImage.onclick = function (e) {
    displayedImage.setAttribute('src', e.target.getAttribute('src'));
  }
}
/* Wiring up the Darken/Lighten button */
btn.onclick = function (e) {
  if (e.target.getAttribute('class') === 'dark') {
      //overlay.setAttribute('background-color', rgba(0,0,0, 0.5));
      e.target.setAttribute('class', 'light');
      e.target.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    //overlay.setAttribute('background-color', 'rgba(0,0,0, 0)');
    e.target.setAttribute('class', 'dark');
    e.target.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
}
