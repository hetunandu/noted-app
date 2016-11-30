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

import {
    TitleNode,
    TextNode,
    QuoteNode,
    ImageNode,
    PointerNode
} from './ExplanationNodes';

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
                    return <TitleNode key={i} data={node.data} />
                case 'text':
                    return <TextNode key={i} data={node.data} />
                case 'image':
                    return <ImageNode key={i} data={node.data} />
                case 'quote':
                    return <QuoteNode key={i} data={node.data} />
                case 'pointers':
                    return <PointerNode key={i} data={node.data} />
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

    conceptDone(){
        this.props.done()
    }

    conceptSkip(){
        this.props.skip()
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
                    <TouchableHighlight 
                        underlayColor="#f1f1f1"
                        onLongPress={() => this.cardPressed()}
                    >
                        <View style={styles.explanation}>
                            {
                                this._renderExplanation()
                            }
                        </View>
                    </TouchableHighlight>
                    <View style={styles.conceptActions}>
                        <TouchableHighlight 
                            onPress={() => this.conceptSkip()}
                            style={[styles.btn, {backgroundColor: "#E83B40"}]}
                            underlayColor="#d03539"
                        >
                            <Text style={styles.btnText}>Skip</Text>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            onPress={() => this.conceptDone()}
                            style={[styles.btn, {backgroundColor: "#2E7F2E"}]}
                            underlayColor="#297229"
                        >
                            <Text style={styles.btnText}>Done</Text>
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