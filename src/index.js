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
    return line(points);
    
}

const defineMaxY = (drawing) => {
    const yPoints = drawing.reduce( (a,b)=>[...a, ...b[1]], []);
    return Math.max(...yPoints);
}

const getRandom = (data) => {
    let n = Math.floor( Math.random()*data.length );
    const out = data[n];
    out.maxY = defineMaxY(out.drawing);
    return out;
}

const mouthDistance = 5;
const eyesDistance  = 5;

let rightEye = getRandom(eyes);
let leftEye = getRandom(eyes);
let mouth = getRandom(mouths);

const biggerEyeY = Math.max(rightEye.maxY, leftEye.maxY);

const viewBox = `0 0 ${255*2+eyesDistance} ${biggerEyeY+mouth.maxY+mouthDistance}`;

const rightCentralization = (biggerEyeY-rightEye.maxY)/2;
const leftCentralization  = (biggerEyeY-leftEye.maxY)/2;

const rightStartY = rightCentralization;// + rightOpenness;
const leftStartY  = leftCentralization;// + leftOpenness;

d3  .select("svg")
    .attr("viewBox", viewBox);

d3  .select("#rightEye")
    .attr("transform", `translate(0, ${rightStartY})`)
    .selectAll("path")
    .data(rightEye.drawing)
    .enter()
    .append("path")
    .attr("d", (d, i) =>createPath(d, i));

d3  .select("#leftEye")
    .attr("transform", `translate(${255+eyesDistance}, ${leftStartY})`)
    .selectAll("path")
    .data(leftEye.drawing)
    .enter()
    .append("path")
    .attr("d", (d, i) =>createPath(d, i));

d3  .select("#mouth")
    .attr("transform", `translate(${255/2},${biggerEyeY+mouthDistance})`)
    .selectAll("path")
    .data(mouth.drawing)
    .enter()
    .append("path")
    .attr("d", (d, i) =>createPath(d, i));