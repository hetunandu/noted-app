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
import ConceptActions from './ConceptActions';

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
            case 'exp':
                return (
                    <Explanation 
                        data={this.props.concept.explanation}
                        actions={
                            <ConceptActions 
                                successText="Done"
                                successPressed={() => this.props.done()}
                                failText="Skip"
                                failPressed={() => this.props.skip()}
                            />
                        }
                    />
                )
            case 'quiz':
                return (
                    <Question
                        name={this.props.concept.name}
                        question={this.props.concept.questions[0]}
                        actions={
                            <ConceptActions
                                neutralText="See Answer"
                                neutralPressed={() => this.props.answer()}
                            />
                        }
                    />
                );
            case 'ref':
                return this._renderReferences()
            case 'ans':
                return (
                    <Explanation 
                        data={this.props.concept.explanation}
                        actions={
                            <ConceptActions 
                                successText="I was right"
                                successPressed={() => this.props.result('correct')}
                                failText="I was wrong"
                                failPressed={() => this.props.result('wrong')}
                            />
                        }
                    />
                )
            default:
                return <View></View>
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
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 5,
        borderRadius: 3
    }

})

export default ConceptCard