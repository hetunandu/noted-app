import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container:{
        flex: 1
    },
    chapterContainer: {
        padding: 5,
    },
    chapterName: {
        textAlign: 'center',
        fontSize: 23,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    conceptContainer:{
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    conceptDataContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    readCount:{
        alignItems:'center'
    },
    conceptName: {
        flex:6,
        fontSize: 20
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
   
    
})