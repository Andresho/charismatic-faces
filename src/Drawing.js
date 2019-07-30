import React, { useState, useEffect } from 'react';
import {line, curveBasis} from 'd3';

function defineMaxY(drawing){
	const yPoints = drawing.reduce( (a,b)=>[...a, ...b[1]], []);
	return Math.max(...yPoints);
}
function createPath(s, i, openness){
	const l =  line()
		.x((d) => d.x )
		.y((d) => d.y*openness)
		.curve(curveBasis)

	const points = [];
	s[0].forEach((x,i) => {
		points.push({x: x, y: s[1][i] })
	})

	return (
		<path d={l(points)} key={i}/>
	)
}

function Drawing({rightEye,leftEye, mouth, eyesOpenness, onClick}){
	const [maxRightEye, setMaxRightEye] = 	useState(0);
	const [maxLeftEye, setMaxLeftEye] = 	useState(0);
	const [maxMouth, setMaxMouth] = 		useState(0);

	useEffect(()=>{
		setMaxRightEye	( 	defineMaxY(rightEye.drawing) 	);
		setMaxLeftEye	( 	defineMaxY(leftEye.drawing) 	);
		setMaxMouth		( 	defineMaxY(mouth.drawing) 		);
	}, [rightEye, leftEye, mouth]);

	const eyesDistance = 5;
	const mouthDistance = 5;
	const biggerEyeY = Math.max(maxRightEye, maxLeftEye)

	const rightCentralization = (biggerEyeY-maxRightEye)/2;
	const leftCentralization  = (biggerEyeY-maxLeftEye)/2;

	const rightOpenness = maxRightEye*(1-eyesOpenness)/2;
	const leftOpenness  = maxLeftEye*(1-eyesOpenness)/2;

	const rightY = rightCentralization + rightOpenness;
	const leftY  = leftCentralization  + leftOpenness;

	return (
		<svg
			style={{height: '100%', width: '100%'}}
			viewBox={`0 0 ${255*2+eyesDistance} ${biggerEyeY+maxMouth+mouthDistance}`} 
			onClick={onClick}
		>
		   <g stroke="white" fill="none" strokeWidth={2} transform={`translate(0, ${rightY})`}>
				{rightEye.drawing.map((s, i)=>createPath(s, i, eyesOpenness))}
			</g>
			<g stroke="white" fill="none" strokeWidth={2} transform={`translate(${255+eyesDistance}, ${leftY})`}>
				{leftEye.drawing.map((s, i)=>createPath(s, i, eyesOpenness))}
			</g>
			<g stroke="white" fill="none" strokeWidth={2} transform={`translate(${255/2},${biggerEyeY+mouthDistance})`}>
				{mouth.drawing.map((s, i)=>createPath(s, i, 1))}
			</g>
		</svg>
	)
}

export default Drawing;