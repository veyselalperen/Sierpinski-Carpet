"use strict";
/* Veysel Alperen Ceylan
*	21302543
*	08.03.2018
*   I used and get help sample codes of our official textbook. (gasket and cad1)
*	I got help from gasket for understanding fragment algorithm, cad1 for coloring.
*	http://www.cs.bilkent.edu.tr/~gudukbay/cs465_lectures/Edward_Angel_Example_Codes.zip
*	I used some source from Internet. One of them is file reader. https://stackoverflow.com/a/29176118
*
*/

//variables
var canvas;
var gl;
var points = [];
var points2 = [];
var numTimesToSubdivide = 3;
var bufferId;
var bufferId2
var slider_step;
var slider_size;
var color1s;
var color2s;
var size = 1.2;
var locx = -1;
var locy = 1;
var cBuffer;
var vPosition;
var vColor;
var vertices;
var polygon = true;

//color array
var colors = [
    vec4( 1.0, 1.0, 1.0, 1.0 ),		// white
	vec4( 0.0, 0.0, 0.0, 1.0 ),		// black
    vec4( 1.0, 0.0, 0.0, 1.0 ),		// red
    vec4( 0.0, 1.0, 0.0, 1.0 ),		// green
    vec4( 0.0, 0.0, 1.0, 1.0 ),		// blue
	vec4( 1.0, 0.0, 1.0, 1.0 ),		// magenta
	vec4( 1.0, 1.0, 0.0, 1.0 ),		// yellow
	vec4( 0.0, 1.0, 1.0, 1.0 ),		// cyan
	vec4( 1.0, 0.5, 0.0, 1.0 ),		// orange
	vec4( 0.0, 0.0, 0.0, 0.6 ),		// gray
  ];
var color1 = vec4(colors[0]);
var color2 = vec4(colors[1]);

window.onload = function init()
{
    canvas = document.getElementById("gl-canvas");
    
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl)
    {
        alert("WebGL is not available!");
    }
    
    //
    // Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1.0);
    
    // Load shaders and initialize attribute buffers
    
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    
    // Load the data into the GPU
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 4 * Math.pow(9, 6), gl.STATIC_DRAW );
	
	bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER, 4 * Math.pow(9, 6), gl.STATIC_DRAW );
    
    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 32 *Math.pow(9, 6), gl.STATIC_DRAW );
    
    vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
	
	
	// slider for recursion count
    slider_step = document.getElementById("slider_step");
    slider_step.onchange = function() {
        numTimesToSubdivide = event.srcElement.value;
		render();
	  
    };
	
	// slider for carpet size
	slider_size = document.getElementById("slider_size");
    slider_size.onchange = function() {
        size = event.srcElement.value/(5/2);
        render();
	    
    };
	
	// input for insides color
	color1s = document.getElementById("color1");
	color1s.onchange = function(e) {
		var c1 = color1s.selectedIndex;
		//console.log("c1 value: " + c1);
		color1 = vec4(colors[c1]);
		//console.log("color1: " + color1);
        render();
    };
	
	// input for outside color
	color2s = document.getElementById("color2");
	color2s.onchange = function(e) {
       var c2 = color2s.selectedIndex;
	   //console.log("c2 value: " + c2);
	   color2 = vec4(colors[c2]);
	   //console.log("color2: " + color2);
       render();
    };
	
	// release mouse event to draw carpet
	canvas.addEventListener("mouseup", function(event){    
          locx = 2*event.clientX/canvas.width-1.04;
		  locy = 2*(canvas.height-event.clientY)/canvas.height-0.96;
		  //console.log("x: " + locx);
		  //console.log("y: " + locy);
		  render();
    } );
    render();
}

// the method for push outside square's points in array
function square(a, b, c, d)
{
    points.push(a, b, c, d);
}

// the method for push inside square's points in array
function squareCenter(a, b, c, d)
{
    points2.push(a, b, c, d);
}

