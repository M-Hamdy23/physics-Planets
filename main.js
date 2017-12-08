/// <reference path="p2.js" />
/// <reference path="Vec2.js" />



var canvas =document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bodies = [];
var planets = [];



var world = new p2.World({
    gravity: [0, 0]
});

// creat planets
{
    let body = new p2.Body({mass:0, position: [500, 150], gravity: [0,0]});
    let shape = new p2.Circle({ radius: 60 });
    body.addShape(shape);
    world.addBody(body);
    planets.push(body);
    //let constrain = new p2.DistanceConstraint(body, body);
    //world.addConstraint(constrain);

    body = new p2.Body({ position: [800, 400], gravity: [0, 0] });
    shape = new p2.Circle({ radius: 60 });
    body.addShape(shape);
    world.addBody(body);
    planets.push(body);

    body = new p2.Body({ position: [200, 400], gravity: [0, 0] });
    shape = new p2.Circle({ radius: 60 });
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
        //console.log("i=" + i);
        ctx.beginPath();
        ctx.arc(planets[i].position[0], planets[i].position[1], 60, 0, 2 * 3.1415926);
        ctx.closePath();
        ctx.fill();
    }

    for (var i = 0; i < bodies.length; i++) {
        //console.log("i=" + i);
        ctx.beginPath();
        CalculateAllForce(bodies[i]);
        ctx.arc(bodies[i].position[0],bodies[i].position[1], 5, 0, 2 * 3.1415926);
        ctx.closePath();
        ctx.fill();
    }

}

document.onmousedown = function (e) {
    //console.log("down");
    mouseBody.position[0] = e.offsetX;
    mouseBody.position[1] = e.offsetY;
    let body = new p2.Body({mass: 300, position: [e.offsetX, e.offsetY] });
    let shape = new p2.Circle({ radius: 5 });
    body.addShape(shape);
    world.addBody(body);
    bodies.push(body);
    
    CalculateAllForce(body);


};

function CalculateAllForce(obj) {
    for (var i = 0; i < planets.length; i++) {
        Calculate(planets[i], obj);
    }
}
function Calculate(planet, obj) {


    var direction = new Vec2().sub(new Vec2(planet.position[0], planet.position[1]), new Vec2(obj.position[0], obj.position[1])).normalize();
    direction = direction.scale(10000);
    var dist2 =Math.abs(
                 
                       Math.pow((planet.position[0]-obj.position[0]),2)+
                       Math.pow((planet.position[1]-obj.position[1]),2)
    );

    
    var force =500 * obj.mass / dist2;
    obj.applyForce([force * direction.x, force * direction.y]);
   // obj.applyForce([force * direction.x, force * direction.y], [planet.position[0], planet.position[1]]);
    
}


requestAnimationFrame(Update);








