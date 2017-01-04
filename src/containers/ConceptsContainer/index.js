import React from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	StatusBar,
	StyleSheet,
	ToastAndroid,
	Dimensions,
	Animated,
	BackAndroid,
	Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import tts from 'react-native-android-speech';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
	Loading,
	ConceptCard,
	Explanation,
	Question
} from '../../components';

import {
	conceptSkip,
	conceptRead,
	conceptRight,
	conceptWrong,
	submitResult,
	toggleReferences,
	readingConcept,
	showAnswer
} from './actions';
import {tracker} from '../../lib/googleAnalytics';


const mapStateToProps = ({concepts, result}) => ({
	concepts,
	result
})

const mapDispatchToProps = dispatch => ({
	conceptSkip: (concept_key) => {dispatch(conceptSkip(concept_key))},
	conceptRead: (concept_key) => {dispatch(conceptRead(concept_key))},
	conceptRight: (concept_key) => {dispatch(conceptRight(concept_key))},
	conceptWrong: (concept_key) => {dispatch(conceptWrong(concept_key))},
	submitResult: (subject_key, mode, result) => {dispatch(submitResult(subject_key, mode, result))}
})


class ConceptsContainer extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			progress: new Animated.Value(0),
			references: false
		}

		this.endSessionAlert = this.endSessionAlert.bind(this)

		BackAndroid.addEventListener('hardwareBackPress', this.endSessionAlert)
	}

	componentDidMount(){
		tracker.trackScreenView('Reader')
	}

	componentWillUnmount(){

		BackAndroid.removeEventListener('hardwareBackPress', this.endSessionAlert)

		this.stopReading()
	}

	componentDidUpdate(){
		const {concepts} = this.props

		this.updateProgress()

		if (concepts.list.length === 0 && concepts.errorMessage == ""){
			this.endSession()
		}

	}

	render(){
		const {concepts, subject} = this.props

		return (
			<View style={styles.conceptCardContainer}>
				<StatusBar
					hidden={true}
					animated={true}
				/>
				{
					concepts.errorMessage.length > 1 && (
						<Text style={{color: 'red'}}>
							{concepts.errorMessage}
						</Text>
					)
				}
				{ 
					concepts.isFetching ? <Loading /> : (

						concepts.list.length > 0 && (
						
							<ConceptCard key={this.props.concepts.list[0].key}>
								{
									this.renderCardContents()
								}
							</ConceptCard>

						)
					)
				}
				{ !concepts.isFetching && this.renderActions() }
				{ this.renderProgressBar() }
			</View>
		)
	}

	renderProgressBar(){
		return (
			<Animated.View
				style={[
					styles.progress,
					{width: this.state.progress}
				]}
			/>
		)				
	}

	renderCardContents(){

		const concept = this.props.concepts.list[0]

		if (this.props.mode === "revise"){
			return (
				<Explanation 
					explanation={concept.explanation}
					references={concept.references}
					showRef={this.props.concepts.reference}
					tips={concept.tips}
				/>
			)
		}else if(this.props.mode === "test"){
			return ( <Question concept={concept} showAns={this.props.concepts.showAns} /> )
		}else{
			return (<Text>mode not supported</Text>)
		}
		
		
	}

	renderActions(){

		if (this.props.mode === "revise"){ 
			return(
				<View style={styles.actionsContainer}>
					<TouchableHighlight
						underlayColor="#50537f"
						style={styles.actionBtn}
						onPress={() => this.handleReferences()}
					>	
					{
						this.props.concepts.reference ? (
							<Icon name="short-text" size={35} color="#fff" />
						):(<Icon name="info-outline" size={35} color="#fff" />)
					}
					</TouchableHighlight>
					
					<TouchableHighlight
						style={styles.actionBtn}
						underlayColor="#50537f"
						onPress={() => {console.log('yo')}}
					>	
						<Icon name="star-border" size={35} color="#fff" />
					</TouchableHighlight>
					{
						this.props.concepts.isReading ? (

							<TouchableHighlight
								style={styles.actionBtn}
								underlayColor="#50537f"
								onPress={() => this.stopReading()}
							>	
								<Icon name="stop" size={35} color="#fff" />
							</TouchableHighlight>

						):(
							<TouchableHighlight
								style={styles.actionBtn}
								underlayColor="#50537f"
								onPress={() => this.readAloud()}
							>	
								<Icon name="volume-up" size={35} color="#fff" />
							</TouchableHighlight>

						)
					}

					<TouchableHighlight
						style={styles.actionBtn}
						underlayColor="#50537f"
						onPress={() => this.handleSkip()}
					>	
						<Icon name="skip-next" size={35} color="#fff" />
					</TouchableHighlight>
					
					<TouchableHighlight
						style={styles.actionBtn}
						underlayColor="#50537f"
						onPress={() => this.handleRead()}
					>	
						<Icon name="done" size={35} color="#fff" />
					</TouchableHighlight>
				
				</View>
			)
		}else if (this.props.mode === 'test'){
			return (

				<View style={styles.actionsContainer}>

					{
						this.props.concepts.showAns ? (

							<View style={{flexDirection: 'row'}}>
								<TouchableHighlight
									style={styles.actionBtn}
									underlayColor="#50537f"
									onPress={() => this.handleWrongAns()}
								>	
									<View style={styles.answerAction}>
										<Icon name="close" size={25} color="#fff" />
										<Text style={{
											fontSize: 15,
											color: 'white'
											}}
										> I was wrong</Text>
									</View>
								</TouchableHighlight>
								<TouchableHighlight
									style={styles.actionBtn}
									underlayColor="#50537f"
									onPress={() => this.handleRightAns()}
								>	
									<View style={styles.answerAction}>
										<Icon name="done" size={25} color="#fff" />
										<Text style={{
											fontSize: 15,
											color: 'white'
											}}
										> I was right</Text>
									</View>
								</TouchableHighlight>
							</View>

						) : (

							<TouchableHighlight
								style={styles.actionBtn}
								underlayColor="#50537f"
								onPress={() => this.handleShowAns()}
							>	
								<Text style={{
									fontSize: 25,
									color: 'white',
									textAlign: 'center'
								}}>Show answer</Text>
							</TouchableHighlight>

						)
					}
				</View>

			)
			
		}else{
			<Text>Mode not supported</Text>
		}
	}

	handleReferences(){
		this.props.dispatch(toggleReferences())
	}

	handleSkip(){
		this.props.conceptSkip(this.props.concepts.list[0].key)
	}

	handleRead(){
		this.props.conceptRead(this.props.concepts.list[0].key)
	}

	handleShowAns(){
		this.props.dispatch(showAnswer(true))
	}

	handleWrongAns(){
		this.props.conceptWrong(this.props.concepts.list[0].key)
		this.props.dispatch(showAnswer(false))

	}

	handleRightAns(){
		this.props.conceptRight(this.props.concepts.list[0].key)
		
		this.props.dispatch(showAnswer(false))

	}

	readAloud(){
		
		const concept = this.props.concepts.list[0]

		let textToSpeak = ""

		concept.explanation.map((node, i) => {
			switch(node.type){
				case 'title':
					textToSpeak = textToSpeak.concat(node.data, '.')
					break;
				case 'text':
					textToSpeak = textToSpeak.concat(node.data, '.')
					break;
				case 'image':
					break;
				case 'quote':
					textToSpeak = textToSpeak.concat(node.data, '.')
					break;
				case 'pointers':
					node.data.map((point, i) => {
						textToSpeak = textToSpeak.concat(`Point ${i + 1}. ${point.title}`, '.')
						point.nodes.map(node => {
							switch(node.type){
								case 'text':
									textToSpeak = textToSpeak.concat(node.data, '.')
									break;
								case 'image':
									break;
								default:
									textToSpeak = textToSpeak.concat("unknown node type. cant speak")
							}
						})
					})
					break;
				default:
					textToSpeak = textToSpeak.concat("unknown explanation type. cant speak")
			}
		})


		textToSpeak = textToSpeak.concat(". End of concept")

		textToSpeak = textToSpeak.replace(/\*/g, '');

		tts.speak({
		    text: textToSpeak,
		    pitch: 0.8,
		    forceStop : false
		}).then(isSpeaking=>{
		    //Success Callback
		    this.props.dispatch(readingConcept(true))
		}).catch(error=>{
		    //Errror Callback
		    this.props.dispatch(readingConcept(false))
		});
	}


	stopReading(){
		tts.stop()
		.then(isStopped=>{
		    this.props.dispatch(readingConcept(false))
		})
		.catch(error=>{
		    console.warn(error);
		});
	}


	updateProgress(){
		const {width} = Dimensions.get('window');
		const {concepts, result} = this.props

		const each = width / (concepts.list.length + result.data.length)
		const progress = each * result.data.length
		if(progress < width){
			Animated.timing(
				this.state.progress,
				{ toValue: progress}
			).start();
		}else{
			this.state.progress.setValue(0)
		}
	}

	async endSessionAlert(){
		var {concepts, result, subject, submitResult} = this.props
		
		if (concepts.list.length > 0){
			await Alert.alert(
				'End session?',
				`Only ${concepts.list.length} concepts left`,
				[
					{text: 'Cancel', onPress: () => {return false}},
					{text: 'Yea im done', onPress: () => { this.endSession() }}
				]
			)
		}
	}

	endSession(){
		const {submitResult, subject, result, mode} = this.props
		
		Actions.results()
		
		submitResult(subject.key, mode, {result: result.data})
	}

}

const styles = StyleSheet.create({
	conceptCardContainer: {
		flex: 1,
		position: 'relative',
		backgroundColor: '#50537f',
	},
	progress: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		height: 5,
		borderBottomRightRadius: 3,
		borderTopRightRadius: 3,
		backgroundColor: 'red'
	},
	actionsContainer: {
		position: 'absolute',
		bottom: 5,
		left: 5,
		right: 5,
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	actionBtn: {
		flex: 1,
		alignItems: 'center'
	},
	answerAction: {
		alignItems: 'center'
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(ConceptsContainer)