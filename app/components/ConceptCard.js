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

    _renderCard(){
        switch(this.props.mode){
            case 'exp':
                return this._renderExplanation()
            case 'quiz':
                return this._renderQuestion()
            case 'ref':
                return this._renderReferences()
            case 'ans':
                return this._renderExplanation()
            default:
                return this._renderExplanation()
        }
    }

    _renderActions(){
        switch(this.props.mode){
            case 'exp':
                return this._renderExplanationActions()
            case 'quiz':
                return this._renderQuestionActions()
            case 'ans':
                return this._renderAnswerActions()
            default:
                return null
        }
    }

    _renderNodes(node, i){
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
    }

    _renderExplanation(){
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1, marginBottom: 70}}>
                    <View style={styles.explanation}>
                        {
                            this.props.concept.explanation.map((node, i) => this._renderNodes(node, i))
                        }
                    </View>
                </ScrollView>
                {
                    this._renderActions()
                }
            </View>
        )
    }

    _renderExplanationActions(){
        return(
            <View style={styles.cardActions}>
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
        )
    }

    _renderAnswerActions(){
        return(
            <View style={styles.cardActions}>
                <TouchableHighlight 
                    onPress={() => this.questionResult("wrong")}
                    style={[styles.btn, {backgroundColor: "#E83B40"}]}
                    underlayColor="#d03539"
                >
                    <Text style={styles.btnText}>I was wrong</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress={() => this.questionResult("right")}
                    style={[styles.btn, {backgroundColor: "#2E7F2E"}]}
                    underlayColor="#297229"
                >
                    <Text style={styles.btnText}>I was right</Text>
                </TouchableHighlight>
            </View>
        )
    }

    _renderQuestion(){
        return (
            <View style={styles.question}>
                <Text style={styles.conceptName}>{this.props.concept.name}</Text>
                <Text style={styles.questionText}>Q. {this.props.concept.questions[0]}</Text>
                {this._renderActions()}
            </View>
        )
    }

    _renderQuestionActions(){
        return(
            <View style={styles.cardActions}>
                <TouchableHighlight
                    onPress={() => this.seeAnswer()}
                    style={[styles.btn, {backgroundColor: "#333"}]}
                >
                    <Text style={styles.btnText}>See Answer</Text>
                </TouchableHighlight>
            </View>
        )
    }

    _renderReferences(){
        return <View></View>
    }

    conceptDone(){
        this.props.done()
    }

    conceptSkip(){
        this.props.skip()
    }

    seeAnswer(){
        this.props.answer()
    }

    questionResult(result){
        this.props.result(result)
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
                {
                    this._renderCard()
                }
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
    cardActions: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    explanation:{
        padding: 10,
        flex: 1,
    },
    question:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    conceptName: {
        textAlign: 'center',
        fontSize: 18,
        color: "#999",
        marginBottom: 20
    },
    questionText:{
        fontSize: 23,
        textAlign: 'center'
    },
    btn:{
        padding: 20,
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