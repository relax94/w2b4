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
            })
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

var grid = d3.select("#grid")
    .append("svg")
    .attr("width", "152px")
    .attr("height", "252px");

var row = grid.selectAll(".row")
    .data(gridData)
    .enter().append("g")
    .attr("class", "row");

var column = row.selectAll(".square")
    .data(function (d) { return d; })
    .enter().append("rect")
    .attr("class", "square")
    .attr("x", function (d) { return d.x; })
    .attr("y", function (d) { return d.y; })
    .attr("width", function (d) { return d.width; })
    .attr("height", function (d) { return d.height; })
    .style("stroke", "#222")
    .on('click', function (d) {
        d.click++;
        if ((d.click) % 4 == 1) {
            d3.select(this).style("fill", "#2C93E8");
            d3.select(this).attr("fill", true);
        }
        if ((d.click) % 4 == 2) {
            d3.select(this).style("fill", "#fff");
            d3.select(this).attr("fill", false);
        }
        //    if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
    });

var trainSet = {};

var trainExample = [];
document.getElementById('train').addEventListener('click', function () {

    row.selectAll(".square")._groups.forEach((sq) => {
        sq.forEach((rect) => {
            trainExample.push(d3.select(rect).attr("fill") ? 1 : 0);
        });
    });

    //  trainSet[document.getElementById('desired').value] = trainExample;
    console.log('trainExample ', trainSet);
});


document.getElementById('apply').addEventListener('click', function () {

    $.ajax({
        type: "POST",
        url: 'http://localhost:4343/network/games/image',
        data: { data: trainExample },
        success: (success) => { console.log('success ', success); },
        dataType: 'json'
    });

    console.log('apply');
});

document.getElementById('recognize').addEventListener('click', function () {

});