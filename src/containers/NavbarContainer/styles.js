import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	navBar:{
		padding: 10,
		backgroundColor: '#50537f',
		borderBottomColor: '#404265',
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 5
	},
	navbarTitle:{
		fontSize: 23,
		fontWeight: '600',
		color: 'white'
	},
	pointsContainer:{
		padding: 5,
		alignItems: 'center',
		flexDirection: 'row'
	},
	points: {
		fontSize: 25,
		fontWeight: 'bold',
		color: 'white',
		marginRight: 5
	}
})