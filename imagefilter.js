var ImageFilter =  (function(){

	// Takes in an image element & outputs an ImageData object.
	var get_data = function(element) {
		// Create a canvas to put image on.
		var canvas = document.createElement('canvas');
		canvas.width = element.width;
		canvas.height = element.height;
		var ctx = canvas.getContext('2d');

		// Create image to put on canvas
		var image = new Image();
		image.onload = console.log('Loaded image.');
		image.src = element.getAttribute('src');

		ctx.drawImage(image, 0, 0);

		data = ctx.getImageData(0, 0, canvas.width, canvas.height);

		return data;
	}

	// Takes an ImageData object & grayscales it.
	var grayscale = function(image_data) {

		_looper(image_data, function(values, i) {

			var grey = (0.3 * values.r) + 
				   (0.72 * values.g) + 
				   (0.07 * values.b);
			
			image_data.data[i * 4 + 0] = grey;
			image_data.data[i * 4 + 1] = grey;
			image_data.data[i * 4 + 2] = grey;
		});

		return image_data;
	}

	// Takes an ImageData object & inverts its pixels.
	var invert = function(image_data) {

		_looper(image_data, function(values, i) {
			image_data.data[i * 4 + 0] = 255 - values.r;
			image_data.data[i * 4 + 1] = 255 - values.g;
			image_data.data[i * 4 + 2] = 255 - values.b;
		});

		return image_data;
	}

	// Takes an ImageData object & changes the values of all the 
	// pixels by the provided factor. This is a brightening or 
	// darkening effect.
	var brighten = function(image_data, factor = 1.10) {
		
		_looper(image_data, function(values, i) {
			image_data.data[i * 4 + 0] = factor * values.r;
			image_data.data[i * 4 + 1] = factor * values.g;
			image_data.data[i * 4 + 2] = factor * values.b;
		});

		return image_data;
	}

	// Takes an ImageData object & a hash of colors & factors to multiply
	// them by.
	var vary_color = function(image_data, vary = {red: 1, green: 1, blue: 1}) {

		_looper(image_data, function(values, i) {
			image_data.data[i * 4 + 0 ] = values.r * vary.red;
			image_data.data[i * 4 + 1 ] = values.g * vary.green;
			image_data.data[i * 4 + 2 ] = values.b * vary.blue;
		});

		return image_data;
	}

	// Takes an ImageData object & removes the specified primary 
	// color from it.
	var kill_color = function(image_data, color) {

		var color_to_kill = {red: 1, green: 1, blue: 1};
		if (color === 'red') {
			color_to_kill.red = 0;
		}
		else if (color === 'green') {
			color_to_kill.green = 0;
		}
		else if (color === 'blue') {
			color_to_kill.blue = 0;
		}
		else {
			console.log('No valid pixel was specified.');
			return image_data;
		}

		return vary_color(image_data, color_to_kill);
	}


	// These functions are used by other functions & aren't publically
	// accessiable.

	// Does looping for a caluclator. Loops through an image's pixels &
	// transforms them via a passed in calculator function.
	var _looper = function(image_data, calculator) {

		for (var i = 0; i < _pixels(image_data); i ++) {
			var values = _get_values(image_data.data, i);

			calculator(values, i);
		}

		return image_data;
	}

	// Returns the red, green blue & alpha value of a pixel as r, g, b, a
	var _get_values = function(data, index) {

		return { 
			r: data[index * 4 + 0],
			g: data[index * 4 + 1],
			b: data[index * 4 + 2],
			a: data[index * 4 + 3]
		};
	}

	// Returns the number of pixels in an image.
	// Each pixel has a Red, Green, Blue & Alpha value.		
	var _pixels = function(image_data) {

		return image_data.data.length / 4;
	}

	return {
		get_data: get_data,
		grayscale: grayscale,
		invert: invert,
		brighten: brighten,
		vary_color: vary_color,
		kill_color: kill_color
	};

})();
