import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import ActionBtn from './ActionBtn';
import {connect} from 'react-redux';
import { fetchSubjectList } from '../actions/subjects';
import {
	fetchRevisionConcepts,
	fetchTestConcepts,
	setMode
} from '../actions/concepts';
import Navbar from './Navbar';
import { Actions } from 'react-native-router-flux';


class Result extends Component {

	handleTest(){
		const {fetchTestConcepts, subject, setMode} = this.props

		fetchTestConcepts(subject.key)
		setMode("question")

	}

	handleRevision(){
		const {fetchRevisionConcepts, subject, setMode} = this.props

		fetchRevisionConcepts(subject.key)
		setMode("study")
	}

	handleBack(){
		this.props.fetchSubjectList()
		Actions.pop()
	}

	_renderResult(){
		switch (this.props.mode) {
			case "question":
				return (
					<View style={styles.summaryContainer}>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryInfo}>
								Right
							</Text>
							<Text style={styles.summaryValue}>
								{this.props.result.right}
							</Text>
						</View>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryInfo}>
								Wrong
							</Text>
							<Text style={styles.summaryValue}>
								{this.props.result.wrong}
							</Text>
						</View>
					</View>
				)
			case "study":
				return (
					<View style={styles.summaryContainer}>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryInfo}>
								Revised
							</Text>
							<Text style={styles.summaryValue}>
								{this.props.result.read}
							</Text>
						</View>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryInfo}>
								Skipped
							</Text>
							<Text style={styles.summaryValue}>
								{this.props.result.skip}
							</Text>
						</View>
					</View>
				)
			default:
				return (<View></View>)
		}
	}


	render(){
		return (
			<View style={styles.resultContainer}>
				<Navbar title="Result"/>
				<View style={styles.resultInfoContainer}>
					{this._renderResult()}
				</View>
				{
					this.props.mode == "study" && (
						<View style={styles.resultActions}>
							<ActionBtn 
								backgroundColor="#333"
								underlayColor="#444"
								btnText="Test revised concepts"
								btnPressed={() => this.handleTest()}
							/>
							<ActionBtn 
								backgroundColor="#333"
								underlayColor="#444"
								btnText="Back to subjects"
								btnPressed={() => this.handleBack()}
							/>
						</View>
					)
				}
				{
					this.props.mode == "question" && (
						<View style={styles.resultActions}>
							<ActionBtn 
								backgroundColor="#333"
								underlayColor="#444"
								btnText="Test Again"
								btnPressed={() => this.handleTest()}
							/>
							<ActionBtn 
								backgroundColor="#333"
								underlayColor="#444"
								btnText="Back to subjects"
								btnPressed={() => this.handleBack()}
							/>
						</View>
					)
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	resultContainer:{
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'center'
	},
	resultInfoContainer:{
		flex: 3,
		justifyContent: 'center',
	},
	summaryContainer: {
		margin: 20,
		alignSelf: 'stretch',
		borderWidth: 1,
		borderColor: '#333',
		borderRadius: 2
	},
	summaryRow: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#444'
	},
	summaryInfo: {
		fontSize: 20,
		color: '#333'
	},
	summaryValue:{
		fontSize: 25,
		fontWeight: 'bold',
		color: '#333'
	},
	promoText: {
		textAlign: 'center',
		color: 'white',
		backgroundColor: 'red',
		padding: 10,
		fontSize: 20
	},
	resultText:{
		textAlign: 'center',
		fontSize: 25,
		fontWeight: '500',
		color: '#000'
	},
	resultActions: {
		flex: 2,
		justifyContent: 'space-between',
		flexDirection: 'column'
	}
})


const mapStateToProps = ({result}) => ({
	result
})

const mapDispatchToProps = dispatch => ({
	fetchRevisionConcepts: (subject_key) => {
		dispatch(fetchRevisionConcepts(subject_key))
	},
	fetchTestConcepts: (subject_key) => {
		dispatch(fetchTestConcepts(subject_key))
	},
	fetchSubjectList: () => {dispatch(fetchSubjectList())},
	setMode: (mode) => {dispatch(setMode(mode))},

})

export default connect(mapStateToProps, mapDispatchToProps)(Result)