//recursive method to find points
function divideSquare(a, b, c, d, count)
{
    // check for end of recursion
    if (count == 0)
    {
        square(a, b, c, d);
    }
    else
    {
        // divide by three the sides
        var ab1 = mix(a, b, 1/3);
        var ab2 = mix(a, b, 2/3);
		var bc1 = mix(b, c, 1/3);
		var bc2 = mix(b, c, 2/3);
		var cd1 = mix(c, d, 1/3);
        var cd2 = mix(c, d, 2/3);
		var ad1 = mix(a, d, 1/3);
		var ad2 = mix(a, d, 2/3);
		var ac1 = mix(a, c, 1/3);
		var ac2 = mix(a, c, 2/3);
		var bd1 = mix(b, d, 1/3);
		var bd2 = mix(b, d, 2/3);
        
		//console.log("count:" + count);
        // eight new out squares
        divideSquare(a, ab1, ac1, ad1, count - 1);
        divideSquare(ab1, ab2, bd1, ac1, count - 1);
        divideSquare(ab2, b, bc1, bd1, count - 1);
		divideSquare(bd1, bc1, bc2, ac2, count - 1);
		divideSquare(ac2, bc2, c, cd1, count - 1);
		divideSquare(bd2, ac2, cd1, cd2, count - 1);
		divideSquare(ad2, bd2, cd2, d, count - 1);
		divideSquare(ad1, ac1, bd2, ad2, count - 1);
		//one new in square
		squareCenter(ac1, bd1, ac2, bd2);
    }
}

function render()
{
	//location array
	vertices = [vec2( locx, -1*size+locy ),
        vec2( locx, locy ),
        vec2(  size+locx, locy ),
        vec2( size+locx, -1*size+locy)];
		
    points = [];
	points2 = [];
    divideSquare(vertices[0], vertices[1], vertices[2], vertices[3], numTimesToSubdivide);
    //console.log("points: " + points);
    /* 
        When replacing the entire data store, consider using 
        glBufferSubData rather than completely recreating the 
        data store with glBufferData. This avoids the cost of 
        reallocating the data store.
    */
	//console.log("length: " + points.length);
	//console.log("length2: " + points2.length);
	
	gl.clearColor(color1[0],color1[1],color1[2],color1[3]);
	
	//color buffer for inside.
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
	for ( var i = 0; i < points.length; i+=4) { 
		//console.log("a");
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*i, flatten(color1));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(i+1), flatten(color1));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(i+2), flatten(color1));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(i+3), flatten(color1));
	}
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	//draw squares or lines
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
	for ( var i = 0; i < points.length; i+=4) { 
		//console.log("a");
		if(polygon)
			gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );
		else
			gl.drawArrays( gl.LINE_LOOP, i, 4 );
	}
	gl.clearColor(color2[0],color2[1],color2[2],color2[3]);	
	
	//color buffer for outside.
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
	for ( var i = points.length; i < (points2.length+points.length); i+=4) { 
		//console.log("b");
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*i, flatten(color2));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(i+1), flatten(color2));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(i+2), flatten(color2));
		gl.bufferSubData(gl.ARRAY_BUFFER, 16*(i+3), flatten(color2));
	}
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	//draw squares or lines
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points2));
	for ( var i = 0; i < points2.length; i+=4) { 
		//console.log("b");
		if(polygon)
			gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );
		else
			gl.drawArrays( gl.LINE_LOOP, i, 4 );
	}
	window.requestAnimFrame(render);
}

//method for set polygon variable by looking at radio buttons
function setRadioButton(){	
	if (document.getElementById('r1').checked) {
		polygon = true;
	}else if(document.getElementById('r2').checked){
		polygon = false;
	}
	render();
}

//method for open text file and apply. I used JSON parsing. I used this source: https://stackoverflow.com/a/29176118
function openFile() {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
		  var obj = JSON.parse(text);
		  numTimesToSubdivide = obj.count;
		  //slider_step.setAttribute("value", numTimesToSubdivide);
		  size = obj.size;
		  //slider_size.setAttribute("value", size);
		  locx = obj.locx;
		  locy = obj.locy;
		  polygon = obj.polygon;
		  var c1 = obj.color1;
		  color1 = vec4(colors[c1]);
		  var c2 = obj.color2;
		  color2 = vec4(colors[c2]);
		 /* console.log("count: " + obj.count + " size: " + obj.size + " locx: " + obj.locx + " locy: " + obj.locy);
		  console.log("polygon: " + obj.polygon + " color1: " + obj.color1 + " color2: " + obj.color2);
		  
		  console.log("numTimesToSubdivide: " + numTimesToSubdivide + " size: " + size + " locx: " + locx + " locy: " + locy);
		  console.log("polygon: " + polygon + " color1: " +color1 + " color2: " + color2);*/
		  render();
          var node = document.getElementById('output');
          node.innerText = text;
          //console.log(reader.result.substring(0, 200));
        };
        reader.readAsText(input.files[0]);
      };
