import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	ScrollView,
    TouchableHighlight,
    Image
} from 'react-native';
import { fetchSubjectIndex, fetchSubjectList, skipSubjectCooldown } from '../actions/subjects';
import {
    fetchRevisionConcepts,
    fetchTestConcepts,
    setMode
} from '../actions/concepts';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Loading from './Loading';
import reactMixin from 'react-mixin';
import Icon from 'react-native-vector-icons/MaterialIcons'
import TimerMixin from 'react-timer-mixin';

class SubjectCard extends Component{

    constructor(props) {
        super(props);

        this.state = {
        	"time_left": "Calculating"
        };

    }

    componentDidMount(){
        this.setInterval(this.countdown, 1000)
    }

    skipCooldown(){
    	this.props.skipSubjectCooldown(this.props.subject.key)
    	this.props.fetchSubjectList()
    }


    revisePressed(){
        this.props.fetchRevisionConcepts(this.props.subject.key)
        Actions.conceptReader({
            subject: this.props.subject,
            mode: 'revise'
        })
    }

    testPressed(){
        this.props.fetchTestConcepts(this.props.subject.key)
        Actions.conceptReader({
            subject: this.props.subject,
            mode: 'test'
        })
    }

    indexPressed(){
        this.props.fetchSubjectIndex(this.props.subject.key)
        Actions.subjectIndex({subject: this.props.subject})
    }

    calcProgress(){
        total = this.props.subject.total_concepts
        read = this.props.subject.read_concepts

         return Math.round(read / total * 100)
    }

    countdown(){
        const {subject} = this.props


        var date = new Date(subject.session_ends)
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
        const {subject} = this.props

        return(
            <View style={styles.subjectCard}>
            	<View style={styles.subjectDetails}>
            		<View>
		            	<Text style={styles.subjectName}>
		                	{this.props.subject.name}
		                </Text>
		                <Text style={styles.viewsText}> 
		                	{this.props.subject.views_available} views available
		                </Text>
	                </View>
	                <View>
	                	<Text style={styles.progress}>{this.calcProgress()}%</Text>
	                </View>
            	</View>
	            {
	                subject.views_available > 0 ? (
	                    <View >
	                        <TouchableHighlight style={styles.subjectActionContainer}
	                            onPress={() => this.revisePressed()}
	                            underlayColor="#f3f3f3"
	                        >
	                            <View style={styles.subjectAction}>                    
	                            	<View>
	                                	<Text style={styles.subjectActionText}>Revise</Text>
	                                	<Text style={styles.viewsText}>Cost: 5 views</Text>
	                                </View>
	                                <Icon name="chevron-right" size={30} color="#333" />
	                            </View>

	                        </TouchableHighlight>
                            <TouchableHighlight style={styles.subjectActionContainer}
                                onPress={() => this.testPressed()}
                                underlayColor="#f3f3f3"
                            >
                                <View style={styles.subjectAction}>
                                    <View>
                                        <Text style={styles.subjectActionText}>Test</Text>
                                        <Text style={styles.viewsText}>Cost: 5 views</Text>
                                    </View>
                                    <Icon name="chevron-right" size={30} color="#333" />
                                </View>
                            </TouchableHighlight>
	                        <TouchableHighlight style={styles.subjectActionContainer}
	                            onPress={() => this.indexPressed()}
	                            underlayColor="#f3f3f3"
	                        >
	                            <View style={styles.subjectAction}>
	                            	<View>
	                                	<Text style={styles.subjectActionText}>Index</Text>
	                                	<Text style={styles.viewsText}>Cost: 1 view per concept</Text>
	                                </View>
	                                <Icon name="chevron-right" size={30} color="#333" />
	                            </View>
	                        </TouchableHighlight>
	                    </View>

	                ) : (
	                    <View style={styles.cooldownContainer}>
	                        <Text style={{
	                        	fontSize: 25,
	                        	textAlign:'center',
	                        	fontWeight: 'bold',
	                        	color: 'red',
	                        	}}
	                        >
	                            Cooldown
	                        </Text>
	                        <Text style={{
	                        	fontSize: 20,
	                        	textAlign:'center',
	                        	marginBottom: 10
	                       		}}
	                       	>
	                            More views in : {this.state.time_left}
	                        </Text>
	                        <TouchableHighlight 
	                        	onPress={() => this.skipCooldown()}
	                        >
		                        <View style={styles.skipAction}>
		                        	<Text 
		                        		style={{
		                        			fontSize: 25,
		                        			color: 'white',
		                        			marginRight: 5
		                        		}}
		                        	>Skip for </Text>
		                        		
	                        		<View 
	                        			style={{
	                        				flexDirection: 'row',
	                        				alignItems: 'center'
	                        			}}
	                        		>
			                        	<Image 
											source={require('../images/icon.png')}
											style={{width: 20, height: 20, borderRadius: 50}} 
										/>
			                        	<Text 
			                        		style={{
			                        			fontSize: 30,
			                        			marginLeft: 5,
			                        			fontWeight: 'bold',
			                        			color: 'white'
			                        		}}
			                        	>
			                        		25
			                        	</Text>
		                        	</View>
		                        </View>
							</TouchableHighlight>
	                    </View>
	                )
	            }
	        </View>
        )
    }
}

const styles = StyleSheet.create({
    subjectCard:{
    	backgroundColor: 'white',
    	elevation: 2,
    	margin: 10,
    	borderRadius: 2
    },
    subjectDetails:{
    	padding: 5,
    	borderBottomWidth: 1,
    	borderBottomColor: '#333',
    	flexDirection: 'row',
    	justifyContent:'space-between'
    },
    progress: {
    	fontSize: 30,
    	color: 'green'
    },
    subjectName:{
    	fontSize: 25,
    	fontWeight: 'bold'
    },	
    viewsText: {
        fontSize: 15,
        color: '#999'
    }, 
    subjectAction: {
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#888',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subjectActionText:{
        fontSize: 23,
    },
    cooldownContainer: {
        backgroundColor: 'white',
        borderRadius: 5
    },
    skipAction:{
    	backgroundColor: '#50537f',
    	flex: 1,
    	padding: 5,
    	justifyContent: 'center',
    	alignItems: 'center',
    	flexDirection: 'row'
    }
})

// Add react timer mixin to the subject class
reactMixin(SubjectCard.prototype, TimerMixin)

const mapDispatchToProps = dispatch => ({
	fetchSubjectList: () => {dispatch(fetchSubjectList())},
    fetchRevisionConcepts: (subject_key) => {dispatch(fetchRevisionConcepts(subject_key))},
    fetchTestConcepts: (subject_key) => {dispatch(fetchTestConcepts(subject_key))},
    fetchSubjectIndex: (subject_key) => {dispatch(fetchSubjectIndex(subject_key))},
    skipSubjectCooldown: (subject_key) => {dispatch(skipSubjectCooldown(subject_key))},
    setMode: (mode) => {dispatch(setMode(mode))}
})

export default connect(null, mapDispatchToProps)(SubjectCard)