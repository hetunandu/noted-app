import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {fetchConceptsFromChapter} from '../actions/concepts';

class ConceptView extends React.Component {
    componentDidMount(){
        // Fetch the concepts
        this.props.fetchConceptsFromChapter(this.props.chapter.key)
    }

    _renderConcepts(){
        return this.props.concepts.data.map( concept => {
            return(
                <Text key={concept.key}>
                    {concept.name}
                </Text>
            );
        }); 
    }

    render(){
        return (
            <View>
                {
                    this.props.concepts.isFetching ? (
                        <Text>Loading...</Text>
                    ) : this._renderConcepts()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    }
})


const mapStateToProps = ({concepts}) => ({
    concepts
})

const mapDispatchToProps = dispatch => ({
    fetchConceptsFromChapter: chapter_key => {dispatch(fetchConceptsFromChapter(chapter_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptView)