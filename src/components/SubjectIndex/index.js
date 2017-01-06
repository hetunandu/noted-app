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
                                            return this.renderConceptListItem(concept)
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

    handleConceptPressed(concept){
      this.props.onConceptSelected(concept)
    }

    renderConceptListItem(concept){
      return (

        <TouchableHighlight
            key={concept.key}
            onPress={() => this.handleConceptPressed(concept)}
            underlayColor="#f1f1f1"
            style={styles.conceptContainer}
        >
            <View>
                <Text style={styles.conceptName}>
                    {concept.name}
                </Text>
                <View flexDirection="row" alignItems="center" justifyContent="space-between">
                  { 
                    concept.important ? (
                      <Icon
                          name="star"
                          size={25}
                          color="gold" />
                    ) : (

                      <Icon
                          name="star-border"
                          size={25}
                          color="#333" />

                    )
                  }
                  {
                      concept.read ? (
                          <View flexDirection="row">
                            <Text style={{fontSize: 20}}>{concept.read}</Text>
                            <Icon 
                              name="done" 
                              size={25} 
                              color="green" 
                            />
                          </View>
                      ) : (

                          <Icon
                              name="fiber-manual-record"
                              size={20}
                              color="gray" />

                      )
                  }
                </View>
              </View>
        </TouchableHighlight>

      )
    }
}


export default SubjectIndex
