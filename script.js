
const canvas = document.getElementById("drawing");//get the HTML 'drawing' element and assign to canvas variable
const ctx = canvas.getContext("2d");//get the 2d rendering context and assign to ctx variable
const colourPicker = document.getElementById("colourPicker");//connects HTML element to assigned variable colourPicker
const penSizeInput = document.getElementById("penSize");//depends on the input from the size slider
const penSizeDisplay = document.getElementById("penSizeValue");//depends on the input from the size slider
const eraserTool = document.getElementById("eraserTool");//depends on the input from the tool selector
const penTool = document.getElementById("penTool");//depends on the input from the tool selector
const pencilTool = document.getElementById("pencilTool");//depends on the input from the tool selector


let isDrawing = false;//ensure drawing doesn't start before mouse is pressed
let currentTool = "pen";//default tool is pen when no tool buttons have been selected

canvas.addEventListener("mousedown", function (event) {//when mouse is pressed down, change drawing to true 
    isDrawing = true;
    draw(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop
    );
});

canvas.addEventListener("mousemove", function (event) {//when mouse is moving, and if mouse is down (isDrawing is true), draw rectangle according to coordinates of mouse position 
    if (isDrawing) {
        draw(//call draw function with coordinates of the mouse
            event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop
        );
    }
});

canvas.addEventListener("mouseup", function () {//when mouse is up (unclicked), stop drawing 
    isDrawing = false;
});

eraserTool.addEventListener("click", function () {//when eraser button is selected, change current tool to eraser
    currentTool = "eraser";
});

penTool.addEventListener("click", function () {//when pen button is selected, change current tool to pen
    currentTool = "pen";
});

pencilTool.addEventListener("click", function () {//when pencil button is selected, change current tool to pencil
    currentTool = "pencil";
});

penSizeInput.addEventListener("input", function () {//listens for when slider is moved and changes text display accordingly
    penSizeDisplay.textContent = penSizeInput.value;
});

function draw(x,y) { 
    if (currentTool === "eraser") 
    {
        ctx.globalCompositeOperation = "destination-out";
        const radius = penSizeInput.value*2;//set radius of the eraser, multiplied input by 1.5 because eraser is generally larger
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2); // (x, y) is the center, radius is the size of the circle using the variable as assigned above
        ctx.fill();
    } 
    else if (currentTool === "pen") 
    {
        ctx.globalCompositeOperation = "source-over";//'source-over' (canvas 2d API) acts like the normal drawing tool
        ctx.fillStyle = colourPicker.value;//drawing will be filled with the colour selected from the color picker
        ctx.globalAlpha = 1;//have to inlclude this or will remain 0.3 after pencil has been used
        const radius = penSizeInput.value;//set radius of the pen or eraser circle to be the input from the pen size selector
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2); // (x, y) is the center, radius is the size of the circle using the variable as assigned above
        ctx.fill();
    }
    else if (currentTool === "pencil")
    {
        ctx.globalCompositeOperation = "source-over";//'source-over' (canvas 2d API) acts like the normal drawing tool
        ctx.globalAlpha = 0.3;//setting alpha value when pencil is selected to give impression of pencil-like strokes
        ctx.fillStyle = colourPicker.value;//drawing will be filled with the colour selected from the color picker
        const radius = penSizeInput.value;//set radius of the pen or eraser circle to be the input from the pen size selector
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2); // (x, y) is the center, radius is the size of the circle using the variable as assigned above
        ctx.fill();
    }
}


