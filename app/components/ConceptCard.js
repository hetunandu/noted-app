import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Animated,
    Easing,
    TouchableHighlight
} from 'react-native';
import Explanation from './Explanation';
import Question from './Question';

class ConceptCard extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            scale: new Animated.Value(0)
        };
    }


    componentDidMount() {
        this.state.scale.setValue(0.1)
        Animated.spring(
          this.state.scale,
          {
            toValue: 1,
            friction: 7
          }
        ).start();
    }

    _renderCard(){
        switch(this.props.mode){
            case 'study':
                return (
                    <Explanation data={this.props.concept.explanation} />
                )
            case 'question':
                return (
                    <Question
                        name={this.props.concept.name}
                        question={this.props.concept.questions[0]}
                    />
                );
            case 'reference':
                return <Text>Render references here</Text>
            case 'answer':
                return (
                    <Explanation data={this.props.concept.explanation} />
                )
            default:
                return <Text>Unkown mode</Text>
        }
    }

    render(){

        return(
            <Animated.View 
                style={[
                    styles.card,
                    {
                        transform: [
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
        margin: 10,
        flex: 7,
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 3
    }

})

export default ConceptCard