import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Animated
} from 'react-native';


class ConceptCard extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            translateX: new Animated.Value(-600),
            translateY: new Animated.Value(0)
        };
    }


    componentDidMount() {

        Animated.spring(
          this.state.translateX,
          {
            toValue: 0,
            friction: 7
          }
        ).start();
    }

    componentWillUpdate(){
        Animated.spring(
          this.state.translateY,
          {
            toValue: -600,
            friction: 7
          }
        ).start();    
    }

    _renderExplanation(){
        return this.props.concept.explanation.map( (node, i) => {
            switch(node.type){
                case 'title':
                    return <Text key={i} style={styles.title}>{node.data}</Text>
                case 'text':
                    return <Text key={i} style={styles.text}> {node.data} </Text>
                case 'image':
                    return (
                                <Image
                                    style={{minHeight: 300, backgroundColor: "#f2f2f2"}}
                                    resizeMode="contain"
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
                            return (
                                <View>
                                    <Text 
                                        key={`point_${j}`}
                                        style={styles.pointer}
                                    >
                                        {j + 1}. {point.title}
                                    </Text>
                                    <View style={styles.pointNodes}>
                                    {
                                        point.nodes.map((node, k) => {
                                            switch(node.type){
                                                case 'text':
                                                    return (
                                                        <Text 
                                                            key={k} 
                                                            style={styles.text}
                                                        > 
                                                            {node.data} 
                                                        </Text>
                                                    )
                                                case 'image':
                                                    return (
                                                        <Image
                                                            style={styles.image}
                                                            key={k}
                                                            source={{uri: `${node.data}`}}
                                                        />
                                                    )
                                                default: 
                                            }
                                        })
                                    }
                                    </View>

                                </View>
                            )
                        })
                default:
                    return <Text key={i}>{node.type}</Text>
            }
        });
    }

    render(){
        return(
            <Animated.View 
                style={[
                    styles.card,
                    {
                        transform: [
                            {translateX: this.state.translateX},
                            {translateY: this.state.translateY}
                        ]
                    }
                ]}
            >
                <ScrollView scrollEnabled={true} style={{flex: 1}}>
                    {
                        this._renderExplanation()
                    }
                </ScrollView>
            </Animated.View>
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
        fontWeight: "100"
    },
    text: {
        fontSize: 18,
    },
    quote: {
        paddingLeft: 20,
        fontSize: 20,
        borderLeftWidth: 5,
        borderLeftColor: "#50537f",
        fontStyle: 'italic'
    },
    pointer: {
        fontSize: 18,
        fontWeight: "600"
    },
    pointNodes: {
        paddingLeft: 20
    }
})

export default ConceptCard