import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import ConceptCard from './ConceptCard';
import {fetchConceptsFromChapter, markConceptAction} from '../actions/concepts';

class ConceptView extends React.Component {
    componentDidMount(){
        // Fetch the concepts
        this.props.fetchConceptsFromChapter(this.props.chapter.key)
    }

    handleNextPressed(){
        this.props.markConceptAction('next', this.props.concepts.data[0].key)
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <View style={styles.conceptCardContainer}>
                    {
                        this.props.concepts.isFetching ? (
                            <Text>Loading...</Text>
                        ) 
                        : 
                        (
                            this.props.concepts.data.length > 0 ? 
                            (<ConceptCard 
                                key={this.props.concepts.data[0].key} 
                                concept={this.props.concepts.data[0]}
                            />)
                            :
                            (
                                <Text>Done. Press back to go back to chapter list</Text>
                            )
                        )
                    }
                </View>
                {
                    this.props.concepts.data.length > 0 &&
                    <TouchableHighlight style={styles.nextBtn} onPress={this.handleNextPressed.bind(this)}>
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
    fetchConceptsFromChapter: chapter_key => {dispatch(fetchConceptsFromChapter(chapter_key))},
    markConceptAction: (action, concept_key) => {dispatch(markConceptAction(action, concept_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)