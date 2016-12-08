import React from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	StatusBar,
	StyleSheet,
	ToastAndroid,
	Dimensions,
	Animated
} from 'react-native';
import Loading from './Loading';
import {connect} from 'react-redux';
import ConceptCard from './ConceptCard';
import ConceptActions from './ConceptActions';
import Result from './Result';
import {
	setMode,
	conceptSkip,
	conceptDone,
	conceptRight,
	conceptWrong,
} from '../actions/concepts';


class ConceptView extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			progress: new Animated.Value(0)
		}
	}

	componentDidUpdate(){
		this._updateProgress()
	}

	handleSkip(){
		this.props.conceptSkip()
	}

	handleDone(){
		const {conceptReader, conceptDone} = this.props

		conceptDone(conceptReader.list[conceptReader.currentIndex].key)
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
					<ConceptActions
						successText="Done"
						successPressed={() => this.handleDone()}
						failText="Skip"
						failPressed={() => this.handleSkip()}
					/>
				)
			case "question":
				return (
					<ConceptActions
						neutralText="See Answer"
						neutralPressed={() => this.handleSeeAnswer()}
					/>
				)
			case "answer":
				return (
					<ConceptActions
						successText="I was right"
						successPressed={() => this.handleRight()}
						failText="I was wrong"
						failPressed={() => this.handleWrong()}
					/>
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
		backgroundColor: "#50537f",
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
	}
})


const mapStateToProps = ({conceptReader}) => ({
	conceptReader
})

const mapDispatchToProps = dispatch => ({
	setMode: (mode) => {dispatch(setMode(mode))},
	conceptSkip: () => {dispatch(conceptSkip())},
	conceptDone: (concept_key) => {dispatch(conceptDone(concept_key))},
	conceptRight: (concept_key) => {dispatch(conceptRight(concept_key))},
	conceptWrong: (concept_key) => {dispatch(conceptWrong(concept_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)
