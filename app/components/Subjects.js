import React, {Component} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
                    key={subject.key}
                    onPress={this.goToSubject.bind(this, subject)}
                >
                    <View style={styles.subjectListItem} >
                        <Text style={styles.subjectListItemText}>
                            {subject.name}
                        </Text>
                        <Icon name="chevron-right" size={50} color="#333" />    
                    </View>
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
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
        elevation: 2,
        borderRadius: 2
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