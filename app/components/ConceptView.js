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
import {markConceptDone, skipCurrentConcept} from '../actions/concepts';

class ConceptView extends React.Component {

    handleSkip(){
        this.props.skipCurrentConcept()
    }

    handleDone(){
        const {concepts} = this.props

        this.props.markConceptDone(concepts.data[concepts.currentConcept].key)
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
                                    done={() => this.handleDone()}
                                    skip={() => this.handleSkip()}
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
                                        onPress={() => ToastAndroid.show('yolo', ToastAndroid.SHORT)}
                                    >
                                        <View style={styles.actionBtn}>
                                            <Text style={styles.actionBtnText}>
                                                Quiz concepts done
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight 
                                        style={styles.actionBtnContainer}
                                        onPress={() => ToastAndroid.show('yolo', ToastAndroid.SHORT)}
                                    >
                                        <View style={styles.actionBtn}>
                                            <Text style={styles.actionBtnText}>
                                                View skipped concepts
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight 
                                        style={styles.actionBtnContainer}
                                        onPress={() => Actions.pop()}
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
    skipCurrentConcept: () => {dispatch(skipCurrentConcept())}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)