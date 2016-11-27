import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    StatusBar,
    LayoutAnimation,
    ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import tts from 'react-native-android-speech';
import Loading from './Loading';
import {connect} from 'react-redux';
import ConceptCard from './ConceptCard';
import {markConceptAction} from '../actions/concepts';

class ConceptView extends React.Component {

    handleNextPressed(){
        if(this.props.concepts.data.length === 1){
            ToastAndroid.show('Done with chapter', ToastAndroid.SHORT)
            Actions.pop()
        }
        this.props.markConceptAction('next', this.props.concepts.data[0].key)
    }

    handleVoicePressed(){
        const currentConcept = this.props.concepts.data[0]
        tts.speak({
            text: currentConcept.name, // Mandatory
            pitch: 1, // Optional Parameter to set the pitch of Speech,
            forceStop : false , //  Optional Parameter if true , it will stop TTS if it is already in process
            language : 'en', // Optional Paramenter Default is en you can provide any supported lang by TTS
        }).then(isSpeaking=>{
            //Success Callback
            console.log(isSpeaking);
        }).catch(error=>{
            //Errror Callback
            console.log(error)
        });
    }

    render(){

        const currentConcept = this.props.concepts.data[0]

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
                                />
                            )
                        )
                    }
                </View>
                {
                    <View style={styles.toolbar}>
                        <TouchableHighlight
                            style={styles.toolbarBtn}
                            onPress={() => {
                                ToastAndroid.show('Not implemented, yet', ToastAndroid.SHORT)}
                            }
                        >
                            <Text style={{color: 'white', fontSize: 20}}>Previous</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.toolbarBtn}
                            onPress={this.handleVoicePressed.bind(this)}
                        >
                            <Text style={{color: 'white', fontSize: 20}}>Voice</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.toolbarBtn}
                            onPress={this.handleNextPressed.bind(this)}
                        >
                            <Text style={{color: 'white', fontSize: 20}}>Next</Text>
                        </TouchableHighlight>
                    </View>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conceptCardContainer: {
        flex: 1,
        position: 'relative',
        marginBottom: 75
    },
    toolbar: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 75,
        backgroundColor: '#333',
        justifyContent: 'space-around',
        alignItems: 'stretch'
    },
    toolbarBtn:{
        flex: 1,
        borderRightColor: "#555",
        borderRightWidth: 1,
        borderLeftColor: "#555",
        borderLeftWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


const mapStateToProps = ({concepts}) => ({
    concepts
})

const mapDispatchToProps = dispatch => ({
    markConceptAction: (action, concept_key) => {dispatch(markConceptAction(action, concept_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)