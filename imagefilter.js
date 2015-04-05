var ImageFilter =  (function(){
	
	var funcs = {

		// Takes in an image element & outputs an ImageData object.
		get_data: function(element) {
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
		},

		// Takes an ImageData object & grayscales it.
		grayscale: function(image_data) {

			funcs.looper(image_data, function(values, i) {
				var values = funcs.get_values(image_data.data, i);

				var grey = (0.3 * values.r) + 
					   (0.72 * values.g) + 
					   (0.07 * values.b);
				
				image_data.data[i * 4 + 0] = grey;
				image_data.data[i * 4 + 1] = grey;
				image_data.data[i * 4 + 2] = grey;
			});

			return image_data;
		},

		// Takes an ImageData object & inverts it.
		invert: function(image_data) {

			funcs.looper(image_data, function(values, i) {
				image_data.data[i * 4 + 0] = 255 - values.r;
				image_data.data[i * 4 + 1] = 255 - values.g;
				image_data.data[i * 4 + 2] = 255 - values.b;
			});

			return image_data;
		},

		// Takes an ImageData object & changes the values of all the 
		// pixels by the provided factor. This is a brightening or 
		// darkening effect.
		brighten: function(image_data, factor = 1.10) {
			
			funcs.looper(image_data, function(values, i) {
				image_data.data[i * 4 + 0] = factor * values.r;
				image_data.data[i * 4 + 1] = factor * values.g;
				image_data.data[i * 4 + 2] = factor * values.b;
			});

			return image_data;
		},

		// Takes an ImageData object & removes the specified primary 
		// color from it.
		kill_color: function(image_data, color) {

			var color_to_kill;
			if (color === 'red') {
				color_to_kill = 0;
			}
			else if (color === 'green') {
				color_to_kill = 1;
			}
			else if (color === 'blue') {
				color_to_kill = 2;
			}
			else {
				console.log('No valid pixel was specified.');
				return image_data;
			}

			funcs.looper(image_data, function(values, i) {
				image_data.data[i * 4 + color_to_kill] = 0;
			});

			return image_data;
		},

		//// PRIVATE ////
		// These functions are used by other functions & aren't publically
		// accessiable.
		//// PRIVATE ////

		// Does looping for a caluclator. Loops through an image's pixels &
		// transforms them via a passed in calculator function.
		looper: function(image_data, calculator) {

			for (var i = 0; i < funcs.pixels(image_data); i ++) {
				var values = funcs.get_values(image_data.data, i);

				calculator(values, i);
			}

			return image_data;
		},

		// Returns the red, green blue & alpha value of a pixel as r, g, b, a
		get_values: function(data, index) {

			return { 
				r: data[index * 4 + 0],
				g: data[index * 4 + 1],
				b: data[index * 4 + 2],
				a: data[index * 4 + 3]
			};
		},

		// Returns the number of pixels in an image.
		// Each pixel has a Red, Green, Blue & Alpha value.		
		pixels: function(image_data) {

			return image_data.data.length / 4;
		}
	}

	return {
		get_data: funcs.get_data,
		grayscale: funcs.grayscale,
		invert: funcs.invert,
		brighten: funcs.brighten,
		kill_color: funcs.kill_color
	};

})();
