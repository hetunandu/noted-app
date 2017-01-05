import React, {Component} from 'react';
import {
	View,
	AsyncStorage
} from 'react-native';
import AppIntro from 'react-native-app-intro';
import {
	intro1,
	intro2,
	intro3,
	intro4
} from '../../images';
import {Actions} from 'react-native-router-flux';

class Intro extends Component {
  	
  	render() {
	    const pageArray = [{
	      	title: 'Revise Daily',
	      	description: 'Nail down concepts while learning from rich byte-sized cards',
	      	img: intro1,
	      	imgStyle: {
	        	height: 250,
	        	width: 180
	      	},
	      	backgroundColor: '#50537f',
	      	fontColor: '#fff',
	      	level: 10,
	    }, {
	      	title: 'Test yourself',
	      	description: 'Answer questions on concepts you have revised',
	      	img: intro2,
	      	imgStyle: {
	        	height: 68,
	        	width: 354,
	      	},
	      	backgroundColor: '#50537f',
	      	fontColor: '#fff',
	      	level: 10,
	    }, {
	      	title: 'Earn coins',
	      	description: 'Every time you learn you earn coins.',
	      	img: intro3,
	      	imgStyle: {
	        	height: 104,
	        	width: 175,
	      	},
	      	backgroundColor: '#50537f',
	      	fontColor: '#fff',
	      	level: 10,
	    }, {
	      	title: 'Use coins',
	      	description: 'Get ahead of others by using coins you have earned',
	      	img: intro4,
	      	imgStyle: {
	        	height: 200,
	        	width: 340,
	      	},
	      	backgroundColor: '#50537f',
	      	fontColor: '#fff',
	      	level: 10,
	    }];
	    return (
	      	<AppIntro
	        	onDoneBtnClick={() => this.doneBtnHandle()}
	        	pageArray={pageArray}
	        	doneBtnLabel="Login"
	        	showSkipButton={false}
	      	/>
	    );
	}

	doneBtnHandle(){
  		this.props.onLoginPressed()
  	}

}

export default Intro

