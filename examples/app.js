var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var image_element = document.querySelector('img');

var image_data = ImageFilter.get_data(image_element);

image_data = ImageFilter.kill_color(image_data, 'blue');

ctx.putImageData(image_data, 0, 0);
