import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    chapterContainer: {
        padding: 5,
    },
    chapterName: {
        fontSize: 23,
        marginBottom: 5
    },
    conceptList: {
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 2
    },
    conceptContainer:{
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#999"
    },
    conceptName: {
        fontSize: 20
    },
    offlineBanner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: '#50537f'
    }
})