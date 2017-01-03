import React from 'react';
import {
	View,
	Text,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

class SubjectIndex extends React.Component {
    render() {
        return (
            <ScrollView >
                {
                    this.props.chapters.map(chapter => {
                        return (
                            <View key={chapter.key} style={styles.chapterContainer}>
                                <Text style={styles.chapterName}>
                                    {chapter.name}
                                </Text>
                                <View style={styles.conceptList}>
                                    {
                                        chapter.concepts.map(concept => {
                                            return (
                                                <TouchableHighlight
                                                    onPress={() => this.handleConceptPressed(concept)}
                                                    underlayColor="#f1f1f1"
                                                    style={styles.conceptContainer}
                                                >
                                                    <View style={{
                                                          flexDirection: 'row',
                                                          alignItems: 'center',
                                                          flex: 1
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

                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        );
    }
}


export default SubjectIndex
