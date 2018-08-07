function makePixels(triangles, {width, height}){
    const {context} = drawPicture(triangles, {width, height}, false)
    return context.getImageData(0,0,width,height).data
}

function pixelDistance(pic1, pic2){
    let residuals = 0
    for(let i=0; i<pic1.length; i++){
        residuals += Math.pow(pic1[i]-pic2[i], 2)
    }
    return Math.sqrt(residuals)
}

function downloadImage(url="mona_lisa.jpg", callback){
	let img = new Image()
	const finishLoading = () => {
		let canvas = document.createElement('canvas')
		let context = canvas.getContext('2d')
		const width = img.width || img.naturalWidth
		const height = img.height || img.naturalHeight
		canvas.width = width
		canvas.height = height
		context.drawImage(img, 0, 0)
		const imageData = context.getImageData(0,0,width,height)
		environment = makeEnvironment(imageData)
		callback(environment)
	}
	img.onload = () => {
		if(img.complete){finishLoading()}
		else{setTimeout(img.onload, 100);}
	}
	img.src = url
}
