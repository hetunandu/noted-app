import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	ScrollView,
    TouchableHighlight
} from 'react-native';
import { fetchSubjectIndex } from '../actions/subjects';
import {
    fetchRevisionConcepts,
    fetchTestConcepts,
    setMode
} from '../actions/concepts';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Loading from './Loading';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class SubjectDetail extends Component{

    constructor(props) {
        super(props);

        this.state = {time_left: "Calculating..."};

    }

    componentDidMount(){
    
        this.setInterval(this.countdown, 1000)
    }



    revisePressed(){
        this.props.fetchRevisionConcepts(this.props.activeSubject.data.key)
        this.props.setMode("study")
        Actions.conceptReader()
    }

    testPressed(){
        this.props.fetchTestConcepts(this.props.activeSubject.data.key)
        this.props.setMode("question")
        Actions.conceptReader()
    }

    indexPressed(){
        this.props.fetchSubjectIndex(this.props.activeSubject.data.key)
        Actions.subjectIndex()
    }

    calcProgress(){
        total = this.props.activeSubject.data.total_concepts
        read = this.props.activeSubject.data.read_concepts

         return Math.round(read / total * 100)
    }

    countdown(){
        const {activeSubject} = this.props


        var date = new Date(activeSubject.data.session_ends)
        var ist_date = new Date(date.valueOf() + date.getTimezoneOffset());
        var time_left = ist_date - new Date()

            if (time_left < 0){
                this.clearInterval()
                this.setState({
                    time_left: -1
                })

            }else{
                var _second = 1000;
                var _minute = _second * 60;
                var _hour = _minute * 60;
                var _day = _hour * 24;

                var hours = Math.floor((time_left % _day) / _hour);
                var minutes = Math.floor((time_left % _hour) / _minute);
                var seconds = Math.floor((time_left % _minute) / _second);


                this.setState({
                    time_left: `${hours}h ${minutes}m ${seconds}s`
                })
            }
    }

    render(){
        const {activeSubject} = this.props
        subject = activeSubject

        return(
            <View style={{flex: 1, marginTop: 60}}>
                {
                    subject.isFetching ? <Loading /> : (
                        <View >
                            <View style={styles.statusContainer}>     
                                <Text style={styles.statusText}>
                                    Points: {this.props.user.data.points}
                                </Text>             
                                <Text style={styles.statusText}>
                                    Progress: {this.calcProgress()} % 
                                </Text>
                                <Text style={styles.statusText}> 
                                    Views: {subject.data.views_available} available 
                                </Text>
                            </View>
                            {
                                subject.data.views_available > 0 ? (
                                    <View >
                                        <TouchableHighlight style={styles.subjectActionContainer}
                                            onPress={() => this.revisePressed()}
                                            underlayColor="#f3f3f3"
                                        >
                                            <View style={styles.subjectAction}>                    
                                                <Text style={styles.subjectActionText}>Revise</Text>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight style={styles.subjectActionContainer}
                                            onPress={() => this.testPressed()}
                                            underlayColor="#f3f3f3"
                                        >
                                            <View style={styles.subjectAction}>
                                                <Text style={styles.subjectActionText}>Test</Text>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight style={styles.subjectActionContainer}
                                            onPress={() => this.indexPressed()}
                                            underlayColor="#f3f3f3"
                                        >
                                            <View style={styles.subjectAction}>
                                                <Text style={styles.subjectActionText}>Index</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>

                                ) : (
                                    <View style={styles.cooldownContainer}>
                                        <Text style={{fontSize: 28, color: 'white'}}>
                                            Cooldown
                                        </Text>
                                        <Text>
                                            More views in : {this.state.time_left}
                                        </Text>
                                    </View>
                                )
                            }
                        </View>

                    )
                }               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statusContainer: {
        padding: 10,
        flexDirection: 'column'
    },
    statusText: {
        fontSize: 20
    }, 
    subjectAction: {
        padding: 20,
        backgroundColor: 'white'
    },
    subjectActionText:{
        fontSize: 23,
        fontWeight: 'bold'
    },
    cooldownContainer: {
        padding: 10,
        backgroundColor: 'red',
        alignItems: 'center'
    }
})

// Add react timer mixin to the subject class
reactMixin(SubjectDetail.prototype, TimerMixin)

const mapStateToProps = ({activeSubject, user}) => ({
    activeSubject,
    user
})

const mapDispatchToProps = dispatch => ({
    fetchRevisionConcepts: (subject_key) => {dispatch(fetchRevisionConcepts(subject_key))},
    fetchTestConcepts: (subject_key) => {dispatch(fetchTestConcepts(subject_key))},
    fetchSubjectIndex: (subject_key) => {dispatch(fetchSubjectIndex(subject_key))},
    setMode: (mode) => {dispatch(setMode(mode))}
})

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDetail)