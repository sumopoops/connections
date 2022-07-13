//---------------------------------------------------------------------------- GLOBALS

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const stats = document.getElementById("stats");
let maxNodes = 100;
let nodes = [];
let jiggle = 1;



//---------------------------------------------------------------------------- FUNCTIONS

function ClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function CreateNode() {
    let node = {
        x: RN(0, canvas.width),
        y: RN(0, canvas.height),
        size: RN(10, 30),
        color: Math.round(Math.random())    
    };
    nodes.push(node);
}

function RN(min, max) {
	return (Math.floor(Math.random() * (max-min)) + min);
}

function keyPressed(e) {
    switch (e.key) {
        case "ArrowUp":
            maxNodes++;
            break;
        case "ArrowDown":
            if (maxNodes > 1) maxNodes--;
            break;
        case "ArrowLeft":
            if (jiggle > 1) jiggle--;
            break;
            case "ArrowRight":
                jiggle++;
            break;
    }
}



//---------------------------------------------------------------------------- MAIN / LOOP

function loop() {
    
    ClearCanvas();
    
    // Loop over nodes to draw lines underneath
    for (i=0; i<nodes.length; i++) {
        if (i % 10 == 0) {
            if (!nodes[i+1]) break;
            ctx.strokeStyle = "#e8e7cb";
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[i+1].x, nodes[i+1].y);
            ctx.stroke();
        }
    }

    // Loop over nodes
    for (i=0; i<nodes.length; i++) {

        // Move
        nodes[i].x += (Math.random()-0.5) * jiggle;
        nodes[i].y += (Math.random()-0.5) * jiggle;
        if (i % 6 == 0) {
            nodes[i].x += RN(-2, 2);
            nodes[i].y += RN(-2, 2);
        }

        // Draw Circles
        ctx.beginPath();
        nodes[i].color ? ctx.fillStyle = "#ff7d6e" : ctx.fillStyle = "#fca6ac";
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].size, 0, 2*Math.PI);
        ctx.fill();

        // Update Stats
        stats.innerHTML =   "<span style='color: #ff7d6e'>COUNT&nbsp;&nbsp;</span>" + nodes.length + "<br>" +
        "<span style='color: #ff7d6e'>JIGGLE&nbsp;&nbsp;</span>" + jiggle + "<br>";
        
    }
    

    // Update node count on screen
    while (nodes.length < maxNodes) CreateNode();
    while (nodes.length > maxNodes) nodes.pop();

    requestAnimationFrame(loop);

}

function main() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Keyboard input
    document.addEventListener("keydown", keyPressed);

    requestAnimationFrame(loop);

}

main();