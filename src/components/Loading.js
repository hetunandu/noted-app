import React from 'react';
import {
	View,
	Text,
	ActivityIndicator
} from 'react-native'

class Loading extends React.Component {
    render() {
        return (
        	<ActivityIndicator
        	    animating={true}
        	    style={{height: 80}}
        	    color="red"
				size="large"
			/>
        );
    }
}

export default Loading;
