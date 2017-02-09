"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function gridData() {
    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = 50;
    var height = 50;
    var click = 0;

    // iterate for rows	
    for (var row = 0; row < 5; row++) {
        data.push(new Array());

        // iterate for cells/columns inside rows
        for (var column = 0; column < 3; column++) {
            data[row].push({
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                click: click
            });
            // increment the x position. I.e. move it over by 50 (width variable)
            xpos += width;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += height;
    }
    return data;
}

var gridData = gridData();
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#grid").append("svg").attr("width", "152px").attr("height", "252px");

var row = grid.selectAll(".row").data(gridData).enter().append("g").attr("class", "row");

var column = row.selectAll(".square").data(function (d) {
    return d;
}).enter().append("rect").attr("class", "square").attr("x", function (d) {
    return d.x;
}).attr("y", function (d) {
    return d.y;
}).attr("width", function (d) {
    return d.width;
}).attr("height", function (d) {
    return d.height;
}).style("stroke", "#222").on('click', function (d) {
    d.click++;
    if (d.click == 1) {
        d3.select(this).style("fill", "#2C93E8");
        d3.select(this).attr("fill", true);
    }
    if (d.click == 2) {
        d3.select(this).style("fill", "#000");
        d3.select(this).attr("fill", null);
        d.click = 0;
    }
    //    if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
});

var trainSet = {};

var trainExample = [];
function getTrainExample() {
    row.selectAll(".square")._groups.forEach(function (sq) {
        sq.forEach(function (rect) {
            trainExample.push(d3.select(rect).attr("fill") ? 1 : 0);
        });
    });
}

/*
document.getElementById('train').addEventListener('click', function () {

});
*/

document.getElementById('apply').addEventListener('click', function () {
    clearOutputList();
    trainExample = [];
    getTrainExample();
});

function clearOutputList() {
    var elm = document.getElementById('output-results');
    while (elm.hasChildNodes()) {
        elm.removeChild(elm.lastChild);
    }
}

document.getElementById('recognize').addEventListener('click', function () {
    $.ajax({
        type: "POST",
        url: 'http://localhost:4343/network/games/image',
        data: { data: trainExample },
        success: function success(_success) {
            var max = Math.max.apply(Math, _toConsumableArray(_success));
            for (var i in _success) {
                var el = document.createElement('div');
                el.innerText = i + "  ---- >  " + _success[i];

                if (_success[i] == max) el.style.backgroundColor = "green";
                document.getElementById('output-results').append(el);
            }
        },
        dataType: 'json'
    });
});

var mousePressed = false;
var lastX, lastY;
var ctx;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });
    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;lastY = y;
}

var trainSingleEpochExample = [];
document.getElementById('addExample').addEventListener('click', function () {
    var answer = document.getElementById('answer').value;

    var pixelsArr = [];

    var imageData = ctx.getImageData(0, 0, 28, 28).data;
    //var imageData = [1,2,2,1,2,3,4,1,1,3,4,1,2,3,4,5];
    imageData.reduce(function (prev, next, i) {
        prev += next;
        if ((i + 1) % 4 === 0) {
            pixelsArr.push(prev);
            prev = 0;
        }
        return prev;
    }, 0);

    //trainSingleEpochExample[answer] = pixelsArr;
    trainSingleEpochExample.push(pixelsArr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    console.log(trainSingleEpochExample);
});

document.getElementById('recognizeHandwrite').addEventListener('click', function () {
    var pixelsArr = [];

    var imageData = ctx.getImageData(0, 0, 28, 28).data;
    //var imageData = [1,2,2,1,2,3,4,1,1,3,4,1,2,3,4,5];
    imageData.reduce(function (prev, next, i) {
        prev += next;
        if ((i + 1) % 4 === 0) {
            pixelsArr.push(prev);
            prev = 0;
        }
        return prev;
    }, 0);

    console.log('hnd rec ', pixelsArr);
    //trainSingleEpochExample[answer] = pixelsArr;
    $.ajax({
        type: "POST",
        url: 'http://localhost:4343/network/games/image',
        data: { data: pixelsArr },
        success: function success(_success2) {
            var max = Math.max.apply(Math, _toConsumableArray(_success2));
            for (var i in _success2) {
                var el = document.createElement('div');
                el.innerText = i + "  ---- >  " + _success2[i];

                if (_success2[i] == max) el.style.backgroundColor = "green";
                document.getElementById('output-results').append(el);
            }
        },
        dataType: 'json'
    });
});

document.getElementById('trainNetwork').addEventListener('click', function () {

    $.ajax({
        type: "POST",
        url: 'http://localhost:4343/network/games/train',
        data: { set: JSON.stringify(trainSingleEpochExample) },
        success: function success(_success3) {},
        dataType: 'json'
    });
});

function clearArea() {
    // Use the identity matrix while clearing the canvas


}
//# sourceMappingURL=draw.js.map