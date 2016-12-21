import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';
import Loading from './Loading';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {fetchSubjectList, fetchSubjectDetail } from '../actions/subjects';

class Subjects extends Component{

	componentDidMount(){
		this.props.fetchSubjectList()
	}

	subjectPressed(subject){
		this.props.fetchSubjectDetail(subject.key)
		Actions.subjectDetail({'title': subject.name})
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
						this.props.subjects.list.map((subject, i) => {
							return (
								<TouchableHighlight
									key={i}
									underlayColor="#f1f1f1"
									style={styles.subjectBtn}
									onPress={this.subjectPressed.bind(this, subject)}
								>
									<View>
										<Text style={styles.subjectName}>
											{subject.name}
										</Text>
									</View>
								</TouchableHighlight>
							)
						})
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
	fetchSubjectList: () => {dispatch(fetchSubjectList())},
	fetchSubjectDetail: (subject_key) => {dispatch(fetchSubjectDetail(subject_key))},
})

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)