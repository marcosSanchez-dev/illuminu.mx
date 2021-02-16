const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray;

// get mouse position

let mouse = {
    x: null,
    y: null,
    radius: ((canvas.height/80) * (canvas.width/80))
}

window.addEventListener('mousemove',(event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    
});

// create particle


class Particle {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //metodo para dibujar la particula
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size,0 , Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fill();
    }
    //conocer la posicion de la particula, conocer la posicion del mouse, move la particula y dibujarla
    update(){
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y + this.size > canvas.height || this.y - this.size < 0){
            this.directionY = -this.directionY;
        }
        //collision detection

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10; 
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size *10){
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }
        //move particle 
        this.x += this.directionX;
        this.y += this.directionY;
        //draw particle
        this.draw();
    }
}


// create a particle array with
function init(){
    particleArray = [];
    let numberOfParticles = (canvas.height*canvas.width)/9000;
    for (let i=0; i<numberOfParticles * 1.2; i++){
        let size = (Math.random() * 6)+1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        
        let color = 'gold';
        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}
 //animation loop

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth , innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
    connect();
}


function connect() {
    let opacityValue = 0.8;
    //i es cada particula individual
    for (let a = 0; a < particleArray.length; a++) {
        // j es toda las demas particula en el mismo array
        for (let b = a; b < particleArray.length; b++) {
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x)) + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
        
        if(distance < (canvas.width/7) * (canvas.height/7)) {
            opacityValue = 1 - (distance/20000);
            ctx.strokeStyle = 'rgba(255,0,0,' + opacityValue + ')'; //color de las lineas 
            ctx.lineWidth = 1;
            ctx.beginPath(); 
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
        }

        }
    }
}

//resize event 
window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    init(); 
})

//mouse out event

window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.x = undefined;
})


init();
animate();

