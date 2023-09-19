//setup the canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

/**make the canvas always fill the screen**/;
(function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    window.onresize = resize
})()

//for this code (as in code before this line), I almost always use the same stuff, so its going to stay here

//create the score
let score = 0
let highscore = localStorage.getItem('highscore') ?? 0


//hold the ripples
let ripples = []

    //the render loop
    ;
(function render() {

    //clear the screen
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.shadowBlur = 0


    //draw the button
    let r = Math.floor(canvas.width, canvas.height) / 3
    let gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, r)
    gradient.addColorStop(1, 'rgb(0,0,0)')
    gradient.addColorStop(score / 100, 'rgb(0,255,0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, Math.PI * 2)
    ctx.fill()

    //draw the ripples
    //and move them
    ctx.strokeStyle = 'rgb(255,255,255,.5)'
    ctx.shadowColor = 'rgb(255,255,255)'
    ctx.shadowBlur = 10
    for (let index in ripples) {
        let ripple = ripples[index]
        ctx.lineWidth = ripple.w
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, ripple.r, 0, Math.PI * 2)
        ctx.stroke()
        ripple.r += score
        if (ripple.r > Math.max(canvas.width, canvas.height/2))
            ripples.splice(index, 1)
    }

    //render the score
    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.shadowColor = ctx.fillStyle
    ctx.shadowBlur = score
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${r / 6}px arial`
    ctx.fillText(`Current score: ${score}`, canvas.width / 2, canvas.height / 2 - 50)
    ctx.fillText(`Chance of reset: %${score}`, canvas.width / 2, canvas.height / 2)
    ctx.fillText(`Highscore: ${highscore}`, canvas.width / 2, canvas.height / 2 + 50)


    requestAnimationFrame(render)
})()

//check for clicks
document.addEventListener('click', e => {
    if (Math.random() < score / 100)
        score = 0
    else score++
    if (score > highscore) {
        highscore = score
        localStorage.setItem('highscore', highscore)
    }
    ripples.push({ r: 0 ,w:score/2})
})