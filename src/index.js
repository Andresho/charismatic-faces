const createPath = (s, i) => {
    
    const scaleX = d3.scaleLinear()
    const scaleY = d3.scaleLinear()
                     
    const line =  d3.line()
        .x((d) => d.x )
        .y((d) => d.y)
        .curve(d3.curveBasis)

    const points = [];
    s[0].forEach((x,i) => {
        points.push({x: x, y: s[1][i] })
    })
    console.log(line(points));
    return line(points);
    
}

d3.select("g")
    .selectAll("path")
    .data(eyes[0].drawing)
    .enter()
    .append("path")
    .attr("d", (d, i) =>createPath(d, i));

//console.log(eyes);
console.log("on index.js");