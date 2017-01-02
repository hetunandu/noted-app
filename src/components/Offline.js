import React from 'react';
import {
	View,
	Text,
    ScrollView,
	StyleSheet,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import Navbar from './Navbar';
import {Actions} from 'react-native-router-flux';
import {    
    fetchSingleConcept,
    setMode
} from '../actions/concepts';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Offline extends React.Component {


    constructor(props) {
      super(props);
    
      this.state = {
        index: "Loading"
      };
    }

    componentDidMount(){

        AsyncStorage.getItem('index')
            .then((index) => {
                this.setState({
                    index: index
                })
            })

        console.error(this.state.index)
    }

    viewConcept(concept){
        //this.props.fetchSingleConcept(concept.key)
        Actions.conceptReader({
            subject: this.props.subject,
            mode: 'revise'
        })
    }

    render() {
        const {index} = this.state

        return (
        	<View style={{flex: 1}}>
                <Navbar title="Offline"/>
                {
                    // <ScrollView style={{flex: 1}}>
                    //     {
                    //         index.chapters.map(chapter => (
                    //             <View key={chapter.key} style={styles.chapterContainer}>
                    //                 <Text style={styles.chapterName}>{chapter.name}</Text>
                    //                 <View style={styles.conceptList}>
                    //                     {
                    //                     chapter.concepts.map(concept => (
                    //                         <TouchableHighlight 
                    //                             key={concept.key}
                    //                             underlayColor="#f1f1f1"
                    //                             style={styles.conceptContainer}
                    //                             onPress={this.viewConcept.bind(this, concept)}
                    //                         >
                    //                             <View style={{
                    //                                 flexDirection: 'row',
                    //                                 alignItems: 'center'
                    //                             }}>
                    //                                 {
                    //                                     concept.read ? (

                    //                                         <Icon 
                    //                                             name="done" 
                    //                                             size={25} 
                    //                                             color="green" />
                    //                                     ) : (

                    //                                         <Icon
                    //                                             name="fiber-manual-record"
                    //                                             size={20}
                    //                                             color="gray" />

                    //                                     )
                    //                                 }
                    //                                 <Text style={styles.conceptName}>
                    //                                     {concept.name}
                    //                                 </Text>
                    //                             </View>
                    //                         </TouchableHighlight>

                    //                         ))
                    //                     }
                    //                 </View>
                    //             </View>
                    //         ))
                    //     }
                    // </ScrollView>
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
    },
    offlineBanner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: '#50537f'
    }
})


export default Offline;
