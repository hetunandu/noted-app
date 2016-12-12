import React from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	StyleSheet,
	ToastAndroid
} from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import Icon from 'react-native-vector-icons/MaterialIcons';


class SubjectCard extends React.Component {

	constructor(props) {
		super(props);

		this.state = {time_left: "Calculating..."};

	}

	componentDidMount(){
		this.setInterval(this.countdown, 1000)
	}

	countdown(){
		const {subject} = this.props

		if(subject.has_data_count > 0){

			var date = new Date(subject.next_concepts_on)
			var ist_date = new Date(date.valueOf() + date.getTimezoneOffset());
			var time_left = ist_date - new Date()

			if (time_left < 0){
				this.clearInterval()
				this.setState({
					time_left: -1
				})
			}else{
				var _second = 1000;
				var _minute = _second * 60;
				var _hour = _minute * 60;
				var _day = _hour * 24;

				var hours = Math.floor((time_left % _day) / _hour);
				var minutes = Math.floor((time_left % _hour) / _minute);
				var seconds = Math.floor((time_left % _minute) / _second);


				this.setState({
					time_left: `${hours}h ${minutes}m ${seconds}s`
				})
			}
		}
	}


	handleTestPressed(){
		if(this.props.subject.is_done_count > 9){
			this.props.startTest()
		}else{
			ToastAndroid.show(
				"You need to revise alteast 10 concepts before we can test",
				ToastAndroid.LONG
			)
		}
	}

	render() {
		const {subject} = this.props

		return (
			<View>
				{
					subject.has_data_count > 0 ? (
						<View style={styles.subjectCard} >
							<View style={styles.subjectHeader}>
								<Text style={styles.subjectName}>
									{subject.name}
								</Text>
								<Text style={styles.subjectTotalConcepts}>
									{subject.total_concepts}
								</Text>
							</View>
							<View style={styles.subjectInfoContainer}>
								<View style={styles.subjectInfoRow}>
									<Text style={styles.subjectInfoText}>
										Revised
									</Text>
									<Text style={styles.subjectInfoValue}>
										{subject.is_done_count}
									</Text>
								</View>
								<View style={styles.subjectInfoRow}>
									<Text style={styles.subjectInfoText}>
										Correct
									</Text>
									<Text style={styles.subjectInfoValue}>
										{subject.is_right_count}
									</Text>
								</View>
							</View>
							<View style={styles.subjectActions}>
								<TouchableHighlight
									style={[styles.actionBtn]}
									underlayColor="#f1f1f1"
									disabled={this.state.time_left !== -1 }
									onPress={() => this.props.startRevision()}
								>
									{
										this.state.time_left === -1 ? (
											<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
												<Text style={styles.actionBtnText} >Revise</Text>
												<Icon name="chevron-right" size={30} color="#333" />
											</View>
										)
										:
										(
											<Text style={[
													styles.actionBtnText,
													{color: 'red'}
												]}
											>
												Wait {this.state.time_left}
											</Text>
										)
									}
								</TouchableHighlight>

								<TouchableHighlight
									style={[styles.actionBtn]}
									underlayColor="#f1f1f1"
									onPress={() => this.handleTestPressed()}
								>
									<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
										<Text style={styles.actionBtnText} >Test</Text>
										<Icon name="chevron-right" size={30} color="#333" />
									</View>
								</TouchableHighlight>
								
							</View>
						</View>
					) 
					: 
					(
						<TouchableHighlight
							style={styles.subjectListItemContainer}
							underlayColor="#f1f1f1"
							onPress={() => this.props.startRevision()}
						>
							<View style={styles.subjectHeader}>
								<Text style={styles.subjectName}>
									{subject.name}
								</Text>
								<Icon name="chevron-right" size={30} color="#333" />
							</View>
						</TouchableHighlight>
					)
				}
			</View>
		);
	}
}

// Add react timer mixin to the subject class
reactMixin(SubjectCard.prototype, TimerMixin)

const styles = StyleSheet.create({
	subjectCard: {
		backgroundColor: 'white',
		justifyContent: 'center',
		elevation: 2,
		borderRadius: 5,
		margin: 10
	},
	subjectHeader: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	subjectName: {
		padding: 5,
		fontWeight: '500',
		fontSize: 30,
	},
	subjectTotalConcepts: {
		padding: 5,
		fontWeight: '800',
		fontSize: 30,
	},
	subjectInfoContainer: {

	},
	subjectInfoRow: {
		padding: 5,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		borderBottomColor: '#f1f1f1',
		borderBottomWidth: 1
	},
	subjectInfoText: {
		fontSize: 20
	},
	subjectInfoValue: {
		fontSize: 25,
		fontWeight: '600'
	},
	subjectListItemContainer:{
		backgroundColor: 'white',
		elevation: 2,
		borderRadius: 5,
		margin: 10,
		padding: 10
	},
	subjectActions: {
	},
	actionBtn: {
		padding: 15,
		borderBottomColor: '#BBB',
		borderBottomWidth: 1
	},
	actionBtnText: {
		fontSize: 20,
		fontWeight: '500'
	}

})

export default SubjectCard;
