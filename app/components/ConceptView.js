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
import tts from 'react-native-android-speech';
import Loading from './Loading';
import {connect} from 'react-redux';
import ConceptCard from './ConceptCard';
import {fetchSubjectList } from '../actions/subjects';
import {
    markConceptDone,
    skipCurrentConcept,
    fetchRevisionConcepts,
    fetchTestConcepts,
    changeMode
} from '../actions/concepts';

class ConceptView extends React.Component {

    handleSkip(){
        this.props.skipCurrentConcept()
    }

    handleDone(){
        const {concepts} = this.props

        this.props.markConceptDone(concepts.data[concepts.currentConcept].key)
    }

    handleTest(){
        this.props.fetchTestConcepts(this.props.subject.key)
    }

    handleRevision(){
        this.props.fetchRevisionConcepts(this.props.subject.key)
    }

    handleBack(){
        this.props.fetchSubjectList()
        Actions.pop()
    }

    handleSeeAnswer(){
        this.props.changeMode("ans")
    }

    handleResult(result){
        this.props.changeMode("quiz")
        this.handleSkip()
    }

    render(){
        const {concepts} = this.props
        const currentConcept = concepts.data[concepts.currentConcept]
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    hidden={true}
                    animated={true}
                />
                <View style={styles.conceptCardContainer}>
                    {
                        this.props.concepts.isFetching ? (
                            <Loading />
                        ) 
                        : 
                        (
                            currentConcept && (
                                <ConceptCard 
                                    key={currentConcept.key} 
                                    concept={currentConcept}
                                    mode={concepts.mode}
                                    done={() => this.handleDone()}
                                    skip={() => this.handleSkip()}
                                    answer={() => this.handleSeeAnswer()}
                                    result={(result) => this.handleResult(result)}
                                />
                            )
                        )
                    }
                    {
                        (concepts.currentConcept == concepts.data.length 
                            && !concepts.isFetching) ? (
                            <View style={styles.allDoneContainer}>
                                <Text style={styles.promoText}>
                                    Buy pro to get all concepts at once
                                </Text>
                                <View style={styles.doneInfoContainer}>
                                    <Text style={styles.doneText}>
                                            End of today's cards!
                                    </Text>
                                </View>
                                <View style={styles.doneActions}>
                                    <TouchableHighlight 
                                        style={styles.actionBtnContainer}
                                        onPress={() => this.handleTest()}
                                    >
                                        <View style={styles.actionBtn}>
                                            <Text style={styles.actionBtnText}>
                                                Test concepts done
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight 
                                        style={styles.actionBtnContainer}
                                        onPress={() => this.handleRevision()}
                                    >
                                        <View style={styles.actionBtn}>
                                            <Text style={styles.actionBtnText}>
                                                View skipped concepts
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight 
                                        style={styles.actionBtnContainer}
                                        onPress={() => this.handleBack()}
                                    >
                                        <View style={styles.actionBtn}>
                                            <Text style={styles.actionBtnText}>
                                                Back to subjects
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        ) : (
                            <View></View>
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
    allDoneContainer:{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
    },
    doneInfoContainer:{
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
    doneText:{
        fontSize: 25,
        color: 'white'
    },
    doneActions: {
        justifyContent: 'space-between',
    },
    actionBtnContainer:{
    },
    actionBtn:{
        flexDirection: 'row',
        padding: 20,
        backgroundColor: "#333",
        borderBottomWidth: 1,
        borderBottomColor: '#555'
    },
    actionBtnText: {
        color: 'white',
        fontSize: 20
    }
})


const mapStateToProps = ({concepts}) => ({
    concepts
})

const mapDispatchToProps = dispatch => ({
    markConceptDone: (concept_key) => {dispatch(markConceptDone(concept_key))},
    skipCurrentConcept: () => {dispatch(skipCurrentConcept())},
    fetchRevisionConcepts: (subject_key) => {dispatch(fetchRevisionConcepts(subject_key))},
    fetchTestConcepts: (subject_key) => {dispatch(fetchTestConcepts(subject_key))},
    fetchSubjectList: () => {dispatch(fetchSubjectList())},
    changeMode: (mode) => {dispatch(changeMode(mode))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)