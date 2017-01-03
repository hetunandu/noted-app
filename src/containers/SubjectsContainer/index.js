import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {
	fetchSubjectList,
	fetchSubjectIndex,
	subjectCooldownSkip,
	fetchRevisionConcepts,
	fetchTestConcepts
} from './actions';
import {
	SubjectCard,
	Loading,
	Navbar
} from '../../components';


const mapStateToProps = ({subjects}) => ({
	subjects
})

class SubjectsContainer extends Component {

	componentDidMount(){
		this.props.dispatch(fetchSubjectList())
	}

	render(){
		return (
			<View style={{flex: 1}}>
				<Navbar title="Subjects"/>
				{
					this.props.subjects.isFetching ? <Loading /> : (
						<ScrollView >
						{
							this.props.subjects.list.map( subject => {
								return (
									<SubjectCard 
										key={subject.key} 
										subject={subject}

										onCooldownSkip={() => this.handleCooldownSkip(subject)}
										onRevisionPressed={() => this.handleRevisionPressed(subject)}
										onTestPressed={() => this.handleTestPressed(subject)}
										onIndexPressed={() => this.handleIndexPressed(subject)}
									/>
								)
							})
						}
						
						</ScrollView>

					)

				}
			</View>
		)
	}


	handleCooldownSkip(subject){
		this.props.dispatch(subjectCooldownSkip(subject.key))
	}

	handleRevisionPressed(subject){
		this.props.dispatch(fetchRevisionConcepts(subject.key))
	}

	handleTestPressed(subject){
		this.props.dispatch(fetchTestConcepts(subject.key))
	}

	handleIndexPressed(subject){
		Actions.index({subject})
		this.props.dispatch(fetchSubjectIndex(subject.key))
	}

}


export default connect(mapStateToProps)(SubjectsContainer)