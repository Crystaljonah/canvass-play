let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

//drawing a rectangle
// c.fillStyle = "#fff";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "#000"
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "#bbb";
// c.fillRect(300, 300, 100, 100);

// console.log(canvas);

// //line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#dbe";
// c.stroke();

// //arc /circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle="#000";
// c.stroke();

// //how to create multiple circles i.e looping
// for(let i = 0; i < 500; i++){
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
// c.beginPath();
// c.arc(x, y, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "maroon";
// c.stroke();
// }

let mouse ={
    x:undefined,
    y:undefined
}

let maxRadius = 40;
let minRadius = Math.random() * 3 + 1;
let colorArray = [
     '#F5B195',
     '#F67280',
     'C06C84',
     '#6C5B7B',
     '355C7D',
     '#fff'
];
console.log();

window.addEventListener('mousemove', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius,) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor((Math.random() * colorArray.length))];

    this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle =this.color;
    c.fill();
    }

    this.update = () => {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
       this.x += this.dx;    
        if (this.y + this.radius > innerHeight ||this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.y += this.dy;

        //canvass interactivity
        if(mouse.x - this.x < 50  && mouse.x - this.x > -50 
        && mouse.y - this.y < 50 && mouse.y - this.y > -50
        ){
        if(this.radius < maxRadius){
            this.radius += 1;
            c.fillStyle = "#000";
            }
        }else if(this.radius > this.minRadius){
            this.radius -= 1;
        }
        this.draw();   
    }
}

let circleArray = [];

 function init(){
   
    circleArray = [];
    for (let i = 0; i < 900; i++){
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() *(innerHeight -radius * 2) + radius;
    let dx = (Math.random() - 0.5 * 6);
    let dy = (Math.random() - 0.5  *3);

    circleArray.push(new Circle(x, y, dx, dy, radius,));
 }

 }

function animate() {
    requestAnimationFrame(animate); 
    c.clearRect(0, 0, innerWidth, innerHeight);  
    
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}
init();
animate();