import React from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ActionBtn extends React.Component {
	render() {
		return (
			<TouchableHighlight 
				onPress={() => this.props.btnPressed()}
				style={[styles.btn, {backgroundColor: this.props.backgroundColor}]}
				underlayColor={this.props.underlayColor}
			>
				<View style={styles.btnContainer}>
					{
						this.props.iconName && (
							<Icon 
								name={this.props.iconName}
								size={40} 
								style={styles.btnIcon}
								color="#fff" 
							/>
						)
					}
					<Text style={styles.btnText}>{this.props.btnText}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	cardActions: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	btn:{
		flex: 1,
		padding: 10,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	btnText:{
		color: 'white',
		fontSize: 15
	}
})
export default ActionBtn;
