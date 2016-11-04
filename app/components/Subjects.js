import React, {Component} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {fetchSubjectList} from '../actions/subjects';

class Subjects extends Component{

    componentDidMount(){
        this.props.fetchSubjectList()
    }

    goToSubject(subject){
        Actions.chapterList({
            title: subject.name,
            subject
        })
    }

    renderSubjectList(){
        return this.props.subjects.data.map( subject => {
            return(
                <TouchableHighlight 
                    style={styles.subjectListItem} 
                    key={subject.key}
                    underlayColor="#333"
                    onPress={this.goToSubject.bind(this, subject)}
                >
                    <Text style={styles.subjectListItemText}>
                        {subject.name}
                    </Text>
                </TouchableHighlight>
            );
        }); 
    }

    render(){
        return (
            <View style={styles.container}>
                {
                    this.props.subjects.isFetching ? (
                        <Text>Loading...</Text>
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
    subjectListItem: {
        backgroundColor: 'white',
        flex: 1,
        marginBottom: 10,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'stretch'
    },
    subjectListItemText: {
        fontSize: 30
    }
})


const mapStateToProps = ({subjects}) => ({
    subjects
})

const mapDispatchToProps = dispatch => ({
    fetchSubjectList: () => {dispatch(fetchSubjectList())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)