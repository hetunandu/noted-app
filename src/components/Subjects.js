import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	ScrollView,
} from 'react-native';
import Loading from './Loading';
import SubjectCard from './SubjectCard';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {fetchSubjectList } from '../actions/subjects';
import {fetchRevisionConcepts, fetchTestConcepts, setMode } from '../actions/concepts';


class Subjects extends Component{

	componentDidMount(){
		this.props.fetchSubjectList()
	}

	handleRevisionPressed(subject){
		Actions.conceptView({subject})

		this.props.setMode("study")
		this.props.fetchRevisionConcepts(subject.key)
	}

	handleTestPressed(subject){
		Actions.conceptView({subject})

		this.props.setMode("question")
		this.props.fetchTestConcepts(subject.key)
	}

	render(){
		return (
			<View style={styles.container}>

				{
					this.props.subjects.isFetching ? (
						<Loading />
					)
					: 
					(
						<ScrollView style={{flex: 1}}>
							{
								this.props.subjects.data.map( subject => {
									return (
										<SubjectCard 
											subject={subject}
											startRevision={() => this.handleRevisionPressed(subject)}
											startTest={() =>this.handleTestPressed(subject)}
											key={subject.key} 
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
}

const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		flex: 1
	}
})


const mapStateToProps = ({subjects}) => ({
	subjects
})

const mapDispatchToProps = dispatch => ({
	fetchSubjectList: () => {dispatch(fetchSubjectList())},
	fetchRevisionConcepts: (subject_key) => {dispatch(fetchRevisionConcepts(subject_key))},
	fetchTestConcepts: (subject_key) => {dispatch(fetchTestConcepts(subject_key))},
	setMode: (mode) => {dispatch(setMode(mode))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)