"use strict";

var canvas;
var gl;

var points = [];
var colors = [];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // shows origin
    var mysphere = sphere();
    mysphere.scale(.02,.02,.02);
    mysphere.translate(0,0,0);
    //points = points.concat(mysphere.TriangleVertices);
    //colors = colors.concat(mysphere.TriangleVertexColors);

    const myRule = new Rule("F: F[+F]F[-F]F");
    const myTurtleStr = myRule.turtleStr("F", 3);
    //const myRule = new Rule("X: F[+X]F[-X]+X");
    //const myRule = new Rule("X: F-[[X]+X]+F[+FX]-x");

    // pass in starting string and number of times to iterate
    //const myTurtleStr1 = myRule.turtleStr("X", 4);

    //const myRule2 = new Rule("F: FF");
    //const myTurtleStr = myRule2.turtleStr(myTurtleStr1, 1);


    var len = 0.1;
    var width = 0.02;
    var angle = 20;
    var currAngle = 0;
    var prevCenter = [0,0,0,0];
    var currCenter = [0,0,0,0];
    var stack = [];
    var popped;

    for(var i = 0; i < myTurtleStr.length; i++) {
        switch(myTurtleStr[i]) {
            case 'F':
                var branch = cylinder();
                branch.scale(width, len, width);
                branch.rotate(currAngle, [0,0,1]);
                currCenter = branch.TopCenter;
                if(i == 0) {branch.translate(0,-.5,0)}
                branch.translate(prevCenter[0]+currCenter[0],prevCenter[1]+currCenter[1],0);
                points = points.concat(branch.TriangleVertices);
                colors = colors.concat(branch.TriangleVertexColors);

                prevCenter = branch.TopCenter;
                var joint = sphere();
                joint.scale(width/2,width/2,width/2);
                joint.translate(prevCenter[0],prevCenter[1],0);
                points = points.concat(joint.TriangleVertices);
                colors = colors.concat(joint.TriangleVertexColors);
                //len = len/1.2;
                break;
            case '+':
                currAngle += angle;
                break;
            case '-':
                currAngle -= angle;
                break;
            case '[':
                stack.push([prevCenter, currAngle,len]);
                break;
            case ']':
                popped = stack.pop();
                prevCenter = popped[0];
                currAngle = popped[1];
                len = popped[2];
                break;
            default:
                break;
        }
    }



    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 0.9, 0.9, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawArrays( gl.TRIANGLES, 0, points.length );

    requestAnimFrame( render );
}