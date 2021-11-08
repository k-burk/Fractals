"use strict";
var canvas;
var gl;
var points = [];
var colors = [];
var axis = [0, 0, 1];

function branch(length, pos, angle, iteration, xmove) {
    xmove = 0;
    var newBranch = cylinder(3, 360, true);
    newBranch.scale(iteration, length, 1);
    newBranch.translate(xmove, pos + (pos / 2), 0);
    points = points.concat(newBranch.TriangleVertices);
    colors = colors.concat(newBranch.TriangleVertexColors);

    var end = sphere();
    end.scale(iteration / 2, iteration / 2, iteration / 2);
    end.translate(xmove, length / 2 + pos + (pos / 2), 0);
    points = points.concat(end.TriangleVertices);
    colors = colors.concat(end.TriangleVertexColors);
}

function branchPlus(length, pos, angle, iteration, xmove){
    var split = angle;
    var newBranch = cylinder(3, 360, true);
    newBranch.scale(iteration, length, 1);
    newBranch.rotate(angle, axis);
    newBranch.translate(xmove, pos, 0);
    points = points.concat(newBranch.TriangleVertices);
    colors = colors.concat(newBranch.TriangleVertexColors);
    if (length !== 0) {
        var end = sphere();
        end.scale(iteration / 2, iteration / 2, iteration / 2);
        end.rotate(split, axis);
        end.translate((xmove - length / 6), length / 2 + pos, 0);
        points = points.concat(end.TriangleVertices);
        colors = colors.concat(end.TriangleVertexColors);
    }

}

function branchMinus(length, pos, angle, iteration, xmove){
    var split = angle;
    var newBranch = cylinder(3, 360, true);
    newBranch.scale(iteration, length, 1);
    newBranch.rotate(angle, axis);
    newBranch.translate(-xmove, pos, 0);
    points = points.concat(newBranch.TriangleVertices);
    colors = colors.concat(newBranch.TriangleVertexColors);
    if (length !== 0) {
        var end = sphere();
        end.scale(iteration / 2, iteration / 2, iteration / 2);
        end.rotate(split, axis);
        end.translate(-(xmove - length / 6), length / 2 + pos, 0);
        points = points.concat(end.TriangleVertices);
        colors = colors.concat(end.TriangleVertexColors);
    }


}


window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }




    gl.enable(gl.DEPTH_TEST);


//  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);


    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();

}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
