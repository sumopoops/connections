//---------------------------------------------------------------------------- GLOBALS

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
let nodes = [];



//---------------------------------------------------------------------------- FUNCTIONS

function ClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function CreateNode() {
    let node = {x: RN(0, canvas.width), y: RN(0, canvas.height)};
    nodes.push(node);
}

function RN(min, max) {
	return (Math.floor(Math.random() * (max-min)) + min);
}



//---------------------------------------------------------------------------- MAIN / LOOP

function loop() {
    
    ClearCanvas();
    
    // Loop over nodes
    for (i=0; i<nodes.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = "#ff7d6e";
        ctx.arc(nodes[i].x, nodes[i].y, 30, 0, 2*Math.PI);
        ctx.fill();
        console.log("X: " + nodes[i].x + "  Y: " + nodes[i].y);
    }

    requestAnimationFrame(loop);

}

function main() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    while (nodes.length < 50) {
        CreateNode();
    }

    requestAnimationFrame(loop);

}

main();