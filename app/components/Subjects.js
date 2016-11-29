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
                <TouchableHighlight 
                    key={subject.key}
                    onPress={this.handleSubjectPressed.bind(this, subject)}
                    style={styles.subjectListItemContainer}
                    underlayColor="#333"
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
    subjectListItemContainer: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    subjectListItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 2,
        alignItems: 'center',
    },
    subjectListItemText: {
        fontSize: 30
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