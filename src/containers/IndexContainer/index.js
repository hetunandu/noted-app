import React, {Component} from 'react';
import {tracker} from '../../lib/googleAnalytics';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import { readSingleConcept } from './actions';
import {
	Loading,
	Navbar,
	SubjectIndex
} from '../../components';

const mapStateToProps = ({index}) => ({
	index
})

class IndexContainer extends Component {

	componentDidMount(){
		tracker.trackScreenView('Index')
	}
	
	render(){
		return (
			<View style={{flex: 1}}>
				<Navbar title={this.props.subject.name}/>
				{
					this.props.index.isFetching ? <Loading /> : (
						<SubjectIndex 
							chapters={this.props.index.chapters} 
							onConceptSelected={(concept) => this.handleConceptSelected(concept)}
						/>
					)
				}
			</View>
		)
	}

	handleConceptSelected(concept){

	}

}


export default connect(mapStateToProps)(IndexContainer)