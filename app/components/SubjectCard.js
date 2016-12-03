import React from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	StyleSheet,
	ToastAndroid
} from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class SubjectCard extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {time_left: "Calculating..."};
	}

	componentDidMount(){
		this.setInterval(this.countdown, 1000)
	}

	countdown(){
		const {subject} = this.props

		if(subject.has_data_count > 0){

			var date = new Date(subject.next_concepts_on)
			var ist_date = new Date(date.valueOf() + date.getTimezoneOffset());
			var time_left = ist_date - new Date()
			
			if (time_left < 0){
				this.clearInterval()
				this.setState({
					time_left: (
						<Text style={{color:"green"}}>
							Available
						</Text>
					)
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
		        	time_left: (
		        		<Text style={{color: "red"}}>
		        			{`in ${hours}h ${minutes}m ${seconds}s`}
		        		</Text>
		        	)
		        })
			}
		}
	}


	handleTestPressed(){
		if(this.props.subject.is_done_count > 9){
			this.props.startTest()
		}else{
			ToastAndroid.show(
				"You need to revise alteast 10 concepts before we can test",
				ToastAndroid.LONG
			)
		}
	}

    render() {
    	const {subject} = this.props

        return (
        	<View>
        	    {
        	        subject.has_data_count > 0 ? (
        	            <View style={styles.subjectCard} >
        	                

        	                <Text style={styles.subjectName}>
        	                    {subject.name}
        	                </Text>
        	                <Text style={styles.subjectInfo}>
        	                    Total concepts: {subject.total_concepts}
        	                </Text>
        	                <Text style={styles.subjectInfo}>
        	                    Concepts done: {subject.is_done_count}
        	                </Text>
                            {
                                subject.is_skipped_count > 0 && (
                                    <Text style={styles.subjectInfo}>
                                        Concepts skipped: {subject.is_skipped_count}
                                    </Text>
                                )
                            }
                            {
                                subject.total_concepts == subject.is_done_count ? (
                                    <Text style={styles.subjectInfo}>
                                        All concepts revised. Time to test!
                                    </Text>

                                ) :(
                                    
                                    <Text style={styles.subjectInfo}>
                                        {subject.concept_limit - subject.is_skipped_count} more concepts: {this.state.time_left}
                                    </Text>
                                )
                            }

        	                <View style={styles.subjectActions}>
        	                    <TouchableHighlight
        	                        style={[styles.actionBtn, {
        	                            borderBottomLeftRadius: 5,
        	                            borderRightColor: "#f1f1f1",
        	                            borderRightWidth: 2
        	                        }]}
        	                        onPress={() => this.handleTestPressed()}
        	                    >
        	                        <Text style={{fontSize: 20, color: 'white'}}>Test</Text>
        	                    </TouchableHighlight>
        	                    <TouchableHighlight
        	                        style={[styles.actionBtn, {
        	                            borderBottomRightRadius: 5
        	                        }]}
        	                        onPress={() => this.props.startRevision()}
        	                    >
        	                        <Text style={{fontSize: 20, color: 'white'}}>Revise</Text>
        	                    </TouchableHighlight>
        	                </View>

        	            </View>

        	        ) : (
        	            <TouchableHighlight
        	                style={styles.subjectListItemContainer}
        	                underlayColor="#f1f1f1"
        	                onPress={() => this.props.startRevision()}
        	            >
        	                <View style={styles.subjectListItem}>
        	                    <Text style={styles.subjectNameIntro}>
        	                        Start {subject.name}
        	                    </Text>
        	                    <Text style={{fontSize: 17}}>
        	                        Total concepts: {subject.total_concepts}
        	                    </Text>
        	                </View>
        	            </TouchableHighlight>

        	        )
        	    }
        	</View>
        );
    }
}

// Add react timer mixin to the subject class
reactMixin(SubjectCard.prototype, TimerMixin)

const styles = StyleSheet.create({
    subjectCard: {
        backgroundColor: 'white',
        justifyContent: 'center',
        elevation: 2,
        borderRadius: 5,
        margin: 10
    },
    subjectListItemContainer:{
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 5,
        margin: 10

    },
    subjectListItem: {
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
    },
    subjectName: {
        textAlign: 'center',
        fontSize: 30,
    },
    subjectNameIntro:{
        fontSize: 25
    },
    subjectInfo: {
        fontSize: 17,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f1f1"
    },
    subjectActions:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    actionBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "#333"
    }
})

export default SubjectCard;
