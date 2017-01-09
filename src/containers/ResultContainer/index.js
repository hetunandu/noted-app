import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	BackAndroid,
	TouchableHighlight,
	StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import { Loading, PointsDisplay } from '../../components';
import NavbarContainer from '../NavbarContainer'
import { Actions } from 'react-native-router-flux';
import {tracker} from '../../lib/googleAnalytics';


const mapStateToProps = ({result}) => ({
	result
})

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
		Actions.pop()
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
				<NavbarContainer title="Result"/>
				<View style={styles.resultInfoContainer}>
					{
						this.props.result.isFetching ? (
							<Loading />
						) : (
							<View style={{flex: 1}}>
								{
									this.props.result.errorMessage.length > 1 && (
										<Text style={{color: 'red'}}>
											{this.props.result.errorMessage}
										</Text>
									)
								}
								{ this.renderSummary() }

								{ this.renderPoints() }
								<TouchableHighlight
									style={styles.backButton}
									onPress={ () => {
										Actions.pop()
									}}
								>
									<Text style={{
										color: '#fff',
										textAlign: 'center',
										fontSize: 25
										}}
									>
										Study more!
									</Text>
								</TouchableHighlight>
							</View>
						)
					}
				</View>
			</View>
		)
	}


	renderSummary(){
		if(this.props.mode == "revise"){
			return (
				<View style={styles.summaryContainer}>
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

			)
		}else if( this.props.mode == "test"){
			return (
				<View style={styles.summaryContainer}>
					<View style={styles.summaryRow}>
						<Text style={styles.summaryInfo}>
							Correct
						</Text>
						<Text style={styles.summaryValue}>
							{this.getResultCount('right')}
						</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text style={styles.summaryInfo}>
							Wrong
						</Text>
						<Text style={styles.summaryValue}>
							{this.getResultCount('wrong')}
						</Text>
					</View>
				</View>
			)
		}
	}


	renderPoints(){
		return (
			<View style={styles.pointsContainer}>
				<Text style={styles.pointsText}>
					You Earned
				</Text>
				<PointsDisplay points={this.props.result.points} />
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
		padding: 20,
		backgroundColor: '#333'
	},
	summaryContainer: {
		flex: 1,
		margin: 20,
		alignSelf: 'stretch',
		borderRadius: 2,
		justifyContent: 'center'
	},
	summaryRow: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#444'
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
	},
	pointsContainer: {
		flex: 1,
		backgroundColor: '#50537f',
		alignItems: 'center',
		justifyContent: 'center'
	},
	pointsText: {
		color: 'white',
		fontSize: 25
	}
})



export default connect(mapStateToProps)(Result)
