import React, {Component} from 'react';
import {View, Text, ScrollView, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {
	fetchSubjectList,
	fetchSubjectIndex,
	subjectCooldownSkip,
	fetchRevisionConcepts,
	fetchTestConcepts,
	downloadSubjectOffline,
	foundOfflineSubject,
	loadOfflineSubject
} from './actions';
import {
	SubjectCard,
	Loading
} from '../../components';
import NavbarContainer from '../NavbarContainer'


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
				<NavbarContainer title="Subjects"/>
				{
					this.props.subjects.isFetching ? <Loading /> : (
						<ScrollView >
						{
							this.props.subjects.list.map( subject => {
								return (
									<SubjectCard
										key={subject.key}
										subject={subject}

										onCooldownSkip={(cost) => this.handleCooldownSkip(subject, cost)}
										onRevisionPressed={() => this.handleRevisionPressed(subject)}
										onTestPressed={() => this.handleTestPressed(subject)}
										onIndexPressed={() => this.handleIndexPressed(subject)}
										onDownloadPressed={() => this.handleDownloadPressed(subject)}
										isOffline={() => this.handleOfflineSubject(subject)}
										onOfflineStudyPressed={() => this.handleOfflineStudy(subject)}
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


	handleCooldownSkip(subject, cost){
		this.props.dispatch(subjectCooldownSkip(subject.key, cost))
	}

	handleRevisionPressed(subject){
		Actions.concepts({subject, mode: 'revise'})
		this.props.dispatch(fetchRevisionConcepts(subject.key))
	}

	handleTestPressed(subject){
		Actions.concepts({subject, mode: 'test'})
		this.props.dispatch(fetchTestConcepts(subject.key))
	}

	handleIndexPressed(subject){
		Actions.index({subject})
		this.props.dispatch(fetchSubjectIndex(subject.key))
	}

	handleDownloadPressed(subject){
		this.props.dispatch(downloadSubjectOffline(subject.key))
	}

	handleOfflineSubject(subject){
		this.props.dispatch(foundOfflineSubject(subject.key))
	}

	handleOfflineStudy(subject){
		Actions.offlineReader()

		storage.load({
			key: 'subject',
			id: subject.key
		}).then(subject => {
			this.props.dispatch(loadOfflineSubject(subject))
		}).catch(err => {
			ToastAndroid.show('Error loading subject', ToastAndroid.SHORT)
		})

	}

}


export default connect(mapStateToProps)(SubjectsContainer)
