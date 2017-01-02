import React from 'react';
import {
	View,
	Image,
	Text
} from 'react-native';


class UserPoints extends React.Component {
   
    render() {
        return (
        	<View style={{
        		flexDirection: 'row',
        		alignItems: 'center'
        	}}>
        		<Image 
        			source={require('../images/icon.png')}
        			style={{width: 20, height: 20, borderRadius: 50}} 
        		/>
        		<Text style={{
        			fontSize: 30,
        			fontWeight: 'bold',
        			color: 'white',
        			marginLeft: 5
        		}}>
        			{this.props.points}
        		</Text>
        	</View>
        );
    }
}

export default UserPoints;
