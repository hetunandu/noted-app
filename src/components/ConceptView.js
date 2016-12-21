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
import Loading from './Loading';
import {connect} from 'react-redux';
import ConceptCard from './ConceptCard';
import ActionBtn from './ActionBtn';
import Result from './Result';
import {
	setMode,
	conceptSkip,
	conceptRead,
	conceptRight,
	conceptWrong,
} from '../actions/concepts';
import tts from 'react-native-android-speech';

class ConceptView extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			progress: new Animated.Value(0),
			isSpeaking: false,
		}

		// BackAndroid.addEventListener('hardwareBackPress', async () => {
		// 	await Alert.alert(
		// 		'Finish session?',
		// 		'Your progress is saved',
		// 		[
		// 			{text: 'Cancel', onPress: () => {return false}},
		// 			{text: 'Yea im done', onPress: () => { Actions.pop() }}
		// 		]
		// 	)
		// })
	}

	componentDidUpdate(){
		this._updateProgress()

		tts.isSpeaking()
		.then(isSpeaking=>{
		    //Callback
		    if(isSpeaking !== this.state.isSpeaking){
		    	this.setState({isSpeaking})
		    }
		})
		.catch(error=>{
		    //if it fails 
		    console.log(error)
		});
	}

	handleSkip(){
		this.props.conceptSkip()
	}

	handleRead(){
		const {conceptReader, conceptRead} = this.props

		conceptRead(conceptReader.list[conceptReader.currentIndex].key)
	}

	handlePauseVoice(){
		tts.stop()
		.then(isStopped=>{
		    this.setState({
		    	isSpeaking: false
		    })
		})
		.catch(error=>{
		    console.log(error);
		});
	}

	handleVoicePressed(){
		const {conceptReader} = this.props

		let textToSpeak = ""

		conceptReader.list[conceptReader.currentIndex].explanation.map((node, i) => {
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
						textToSpeak = textToSpeak.concat(`Point ${i + 1}. ${point.title}`)
						point.nodes.map(node => {
							switch(node.type){
								case 'text':
									textToSpeak = textToSpeak.concat(node.data)
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
		    text: textToSpeak, // Mandatory
		    pitch: 0.7,
		    forceStop : false , //  Optional Parameter if true , it will stop TTS if it is already in process
		    language : 'en', // Optional Paramenter Default is en you can provide any supported lang by TTS
		    country : 'IN' // Optional Paramenter Default is null, it provoques that system selects its default
		}).then(isSpeaking=>{
		    //Success Callback
		    this.setState({
		    	isSpeaking: true
		    })
		}).catch(error=>{
		    //Errror Callback
		    this.setState({
		    	isSpeaking: false
		    })
		});



	}

	handleSeeAnswer(){
		this.props.setMode("answer")
	}

	handleRight(){
		const {conceptReader, setMode, conceptRight} = this.props

		conceptRight(conceptReader.list[conceptReader.currentIndex].key)
		setMode("question")
	}

	handleWrong(){
		const {conceptReader, setMode, conceptWrong} = this.props

		conceptWrong(conceptReader.list[conceptReader.currentIndex].key)
		setMode("question")
	}


	_renderActions(mode){
		switch(mode){
			case "study":
				return (
					<View style={styles.conceptActions}>
						<ActionBtn 
							backgroundColor="#C53337"
							underlayColor="#9d282c"
							iconName="skip-next"
							btnPressed={() => this.handleSkip()}
						/>
						{
							this.state.isSpeaking ? (
								<ActionBtn 
									backgroundColor="#333"
									underlayColor="#444"
									iconName="pause"
									btnPressed={() => this.handlePauseVoice()}
								/>
							) : (
								<ActionBtn 
									backgroundColor="#333"
									underlayColor="#444"
									iconName="volume-up"
									btnPressed={() => this.handleVoicePressed()}
								/>
							)
						}
						<ActionBtn 
							backgroundColor="#2E7F2E"
							underlayColor="#246524"
							iconName="done"
							btnPressed={() => this.handleRead()}
						/>
					</View>
				)
			case "question":
				return (
					<ActionBtn 
						backgroundColor="#333"
						underlayColor="#444"
						btnText="Check answer"
						btnPressed={() => this.handleSeeAnswer()}
					/>
				)
			case "answer":
				return (
					<View style={styles.conceptActions}>
						<ActionBtn 
							backgroundColor="#C53337"
							underlayColor="#9d282c"
							iconName="close"
							btnText="I was wrong"
							btnPressed={() => this.handleWrong()}
						/>
						<ActionBtn 
							backgroundColor="#2E7F2E"
							underlayColor="#246524"
							iconName="done"
							btnText="I was right"
							btnPressed={() => this.handleRight()}
						/>
					</View>

				)
			default:
				return <View></View>
		}
	}

	_updateProgress(){
		var {width} = Dimensions.get('window');
		const each = width / this.props.conceptReader.list.length
		const progress = each * this.props.conceptReader.currentIndex
		if(progress < width){
			Animated.timing(
				this.state.progress,
				{ toValue: progress}
			).start();
		}else{
			this.state.progress.setValue(0)
		}
	}


	render(){
		const {conceptReader, subject} = this.props
		const concept = conceptReader.list[conceptReader.currentIndex]

		return (
			<View style={{flex: 1}}>
				<StatusBar
					hidden={true}
					animated={true}
				/>
				<View style={styles.conceptCardContainer}>
					<Animated.View
						style={[
							styles.progress,
							{width: this.state.progress}
						]}
					/>
					{
						this.props.conceptReader.isFetching ? (
							<Loading />
						)
						:
						(
							concept && (
								<View style={{flex: 1}}>
									<ConceptCard
										key={concept.key}
										concept={concept}
										mode={conceptReader.mode}
									/>
									<View style={{flex: 1}}>
										{
											this._renderActions(conceptReader.mode)
										}
									</View>
								</View>
							)
						)
					}
					{
						(conceptReader.currentIndex == conceptReader.list.length
							&& !conceptReader.isFetching) && (
							<Result
								mode={conceptReader.mode}
								subject={subject}
							/>
						)
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	conceptCardContainer: {
		flex: 1,
		position: 'relative',
	},
	progress: {
		position: 'absolute',
		top: 1,
		left: 0,
		height: 5,
		borderBottomRightRadius: 3,
		borderTopRightRadius: 3,
		backgroundColor: 'red'
	},
	conceptActions: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
	}
})


const mapStateToProps = ({conceptReader}) => ({
	conceptReader
})

const mapDispatchToProps = dispatch => ({
	setMode: (mode) => {dispatch(setMode(mode))},
	conceptSkip: () => {dispatch(conceptSkip())},
	conceptRead: (concept_key) => {dispatch(conceptRead(concept_key))},
	conceptRight: (concept_key) => {dispatch(conceptRight(concept_key))},
	conceptWrong: (concept_key) => {dispatch(conceptWrong(concept_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)
