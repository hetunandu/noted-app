import React, {Component} from 'react';
import {tracker} from '../../lib/googleAnalytics';
import {View, Text, TouchableHighlight, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {
	readSingleConcept,
	downloadIndexOffline
} from './actions';
import {
	Loading,
	SubjectIndex
} from '../../components';
import NavbarContainer from '../NavbarContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
				<NavbarContainer
					title={this.props.subject.name}
				/>
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
		Actions.concepts({subject: this.props.subject, mode: 'revise'})
		this.props.dispatch(readSingleConcept(this.props.subject.key, concept.key))
	}

}


export default connect(mapStateToProps)(IndexContainer)
