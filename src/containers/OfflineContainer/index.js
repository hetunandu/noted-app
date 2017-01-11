import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	StyleSheet
} from 'react-native';
import {
	Loading,
	OfflineReader
} from '../../components';
import { connect } from 'react-redux';


const mapStateToProps = ({offline}) => ({
	offline
})


class OfflineContainer extends React.Component {

  render() {
  	return (
		<View style={styles.container}>
			<OfflineReader index={this.props.offline.index} />
		</View>
  	)
  }



}


export default connect(mapStateToProps)(OfflineContainer);
