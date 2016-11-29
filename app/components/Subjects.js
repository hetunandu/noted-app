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

    renderSubjectList(){
        return this.props.subjects.data.map( subject => {
            return(
                <View key={subject.key} style={styles.subjectCard} >
                    <Text style={styles.subjectName}>
                        {subject.name}
                    </Text>
                    <Text style={{fontSize: 20}}>
                        Progress
                    </Text>
                    <View style={[styles.progressBar, {flex: subject.total_concepts}]}>
                        <View style={[
                            styles.understoodConceptProgress,
                            {flex: subject.is_understood_count}
                        ]}/>
                        <View style={[
                            styles.viewedConceptProgress,
                            {flex: subject.has_data_count}
                        ]}/>
                        <View style={[
                            styles.totalConceptProgress,
                            {flex: subject.total_concepts}
                        ]}/>
                    </View>
                    <Text>
                        Total: {subject.total_concepts},
                        Viewed: {subject.has_data_count},
                        Understood: {subject.is_understood_count},
                        Last Fetched: {subject.last_fetched_date}

                    </Text>
                    <TouchableHighlight
                        style={styles.studyBtn}
                        onPress={() => this.handleSubjectPressed(subject)}
                    >
                        <Text style={{fontSize: 20, color: 'white'}}>Study</Text>
                    </TouchableHighlight>
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
        marginTop: 60,
    },
    subjectCard: {
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 15,
        elevation: 2,
        borderRadius: 5,
        margin: 10
    },
    subjectName: {
        textAlign: 'center',
        fontSize: 30
    },
    progressBar: {
        height: 10,
        flexDirection: 'row',
        marginBottom: 5
    },
    totalConceptProgress: {
        backgroundColor: "#000"
    },
    viewedConceptProgress: {
        backgroundColor: "#E83B40"
    },
    understoodConceptProgress: {
        backgroundColor: "#2E7F2E"
    },
    studyBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "#E83B40",
        marginBottom: -15,
        marginRight: -15,
        marginLeft: -15,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
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