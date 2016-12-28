import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	BackAndroid,
	TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import { fetchSubjectList } from '../actions/subjects';
import { submitResult } from '../actions/concepts';
import Navbar from './Navbar';
import Loading from './Loading';
import { Actions } from 'react-native-router-flux';
import {tracker} from '../lib/googleAnalytics';


class Result extends Component {

	constructor(props){
		super(props)

		this.handleBack = this.handleBack.bind(this)

		BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
	}

	componentDidMount(){
		tracker.trackScreenView('Result')
	}

	componentWillUnmount(){
		BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
	}

	handleBack(){
		this.props.fetchSubjectList()
	}

	getResultCount(marking){
		counter = 0
		this.props.result.data.map( (concept) => {
			if (concept.marked == marking){
				counter ++
			}
		})

		return counter
	}

	render(){
		return (
			<View style={styles.resultContainer}>
				<Navbar title="Result"/>
				<View style={styles.resultInfoContainer}>
					{
						this.props.result.isFetching ? (
							<Loading />
						) : (
							<View>
							{
								this.props.result.errorMessage.length > 1 && (
									<Text style={{color: 'red'}}>
										{this.props.result.errorMessage}
									</Text>
								)	
							}
								<Text style={styles.pageHeader}>Summary</Text>
								<View style={styles.summaryContainer}>
									<View style={styles.summaryRow}>
										<Text style={styles.summaryInfo}>
											Points Earned
										</Text>
										<Text style={styles.summaryValue}>
											{this.props.result.points}
										</Text>
									</View>
									<View style={styles.summaryRow}>
										<Text style={styles.summaryInfo}>
											Read
										</Text>
										<Text style={styles.summaryValue}>
											{this.getResultCount('read')}
										</Text>
									</View>
									<View style={styles.summaryRow}>
										<Text style={styles.summaryInfo}>
											Skipped
										</Text>
										<Text style={styles.summaryValue}>
											{this.getResultCount('skip')}
										</Text>
									</View>
								</View>
								<TouchableHighlight 
									style={styles.backButton}
									onPress={ () => {
										this.props.fetchSubjectList()
										Actions.pop()
									}}
								>
									<Text style={{
										color: '#fff',
										textAlign: 'center',
										fontSize: 25
										}}
									>
										Back to Home
									</Text>
								</TouchableHighlight>
							</View>
						)
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	resultContainer:{
		flex: 1,
	},
	resultInfoContainer:{
		flex: 1,
	},
	backButton:{
		alignSelf: 'stretch',
		padding: 10,
		backgroundColor: '#333'
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
	pageHeader:{
		textAlign: 'center',
		fontSize: 30,
		fontWeight: '500',
		color: '#000'
	}
})


const mapStateToProps = ({result}) => ({
	result
})

const mapDispatchToProps = dispatch => ({

	fetchSubjectList: () => {dispatch(fetchSubjectList())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Result)
