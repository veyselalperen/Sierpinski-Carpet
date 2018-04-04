<!DOCTYPE html PUBLIC "-//W3O//DTD W3 HTML 2.0//EN">
<!-- saved from url=(0070)http://cs.bilkent.edu.tr/~aytek.aman/cs465/assignments/asst1_2018.html -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
</head>
<body bgcolor="#FFFFFF" text="#000000" link="#0000FF" alink="#FF0000" vlink="#AA00AA">

<h1>Assignment 1: Sierpinski Carpet</h1>
<hr>
<center>

<b>Due Date: March 8, 2018, Thursday</b> 
<p>
<b>The demonstration of the assignment will be during the class hour 
(13:40-15:30) in EA204.</b> 
</p><p>
<b>Every student must attend the demonstration in the class.</b>
</p><p>
Grade Value: 15 %

</p></center>

<hr>
<h3> Important Notice</h3>
<b>
<p>
This assignment will NOT be done in groups. Every individual student 
must do his/her homework.
</p>
<p>
The assignments will be submitted to MOSS (Measure Of Software 
Similarity), which is an
automatic system for determining the similarity of programs. It is very 
successful in identifying the similar codes even if you change variable 
names, indentation, places of functions, and so on. Any similarities between 
the programs of students in the class, as well  as any similarities to the 
programs on the Internet, mandates disciplinary action.
</p>
<p>
You will demonstrate your programs to Dr. Güdükbay in the scheduled time. 
All the students must be physically available in the demonstrations. Demonstrations
are a kind of exam. You will be asked questions to understand your contribution to
the assignments in the demos.
</p>

<hr>
<a name="requirements" <="" a="">
<h3>Requirements</h3>

<p>In this assignment, you are required to write a shader-based OpenGL program which will generate Sierpinski carpet. Sierpinski carpet is a fractal that consists of rectangular shapes. Final result is obtained using inifinite number of iterations. For this assignment, you will need to display Sierpinski fractal for finite number of iterations (between 1-5). Following image illustrates the Sierpsinski fractal obtained using increasing number of iterations. </p>


<img src="./CS-465 Assignment 1_files/carpet.jpg" alt="Applying replacement rule twice">

<p>Your program should have the following capabilities:</p>
<ul>
<li>
    User should be able to define a rectangular region by dragging the mouse where the Sierpinski fractal will be generated. Once mouse button is released, fractal should be generated and displayed. If user defines annother region, new fractal should be generated in this region and existing fractal should be removed.
</li><li>
    User should be able to specify the number of iterations that is used to generate the Sierpinski carpet.
</li><li>
    All colors should be changeable.
</li><li>
    There should be an option to display the fractal using lines or filled polygons. 
</li><li>
    Your program should be able to read in and write out text files, so that you can open an existing fractal or save those. You can do this by saving the coordinates of the rectangular region and the number of iterations. You also need to save color values, etc. to re-display the same image. 
</li></ul>

<p>
<b>Important: Always comment your code. The code will also be checked during the demos.</b>

</p><hr>
<h3>Grading Criteria</h3>
<ul>
<li>Does your program meet the requirements listed above? Your programs will be graded with respect to the number
of the requirements they satisfy.</li>
<li>You should construct an instructive user interface for your program. The user interface should be easy to use. There should not be any menus without any information. For example, having an empty window without any information but opening a menu when a mouse button is clicked is not a good user interface. The functionality of the user interface is a part of the grading criteria.</li>
</ul>
<hr>
<h3>Tips</h3>
<p>
<b>
Please make sure your program runs in preparation for the demos.
</b>
</p>
<p>
You could use simple HTML UI elements or JavaScript (jQuery, AngularJS, jQWidgets,... etc.) UI widget libraries.
</p>
There are vast number of WebGL examples on the web. <b>(Do not use these codes directly)</b>. If you use some code for user interface generation or some other purpose with modifications, you must state so at the beginning of that code segment (e.g., method header ) and properly state how you modified that code segment.
<p>
	<b>Also DO NOT use the third party wrappers like three.js. Use WebGL from the scratch</b>.
</p>

</a></body></html>
