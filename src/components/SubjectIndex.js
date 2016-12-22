import React from 'react';
import {
	View,
	Text,
    ScrollView,
	StyleSheet,
    TouchableHighlight
} from 'react-native';
import Navbar from './Navbar';
import Loading from './Loading';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {    
    fetchSingleConcept,
    setMode
} from '../actions/concepts';


class SubjectIndex extends React.Component {

    viewConcept(concept){
        this.props.fetchSingleConcept(concept.key)
        this.props.setMode("study")
        Actions.conceptReader()
    }

    render() {
        const {index} = this.props

        return (
        	<View style={{flex: 1}}>
                <Navbar title="Index"/>
                {
                    index.isFetching ? <Loading /> : (
                        <ScrollView style={{flex: 1}}>
                            {
                                index.chapters.map(chapter => (
                                    <View key={chapter.key} style={styles.chapterContainer}>
                                        <Text style={styles.chapterName}>{chapter.name}</Text>
                                        <View style={styles.conceptList}>
                                            {
                                                chapter.concepts.map(concept => (
                                                    <TouchableHighlight 
                                                        key={concept.key}
                                                        underlayColor="#f1f1f1"
                                                        style={styles.conceptContainer}
                                                        onPress={this.viewConcept.bind(this, concept)}
                                                    >
                                                        <View>
                                                            <Text style={styles.conceptName}>
                                                                {concept.name}
                                                            </Text>
                                                        </View>
                                                    </TouchableHighlight>

                                                    ))
                                            }
                                        </View>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    )
                }
        	</View>
        );
    }
}

const styles = StyleSheet.create({
    chapterContainer: {
        padding: 5
    },
    chapterName: {
        fontSize: 23,
        marginBottom: 5
    },
    conceptList: {
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 2
    },
    conceptContainer:{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#999"
    },
    conceptName: {
        fontSize: 20
    }
})


const state = ({index}) => ({
    index
})

const actions = dispatch => ({
    fetchSingleConcept: (concept_key) => {dispatch(fetchSingleConcept(concept_key))},
    setMode: (mode) => {dispatch(setMode(mode))}
})

export default connect(state, actions)(SubjectIndex);
