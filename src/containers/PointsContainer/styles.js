import {StyleSheet} from 'react-native';


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    section: {
        flex: 1,
        padding: 10,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#333'
    },
    sectionHeader: {
        textAlign: 'center',
        fontSize: 27,
        color: '#333'
    },
    cost: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    formLabel: {
        fontSize: 20,
    },
    btn: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 23
    }
})