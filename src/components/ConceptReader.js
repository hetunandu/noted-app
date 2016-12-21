import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	ScrollView,
    StatusBar,
    TouchableHighlight,
    BackAndroid,
	Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Loading from './Loading';
import { fetchSubjectList } from '../actions/subjects'
import ConceptCard from './ConceptCard';

class ConceptReader extends Component{

    constructor(props){
        super(props)

        BackAndroid.addEventListener('hardwareBackPress', async () => {
			await Alert.alert(
				'Finish session?',
				'Your progress is saved',
				[
					{text: 'Cancel', onPress: () => {return false}},
					{text: 'Yea im done', onPress: () => { 
                        this.props.fetchSubjectList()
                        Actions.pop() 
                    }}
				]
			)
		})
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
                                    <View style={styles.navigation}>
                                        <Text>Next</Text>
                                    </View>
								</View>
							)
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
    navigation: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    }
})

const mapStateToProps = ({conceptReader}) => ({
	conceptReader
})

const mapDispatchToProps = dispatch => ({
    fetchSubjectList: () => {dispatch(fetchSubjectList())},
	setMode: (mode) => {dispatch(setMode(mode))},
	conceptSkip: () => {dispatch(conceptSkip())},
	conceptDone: (concept_key) => {dispatch(conceptDone(concept_key))},
	conceptRight: (concept_key) => {dispatch(conceptRight(concept_key))},
	conceptWrong: (concept_key) => {dispatch(conceptWrong(concept_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptReader)