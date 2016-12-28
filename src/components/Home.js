import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	ScrollView
} from 'react-native';
import Navbar from './Navbar';
import SubjectCard from './SubjectCard';
import Loading from './Loading';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {tracker} from '../lib/googleAnalytics';
import { fetchSubjectList } from '../actions/subjects';

class Home extends Component{

	componentDidMount(){
		tracker.trackScreenView('Home')

		this.props.fetchSubjectList()
	}

	render(){
		return (
			<View style={styles.container}>
				<Navbar title="Home"/>
				{
					this.props.subjects.isFetching ? <Loading /> : (
						<ScrollView >
						{
							this.props.subjects.list.map( subject => {
								return (
									<SubjectCard key={subject.key} subject={subject}/>
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
	},
	subjectBtn: {
		margin: 10,
		padding: 15,
		backgroundColor: 'white',
		elevation: 3,
		borderRadius: 3
	},
	subjectName: {
		fontSize: 25
	}
})


const mapStateToProps = ({subjects}) => ({
	subjects
})

const mapDispatchToProps = dispatch => ({
	fetchSubjectList: () => {dispatch(fetchSubjectList())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)