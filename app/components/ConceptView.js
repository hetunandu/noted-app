import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    StatusBar,
    ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import {connect} from 'react-redux';
import ConceptCard from './ConceptCard';
import ConceptActions from './ConceptActions';
import {fetchSubjectList } from '../actions/subjects';
import {
    fetchRevisionConcepts,
    fetchTestConcepts,
    setMode,
    conceptSkip,
    conceptDone,
    conceptRight,
    conceptWrong,
} from '../actions/concepts';


class ConceptView extends React.Component {

    // Concept actions

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

    // Result Actions

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
        return(
            <View style={styles.resultContainer}>
                <Text style={styles.promoText}>
                    Buy pro to get all concepts at once
                </Text>
                <View style={styles.resultInfoContainer}>
                    <Text style={styles.resultText}>
                        Done: {this.props.result.done}
                    </Text>
                    <Text style={styles.resultText}>
                        Skip: {this.props.result.skip}
                    </Text>
                    <Text style={styles.resultText}>
                        Right: {this.props.result.right}
                    </Text>
                    <Text style={styles.resultText}>
                        Wrong: {this.props.result.wrong} 
                    </Text>
                </View>
                <View style={styles.resultActions}>
                    <ConceptActions
                        neutralText="Test concepts that are done"
                        neutralPressed={() => this.handleTest()}
                    />
                    <ConceptActions
                        neutralText="View Skipped concepts"
                        neutralPressed={() => this.handleRevision()}
                    />
                    <ConceptActions
                        neutralText="Back to subjects"
                        neutralPressed={() => this.handleBack()}
                    />
                </View>
            </View>
        );
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


    render(){
        const {conceptReader} = this.props
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
                                    <View style={{flex: 1}}>
                                        { this._renderActions(conceptReader.mode) }
                                    </View>
                                </View>

                            )
                        )
                    }
                    {
                        (conceptReader.currentIndex == conceptReader.list.length 
                            && !conceptReader.isFetching) ? this._renderResult() : (<View></View>)
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
    resultContainer:{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
    },
    resultInfoContainer:{
        flex: 3,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    promoText: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'red',
        padding: 10,
        fontSize: 20
    },
    resultText:{
        fontSize: 25,
        color: 'white'
    },
    resultActions: {
        flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'column'
    }
})


const mapStateToProps = ({conceptReader, result}) => ({
    conceptReader, result
})

const mapDispatchToProps = dispatch => ({

    fetchRevisionConcepts: (subject_key) => {dispatch(fetchRevisionConcepts(subject_key))},
    fetchTestConcepts: (subject_key) => {dispatch(fetchTestConcepts(subject_key))},
    fetchSubjectList: () => {dispatch(fetchSubjectList())},

    setMode: (mode) => {dispatch(setMode(mode))},

    conceptSkip: () => {dispatch(conceptSkip())},
    conceptDone: (concept_key) => {dispatch(conceptDone(concept_key))},
    conceptRight: (concept_key) => {dispatch(conceptRight(concept_key))},
    conceptWrong: (concept_key) => {dispatch(conceptWrong(concept_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)