
// var matrix;

// var side = 50;

// // Object - neri pahest

// var grassArr = [];
// var grassEaterArr = [];
// var predatorArr = [];
// var earthDistArr = [];
// var earthArr = [];

// function matrixGenerator(size) {

//     var newMatrix = [];

//     for (var y = 0; y < size; y++) {
//         newMatrix[y] = [];
//         for (var x = 0; x < size; x++) {

//             var id;

//             var randomNumb = random(0, 100);

//             if (randomNumb <= 40) {

//                 id = 1;

//             }
//             else if (randomNumb > 40 && randomNumb <= 55) {

//                 id = 2;

//             }

//             else if (randomNumb > 55 && randomNumb <= 65) {

//                 id = 3;

//             }

//             else if (randomNumb > 65 && randomNumb <= 66) {

//                 id = 4;


//             }

//             else {

//                 id = 0;
//             }

//             newMatrix[y][x] = id;
//         }





//     }

//     return newMatrix;
// }


// function setup() {

//     matrix = matrixGenerator(15);

//     // Canvas creator

//     var matrixX = matrix[0].length * side;
//     var matrixY = matrix.length * side;

//     frameRate(10);
//     createCanvas(matrixX, matrixY);
//     background('grey');
//     createObject(); // Gives animated object life

// }



// function draw() {
//     // Nerka lcnum vandakneri mej
//     console.log(matrix);
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 fill('green');
//             } else if (matrix[y][x] == 2) {
//                 fill('yellow');
//             } else if (matrix[y][x] == 3) {
//                 fill('red');
//             } else if (matrix[y][x] == 4) {
//                 fill('white');
//             } else if (matrix[y][x] == 5) {
//                 fill('brown');
//             }
//             else {
//                 fill('grey');
//             }

//             rect(x * side, y * side, side, side);
//         }
//     }

//     // Object - nerin trvox hramanner@

//     for (var i = 0; i < grassArr.length; i++) {
//         grassArr[i].mul();
//     }

//     for (var i = 0; i < grassEaterArr.length; i++) {
//         grassEaterArr[i].eat();
//     }

//     for (var i = 0; i < predatorArr.length; i++) {
//         predatorArr[i].eat();
//     }

//     for (var i = 0; i < earthDistArr.length; i++) {
//         earthDistArr[i].eat();
//     }

//     for (var i = 0; i < earthArr.length; i++) {
//         earthArr[i].stay();
//     }
// }


// // Gives animated object life

// function createObject() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 var g = new Grass(x, y, 1);
//                 grassArr.push(g);
//             } else if (matrix[y][x] == 2) {
//                 var ge = new GrassEater(x, y, 2);
//                 grassEaterArr.push(ge);
//             } else if (matrix[y][x] == 3) {
//                 var p = new Predator(x, y, 3);
//                 predatorArr.push(p);
//             }
//             else if (matrix[y][x] == 4) {
//                 //  debugger;
//                 var b = new EarthDist(x, y, 4, Math.round(random(0, 3)))
//                 earthDistArr.push(b);
//             }
//             else {

//             }
//         }
//     }
// }


//////////////////////////////////////////////////////////////////


function main() {
    var socket = io();
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    
    // console.log("Huha1");
    // var m = require('./Mother.js');
    // console.log("Huha2");
    // var nya = new m(1,2,43);
    // alert("=>\n");

    function handleSubmit() {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    button.onclick = handleSubmit;

    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
}

socket.on('display message', handleMessage);
} // main closing bracket

window.onload = main;