import React from 'react';
import styled from 'styled-components';
import charismaticFace from './charismaticFace.png';

const Container = styled.div`
	margin: 0 auto;
	padding-bottom: 30px;
	@media (max-width: 600px) {
    	width: 100%;  
    }
    @media (min-width: 600px) { 
    	width: 75%; 
    }
    @media (min-width: 1000px) { 
    	width: 50%; 
    }
`;
const IconImage = styled.div`
	background: black; 
	background-image: url(${charismaticFace});
	background-size: 90%;
	background-position: center;
	background-repeat: no-repeat;
	margin: 0 auto;
	border-radius: 50%;
	border: solid 1px #88001B;
	@media (max-width: 600px) {
    	height: 8em; 
		width: 8em; 
    }
    @media (min-width: 600px) {
    	height: 5em; 
		width: 5em;
    }
    @media (min-width: 1000px) {
    	height: 3em; 
		width: 3em;
    }
`;
const Title = styled.h1`
	color: white; 
	text-align: center;

	@media (max-width: 600px) {
    	font-size: 3em; 
    }
    @media (min-width: 600px) {
    	font-size: 2em; 
    }
    @media (min-width: 1000px) {
    	font-size: 1em; 
    }
`;
const Paragraph = styled.p`
	color: white; 
	
	text-align: justify;
	@media (max-width: 600px) {
    	font-size: 1.2em;
    }
    @media (min-width: 600px) {
    	font-size: 1em; 
    }
    @media (min-width: 1000px) {
    	font-size: 0.5em; 
    }
`;


const About = () => {
	return (
		<Container> 
			<IconImage />
			<Title> Charismatic Faces </Title>
			
			<Paragraph>
				Charismatic Faces is a project created with the "Quick, draw!" game dataset, where each 
				drawing was made by a different person.
			</Paragraph>
			<Paragraph>
				It's made with React and d3
			</Paragraph>
		</Container>
	)
}

export default About;