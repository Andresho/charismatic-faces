function createPath(s, i, openness){
    
    const scaleX = d3.scaleLinear();
    const scaleY = d3.scaleLinear();
                     
    const line =  d3.line()
        .x((d) => d.x)
        .y((d) => d.y*openness)
        .curve(d3.curveBasis)

    const points = [];
    s[0].forEach((x,i) => {
        points.push({x: x, y: s[1][i] })
    })
    return line(points);
    
}

function updateData(eyesOpenness){
    const biggerEyeY = Math.max(rightEye.maxY, leftEye.maxY);

    rightEye.startX = 0;
    rightEye.startY = determineStartY(biggerEyeY, rightEye.maxY, eyesOpenness);

    leftEye.id      = "#leftEye";
    leftEye.startX  = 255 + eyesDistance;
    leftEye.startY  = determineStartY(biggerEyeY, leftEye.maxY, eyesOpenness);

    mouth.startX    = 255/2;
    mouth.startY    = biggerEyeY+mouthDistance;
}

function draw(data, openness) {
    const d = d3.select(data.id)
                .attr("transform", `translate(${data.startX}, ${data.startY})`)
                .selectAll("path")
                .data(data.drawing)
    /*
        Essa separação é necessária pois com o enter() apenas novos dados serão modificados em um update
    */
    d   .enter()
        .append("path")
        .attr("d", (d, i) =>createPath(d, i, openness));
    
    d   .attr("d", (d, i) =>createPath(d, i, openness));
}

function defineMaxY(drawing) {
    const yPoints = drawing.reduce( (a,b)=>[...a, ...b[1]], []);
    return Math.max(...yPoints);
}

function createRandomDrawingData(data, id){
    let n = Math.floor( Math.random()*data.length );
    const out = data[n];

    out.id = id;
    out.maxY = defineMaxY(out.drawing);

    return out;
}

function determineStartY(biggerEyeY, maxY, eyesOpenness){
    const centralization    =   (biggerEyeY-maxY)/2;
    const relOpenness       =   maxY*(1-eyesOpenness)/2;

    return centralization + relOpenness;
}

function blinkUp(){
    updateData(eyesOpenness);

    draw(rightEye, eyesOpenness);
    draw(leftEye, eyesOpenness);
    draw(mouth, 1);

    eyesOpenness += .1;
    window.setTimeout(()=>{
        if(eyesOpenness<1) blinkUp();
        else {
            window.setTimeout(()=>{
                blinkDown();
            },Math.random()*3750+750)
        }
    },10)
}

function blinkDown(){
    updateData(eyesOpenness);

    draw(rightEye, eyesOpenness);
    draw(leftEye, eyesOpenness);
    draw(mouth, 1);

    window.setTimeout(()=>{
        eyesOpenness -= .1;
        if(eyesOpenness>0) blinkDown();
        else               blinkUp();
    },10)
}

/*
    Valores de inicialização
*/

const mouthDistance = 5;
const eyesDistance  = 5;

const rightEye        = createRandomDrawingData(eyes, "#rightEye");
const leftEye         = createRandomDrawingData(eyes, "#leftEye");
const mouth           = createRandomDrawingData(mouths, "#mouth");

const biggerEyeY = Math.max(rightEye.maxY, leftEye.maxY);

const viewBox = `0 0 ${255*2+eyesDistance} ${biggerEyeY+mouth.maxY+mouthDistance}`;

d3  .select("svg")
    .attr("viewBox", viewBox);


/*
    Update
*/
let eyesOpenness = 1;

blinkDown();