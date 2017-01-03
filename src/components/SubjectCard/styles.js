import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
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