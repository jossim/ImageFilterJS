var ImageFilter =  {

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
	
		var pixel_number = image_data.data.length / 4;
	
		for (var i = 0; i < pixel_number; i++) {
			var values = ImageFilter.get_values(image_data.data, i);

			var grey = (0.3 * values.r) + 
				   (0.72 * values.g) + 
				   (0.07 * values.b);
			
			image_data.data[i * 4 + 0] = grey;
			image_data.data[i * 4 + 1] = grey;
			image_data.data[i * 4 + 2] = grey;
		}
	
		return image_data;
	},

	// Takes an ImageData object & inverts it.
	invert: function(image_data) {

		var pixel_number = image_data.data.length / 4;

		for (var i = 0; i < pixel_number; i++) {
			var values = ImageFilter.get_values(image_data.data, i);

			image_data.data[i * 4 + 0] = 255 - values.r;
			image_data.data[i * 4 + 1] = 255 - values.g;
			image_data.data[i * 4 + 2] = 255 - values.b;
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
		}
	}
}




