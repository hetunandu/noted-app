import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Animated,
    TouchableHighlight
} from 'react-native';


class ConceptCard extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            translateY: new Animated.Value(1200),
            scale: new Animated.Value(1)
        };
    }


    componentDidMount() {
        Animated.spring(
          this.state.translateY,
          {
            toValue: 0,
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
                                    style={{minHeight: 200, backgroundColor: "#f2f2f2"}}
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
                                                            style={{minHeight: 200, backgroundColor: "#f2f2f2"}}
                                                            resizeMode="contain"
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

    cardPressed(){
        if(this.state.scale._value === 1){
            Animated.spring(
              this.state.scale,
              {
                toValue: 0.7,
                friction: 6
              }
            ).start();    
        }else{
            Animated.spring(
              this.state.scale,
              {
                toValue: 1,
                friction: 7
              }
            ).start(); 
        }
    }

    conceptUnderstood(){
        this.props.understood()
    }

    conceptNotUnderstood(){

    }

    render(){
        return(
            <Animated.View 
                style={[
                    styles.card,
                    {
                        transform: [
                            {translateY: this.state.translateY},
                            {scale: this.state.scale}
                        ]
                    }
                ]}
            >
                <ScrollView scrollEnabled={true} style={{flex: 1}}>
                    <View style={styles.explanation}>
                        {
                            this._renderExplanation()
                        }
                    </View>
                    <View style={styles.conceptActions}>
                        <TouchableHighlight 
                            onPress={() => this.conceptNotUnderstood()}
                            style={[styles.btn, {backgroundColor: "#E83B40"}]}
                            underlayColor="#d03539"
                        >
                            <Text style={styles.btnText}>Did not understand</Text>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            onPress={() => this.conceptUnderstood()}
                            style={[styles.btn, {backgroundColor: "#2E7F2E"}]}
                            underlayColor="#297229"
                        >
                            <Text style={styles.btnText}>
                                { this.props.concept.isUnderstanding ? '....' : 'Understood'}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 5,
        borderRadius: 3
    },
    explanation:{
        padding: 10,
        flex: 1
    },
    title: {
        fontSize: 30,
        color: '#000',
        fontWeight: "200"
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
    },
    conceptActions:{
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    btn:{
        padding: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    btnText:{
        textAlign: 'center',
        color: 'white',
        fontSize: 22
    }
})

export default ConceptCard