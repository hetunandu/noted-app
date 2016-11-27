import React from 'react';

import {
	Text,
	View,
	TouchableHighlight,
	StyleSheet,
    ToastAndroid
} from 'react-native';
import Loading from './Loading';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fetchChapterList} from '../actions/chapters';



class SubjectView extends React.Component {

	viewNotes(){
		this.props.fetchChapterList(this.props.subject.key)
		Actions.chapterList({title: this.props.subject.name})
	}


    render() {
    	const {plan, hasAccess, isFetching } = this.props.activeSubject

        return (
        	<View style={styles.container}>
                <TouchableHighlight 
                    style={styles.buttonContainer}
                    onPress={() =>  ToastAndroid.show('Not implemented yet', ToastAndroid.SHORT)}
                >
                    <View style={styles.revisionButton} >
                        <Text style={styles.buttonText}>
                            Daily Study
                        </Text>
                        <Icon name="chevron-right" size={50} color="#fff" />    
                    </View>
                </TouchableHighlight>
        		<TouchableHighlight 
        		    style={styles.buttonContainer}
        		    onPress={() => this.viewNotes()}
        		>
        		    <View style={styles.notesButton} >
        		        <Text style={styles.buttonText}>
							View Index
        		        </Text>
        		        <Icon name="chevron-right" size={50} color="#fff" />    
        		    </View>
        		</TouchableHighlight>
        	</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60
    },
    buttonContainer: {
    },
    revisionButton: {
        backgroundColor: '#E83B40',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
    },
    notesButton: {
    	backgroundColor: '#333',
    	flexDirection: 'row',
    	justifyContent: 'space-between',
    	padding: 15,
    	alignItems: 'center',
    },
    buttonText: {
        fontSize: 30,
        color: 'white'
    }
})

const mapStateToProps = ({activeSubject}) => ({
	activeSubject
})

const mapDispatchToProps = dispatch => ({
	fetchChapterList: subject_key => {dispatch(fetchChapterList(subject_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(SubjectView);
