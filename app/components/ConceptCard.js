import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';

class ConceptCard extends Component {

    _renderExplanation(){
        return this.props.concept.explanation.map( (node, i) => {
            switch(node.type){
                case 'title':
                    return <Text key={i} style={styles.title}>{node.data}</Text>
                case 'text':
                    return <Text key={i} style={styles.text}>{node.data}</Text>
                case 'image':
                    return (
                                <Image
                                    style={styles.image}
                                    key={i}
                                    source={{uri: `${node.data}`}}
                                />
                            )
                case 'quote':
                    return (
                                <Text
                                    key={i}
                                    style={styles.quote}
                                >
                                    {node.data}
                                </Text>
                            )
                case 'pointers':
                    return node.data.map((point, j) => {
                            return (<Text 
                                        key={`point_${j}`}
                                        style={styles.pointer}
                                    >
                                        {j + 1}. {point.title}
                                    </Text>)
                        })
                default:
                    return <Text key={i}>{node.type}</Text>
            }
        });
    }

    render(){
        return(
            <View style={styles.card}>
                <ScrollView scrollEnabled={true}>
                    {
                        this._renderExplanation()
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 3,
        padding: 5,
        elevation: 5
    },
    title: {
        fontSize: 30,
        color: '#000',
        fontWeight: '400'
    },
    text: {
        fontSize: 18,
        marginBottom: 5
    },
    quote: {
        fontSize: 20,
        textAlign: 'center',
        color: '#50537f',
        fontStyle: 'italic'
    },
    pointer: {
        fontSize: 23
    },
    image: {
        flex: 1,
        minHeight: 200,
    }
})

export default ConceptCard