import React, {Component} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';
import Loading from './Loading';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {fetchSubjectList } from '../actions/subjects';
import {fetchConceptsList } from '../actions/concepts';

class Subjects extends Component{

    componentDidMount(){
        this.props.fetchSubjectList()
    }


    handleSubjectPressed(subject){
        Actions.conceptView()
        this.props.fetchConceptsList(subject.key)
    }

    convertSecondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes ") : "";
        return hDisplay + mDisplay; 
    }

    renderSubjectList(){
        return this.props.subjects.data.map( subject => {
            return(
                <View key={subject.key} >
                    {
                        subject.last_fetched_date ? (
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
                                <Text style={styles.subjectInfo}>
                                    More concepts in: {this.convertSecondsToHms(subject.time_to_more)}
                                </Text>
                                <View style={styles.subjectActions}>
                                    <TouchableHighlight
                                        style={[styles.actionBtn, {
                                            borderBottomLeftRadius: 5,
                                            borderRightColor: "#f1f1f1",
                                            borderRightWidth: 2
                                        }]}
                                        onPress={() => console.log('yo')}
                                    >
                                        <Text style={{fontSize: 20, color: 'white'}}>Quiz</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={[styles.actionBtn, {
                                            borderBottomRightRadius: 5
                                        }]}
                                        onPress={() => this.handleSubjectPressed(subject)}
                                    >
                                        <Text style={{fontSize: 20, color: 'white'}}>Study</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>

                        ) : (
                            <TouchableHighlight
                                style={styles.subjectListItemContainer}
                                underlayColor="#f1f1f1"
                                onPress={() => this.handleSubjectPressed(subject)}
                            >
                                <View style={styles.subjectListItem}>
                                    <Text style={styles.subjectNameIntro}>
                                        Start {subject.name}
                                    </Text>
                                    <Text style={styles.subjectInfo}>
                                        Total concepts: {subject.total_concepts}
                                    </Text>
                                </View>
                            </TouchableHighlight>

                        )
                    }
                </View>
            );
        }); 
    }

    render(){
        return (
            <View style={styles.container}>
               
                {
                    this.props.subjects.isFetching ? (
                        <Loading />
                    ) : this.renderSubjectList() 
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
    },
    subjectCard: {
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 15,
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
        fontSize: 30
    },
    subjectNameIntro:{
        fontSize: 25
    },
    subjectInfo: {
        fontSize: 17,
        marginBottom: 10
    },
    subjectActions:{
        flexDirection: 'row',
        marginBottom: -15,
        marginRight: -15,
        marginLeft: -15,
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


const mapStateToProps = ({subjects}) => ({
    subjects
})

const mapDispatchToProps = dispatch => ({
    fetchSubjectList: () => {dispatch(fetchSubjectList())},
    fetchConceptsList: (subject_key) => {dispatch(fetchConceptsList(subject_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)