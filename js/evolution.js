function makeEnvironment(imageData){
    const {width, height} = imageData
    const spawn = n_circles => Array(n_circles).fill().map(() => {
        const tri = Array(6).fill().map((_,i) => Math.random() * (i%2==1? imageData.height : imageData.width))
        const rgb = Array(3).fill().map(() => Math.random()*255)
        const alpha = Math.random()
        return [...rgb, alpha, ...tri]
        })
    const errorFn = circles => pixelDistance(imageData.data,
        makePixels(circles, imageData))
    return {spawn, errorFn, width, height}
}

function mutateTriangles(env, oldTriangles){
    let newTriangles = oldTriangles.slice()
    const triangleIndex = Math.floor(Math.random() * (oldTriangles.length))
    newTriangles[triangleIndex] = oldTriangles[triangleIndex].slice()
    if(Math.random()<0.5){ // mutate rgba 
        const rgbaIndex = Math.floor(Math.random()*4)
        newTriangles[triangleIndex][rgbaIndex] = env.spawn(1)[0][rgbaIndex]
    } else { // mutate coordinate
        const coordIndex = Math.floor(Math.random() * (oldTriangles[triangleIndex].length-4)) + 4
        newTriangles[triangleIndex][coordIndex] = env.spawn(1)[0][coordIndex]
    }
    return newTriangles
}


function hillClimb(environment, n_triangles, redraw=false){
    const {spawn, errorFn} = environment
    let best = spawn(n_triangles)
    let bestError = errorFn(best)
    let i = 0
    function nextIteration(){
        for(let j=0; j<10; j++){
            const candidate = mutateTriangles(environment, best)
            const candidateError = errorFn(candidate)
            if(candidateError <= bestError){
                best = candidate
                bestError = candidateError
            }
            i++   
        }
        if(redraw){redraw(best)}
    }
    const interval = setInterval(nextIteration, 0)
    return interval
}

/*
// Old, needs to be remade
function beamSearch(env, redraw=false, n_circles=10, popSize=100, generations=1000){
    const {spawn, errorFn} = env
    let population = Array(popSize).fill().map(() => spawn(n_circles))
    alert("STARTING")
    for(let i=0; i<generations; i++){
        // evaluate population
        const withErrors = population
            .map(x => [x, errorFn(x)])
            .sort(([,a],[,b]) => a-b)
        // select best
        const selectedPop = withErrors.slice(0,popSize*0.3)
        // breed next generation
        population = selectedPop.map(x=>x[0])
            .concat(Array(popSize - selectedPop.length).fill()
                .map((_,i) => selectedPop[i % selectedPop.length][0])
                .map(mutateCircles, 0.1))
        // print results
        console.log(`iteration ${i}, min error: ${selectedPop[0][1]}`)
        if(redraw && (i%10)==0){redraw(selectedPop[0][0])}
    }
}
*/