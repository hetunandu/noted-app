import React, {Component} from 'react';
import {
	View, 
	Text,
	ScrollView,
    TouchableHighlight,
    Image,
    ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import reactMixin from 'react-mixin';
import Icon from 'react-native-vector-icons/MaterialIcons'
import TimerMixin from 'react-timer-mixin';
import styles from './styles';
import { PointsDisplay } from '../../components';
import PushNotification from 'react-native-push-notification';


class SubjectCard extends Component{

    constructor(props) {
      super(props);
    
      this.state = {
        time_left: "calculating...."
      };
    }

    componentDidMount(){
        this.setInterval(this.countdown, 1000)

        this.scheduleNotifications()

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
	                	<Text style={styles.progress}>{this.progressInPercent()}%</Text>
	                </View>
            	</View>
	            {
	                subject.views_available > 0 ? (
	                    <View >
                            {
                                subject.read_concepts < subject.total_concepts && (
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
                                )
                            }
                            {
                                subject.read_concepts > 5 && (
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
                                )
                            }
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
		                        	>
                                        Skip for
                                    </Text>
                                    <PointsDisplay points={subject.reset_cost}/>
		                        </View>
							</TouchableHighlight>
	                    </View>
	                )
	            }
	        </View>
        )
    }


    skipCooldown(){
        PushNotification.cancelLocalNotifications({tag: this.props.subject.name});
        this.props.onCooldownSkip(this.props.subject.reset_cost)
    }

    revisePressed(){
        if (this.props.subject.views_available < 5){
            ToastAndroid.show('Not enough views available', ToastAndroid.SHORT)
        }else{
            this.props.onRevisionPressed()
        }
    }

    testPressed(){
        if (this.props.subject.views_available < 5){
            ToastAndroid.show('Not enough views available', ToastAndroid.SHORT)
        }else{
            this.props.onTestPressed()
        }
    }

    indexPressed(){
        this.props.onIndexPressed()
    }

    progressInPercent(){
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

    scheduleNotifications(){
        const {subject} = this.props

        PushNotification.cancelLocalNotifications({tag: subject.name});
        
        PushNotification.localNotificationSchedule({
          message: `More views available in ${subject.name}`, // (required)
          largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
          smallIcon: "ic_launcher", // (optional) default: "ic_notification" with fallback for "ic_launcher"
          color: "red", // (optional) default: system default
          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000,
          tag: subject.name,
          date: new Date(subject.session_ends) // in 60 secs
        });
    }
}


// Add react timer mixin to the subject class
reactMixin(SubjectCard.prototype, TimerMixin)

export default SubjectCard