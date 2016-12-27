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
import Icon from 'react-native-vector-icons/MaterialIcons';


class SubjectIndex extends React.Component {

    viewConcept(concept){
        this.props.fetchSingleConcept(concept.key)
        Actions.conceptReader({
            subject: this.props.subject,
            mode: 'revise'
        })
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
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                            {
                                                                concept.read ? (

                                                                    <Icon 
                                                                        name="done" 
                                                                        size={25} 
                                                                        color="green" />
                                                                ) : (

                                                                    <Icon
                                                                        name="fiber-manual-record"
                                                                        size={20}
                                                                        color="gray" />

                                                                )
                                                            }
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
        padding: 5,
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
