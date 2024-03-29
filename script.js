//---------------------------------------------------------------------------- GLOBALS

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const mainHTML = document.getElementById("main");
let maxNodes = (window.innerWidth*window.innerHeight) / 5000;
let nodes = [];
let jiggle = 4;
let hue = 0;
let lineDrawProx = 80;



//---------------------------------------------------------------------------- FUNCTIONS

function CreateNode() {
    let node = {
        x: RN(-100, canvas.width+100),
        y: RN(-100, canvas.height+100),
        size: RN(10, 30),
        color: Math.round(Math.random())    
    };
    nodes.push(node);
}

function RN(min, max) {
	return (Math.floor(Math.random() * (max-min)) + min);
}



//---------------------------------------------------------------------------- MAIN / LOOP

function loop() {

    // Stats
    let linesDrawn = 0;
    let proximityChecks = 0;
    
    // Clear canvas
    ctx.reset();
    
    // First loop over nodes (Move + draw lines)
    for (i=0; i<nodes.length; i++) {

        // Move
        nodes[i].x += (Math.random()-0.5) * jiggle;
        nodes[i].y += (Math.random()-0.5) * jiggle;
        if (i % 6 == 0) {
            nodes[i].x += RN(-2, 3);
            nodes[i].y += RN(-2, 3);
        }

        // Check proximity and draw connecting lines
        for (n=0; n<nodes.length; n++) {
            proximityChecks++;
            let a = nodes[i];
            let b = nodes[n];
            if (n == i) break;
            if (Math.abs(a.x - b.x) < lineDrawProx && Math.abs(a.y - b.y) < lineDrawProx) {
                linesDrawn++;
                ctx.strokeStyle = "#61a3e5";
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }

    }

    // Second loop over nodes
    for (i=0; i<nodes.length; i++) {

        let n = nodes[i];

        // Draw Circles
        ctx.beginPath();
        n.color ? ctx.fillStyle = "#ff7d6e" : ctx.fillStyle = "#fca6ac";
        ctx.arc(n.x, n.y, n.size, 0, 2*Math.PI);
        ctx.fill();

        // Check for out of bounds nodes and delete
        if (n.x < -100 || n.x > canvas.width+100 || n.y < -100 || n.y > canvas.height+100)
        nodes.splice(i, 1);

    }
    
    // Keep array filled with max node amount
    while (nodes.length < maxNodes) CreateNode();
    while (nodes.length > maxNodes) nodes.pop();
    
    mainHTML.style.filter = "hue-rotate(" + hue + "deg)";
    
    requestAnimationFrame(loop);
    
}

function main() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    requestAnimationFrame(loop);

}

main();