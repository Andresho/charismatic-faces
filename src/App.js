import React from 'react';
import ShowFaces from './ShowFaces';
import About from './About';

import styled from 'styled-components';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";


const MainDiv = styled.div`
	display: flex;
	justify-content: center;
	height: 100%;
	width: 100%;
	@media (max-width: 650px) {
		padding: 3em;
    }
    @media (min-width: 650px) {
		padding: 1.25em;
    }
`;

function App(){
	return (
		<Router>
			<MainDiv>
				<Switch>
					<Route path="/" exact component={ShowFaces} />
					<Route path='/about' component={About} />
				</Switch>
			</MainDiv>
		</Router>
	)
}

export default App;