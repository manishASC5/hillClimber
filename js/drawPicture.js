function drawTriangle(context, triangle){
	const [r,g,b,a, ...tri] = triangle
	context.beginPath()
	context.moveTo(...tri.slice(0,2))
	for(let i=2; i<tri.length; i+=2){
		context.lineTo(...tri.slice(i,i+2))
	}
	context.fillStyle = `rgba(${[r,g,b,a]})`
    context.fill()
}

function drawPicture(triangles, {width,height}, parent){
	const canvas = document.createElement("canvas")
	const context = canvas.getContext('2d')
	canvas.setAttribute('width', width)
	canvas.setAttribute('height', height)
	for(const triangle of triangles){
		drawTriangle(context, triangle)
	}
	if(parent){
		parent.innerHTML = ""
		parent.appendChild(canvas)
	}
	return {canvas, context}
}
