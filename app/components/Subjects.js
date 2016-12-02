import React, {Component} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';
import Loading from './Loading';
import SubjectCard from './SubjectCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {fetchSubjectList } from '../actions/subjects';
import {fetchRevisionConcepts, fetchTestConcepts } from '../actions/concepts';


class Subjects extends Component{

    componentDidMount(){
        this.props.fetchSubjectList()
    }

    handleRevisionPressed(subject){
        Actions.conceptView({subject})
        this.props.fetchRevisionConcepts(subject.key)
    }

    handleTestPressed(subject){
        Actions.conceptView({subject})
        this.props.fetchTestConcepts(subject.key)
    }

    render(){
        return (
            <View style={styles.container}>
               
                {
                    this.props.subjects.isFetching ? (
                        <Loading />
                    ) : this.props.subjects.data.map( subject => {
                        return (
                            <SubjectCard 
                                subject={subject}
                                startRevision={() => this.handleRevisionPressed(subject)}
                                startTest={() =>this.handleTestPressed(subject)}
                                key={subject.key} 
                            />
                        )
                    }) 
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
    }
})


const mapStateToProps = ({subjects}) => ({
    subjects
})

const mapDispatchToProps = dispatch => ({
    fetchSubjectList: () => {dispatch(fetchSubjectList())},
    fetchRevisionConcepts: (subject_key) => {dispatch(fetchRevisionConcepts(subject_key))},
    fetchTestConcepts: (subject_key) => {dispatch(fetchTestConcepts(subject_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)