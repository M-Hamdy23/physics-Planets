/// <reference path="p2.js" />



var canvas =document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bodies = [];
var planets = [];



var world = new p2.World({
    gravity: [0, 0]
});

// creat planets
{
    let body = new p2.Body({ position: [500, 150], gravity: [0, 9.8] });
    let shape = new p2.Circle({ radius: 60 });
    body.addShape(shape);
    world.addBody(body);
    planets.push(body);

    body = new p2.Body({ position: [800, 400], gravity: [0, 9.8] });
    shape = new p2.Circle({ radius: 80 });
    body.addShape(shape);
    world.addBody(body);
    planets.push(body);

    body = new p2.Body({ position: [200, 400], gravity: [0, 9.8] });
    shape = new p2.Circle({ radius: 80 });
    body.addShape(shape);
    world.addBody(body);
    planets.push(body);
}

var mouseBody = new p2.Body({ mass: 1, type: p2.Body.KINEMATIC });
var mouseShape = new p2.Particle();
mouseShape.sensor = true;
mouseBody.addShape(mouseShape);
world.addBody(mouseBody);




function Update() {
    requestAnimationFrame(Update);
    world.step(1 / 50.0);

    render();
}

function render() {
    
    canvas.width = canvas.width;
    for (var i = 0; i < planets.length; i++) {
        console.log("i=" + i);
        ctx.beginPath();
        ctx.arc(planets[i].position[0], planets[i].position[1], 60, 0, 2 * 3.1415926);
        ctx.closePath();
        ctx.fill();
    }

    for (var i = 0; i < bodies.length; i++) {
        console.log("i=" + i);
        ctx.beginPath();
        ctx.arc(bodies[i].position[0],bodies[i].position[1], 5, 0, 2 * 3.1415926);
        ctx.closePath();
        ctx.fill();
    }

}

document.onmousedown = function (e) {
    console.log("down");
    mouseBody.position[0] = e.offsetX;
    mouseBody.position[1] = e.offsetY;
    let body = new p2.Body({ position: [e.offsetX, e.offsetY] });
    let shape = new p2.Circle({ radius: 5 });
    body.addShape(shape);
    world.addBody(body);
    bodies.push(body);
};


requestAnimationFrame(Update);








