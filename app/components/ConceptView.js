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
import {markConceptUnderstood} from '../actions/concepts';

class ConceptView extends React.Component {

    handleNextPressed(){

        const {concepts} = this.props

        if(concepts.data.length === 1){
            ToastAndroid.show('Done with today', ToastAndroid.SHORT)
            Actions.pop()
        }
        this.props.markConceptUnderstood(concepts.data[concepts.currentConcept].key)
    }

    handleVoicePressed(){
        const {concepts} = this.props
        const currentConcept = concepts.data[concepts.currentConcept]
        tts.speak({
            text: currentConcept.name,
            forceStop : false,
            language : 'en',
        }).then(isSpeaking=>{
            //Success Callback
            console.log(isSpeaking);
        }).catch(error=>{
            //Errror Callback
            console.log(error)
        });
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
                                    understood={() => this.handleNextPressed()}
                                />
                            )
                        )
                    }
                    <View style={styles.toolbar}>
                        <Text>Upgrade to pro for tools</Text>
                    </View>
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
    toolbar:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1'
    }
})


const mapStateToProps = ({concepts}) => ({
    concepts
})

const mapDispatchToProps = dispatch => ({
    markConceptUnderstood: (concept_key) => {dispatch(markConceptUnderstood(concept_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)