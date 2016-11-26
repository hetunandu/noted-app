import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    StatusBar,
    LayoutAnimation
} from 'react-native';
import Loading from './Loading';
import {connect} from 'react-redux';
import ConceptCard from './ConceptCard';
import {markConceptAction} from '../actions/concepts';

class ConceptView extends React.Component {

    handleNextPressed(){
        this.props.markConceptAction('next', this.props.concepts.data[0].key)
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
                            currentConcept ? 
                            (<ConceptCard 
                                key={currentConcept.key} 
                                concept={currentConcept}
                            />)
                            :
                            (
                                <Text>Done. Press back to go back to chapter list</Text>
                            )
                        )
                    }
                </View>
                {
                    currentConcept &&
                    <TouchableHighlight 
                        style={styles.nextBtn} 
                        onPress={this.handleNextPressed.bind(this)}
                    >
                        <Text style={{color: 'white', fontSize: 20}}>Next</Text>
                    </TouchableHighlight>
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
    nextBtn: {
        position: 'absolute',
        bottom: -15,
        right: -15,
        left: -15,
        height: 75,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center'
    }
})


const mapStateToProps = ({concepts}) => ({
    concepts
})

const mapDispatchToProps = dispatch => ({
    markConceptAction: (action, concept_key) => {dispatch(markConceptAction(action, concept_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)