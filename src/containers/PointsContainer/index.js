import React from 'react';
import NavbarContainer from '../NavbarContainer';
import {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	StyleSheet
} from 'react-native';
import {Loading} from '../../components';
import {redeemCode} from './actions';
import { connect } from 'react-redux';


const mapStateToProps = ({points}) => ({
	points
})


class Points extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			code: ""
		};
	}

    render() {
    	return (
    		<View style={{flex: 1}}>
    			<NavbarContainer title="Points" />
    			<View style={styles.container}>
    				<View style={styles.section}>
	    				<Text style={styles.formLabel}>Enter cheat code:</Text>
	    				<TextInput
								autoFocus={true}
								style={{height: 40, width: 300}}
								onChangeText={(text) => this.setState({code: text})}
								value={this.state.code}
							/>
							<TouchableHighlight
								style={[styles.btn, {backgroundColor: 'green'}]}
								onPress={() => this.submitCode()}
							>
								<Text style={styles.btnText}>Submit</Text>
							</TouchableHighlight>

						{ this.props.points.isFetching && <Loading />}

						{this.props.points.errorMesssage && (
								<Text>Error: {this.props.points.errorMesssage}</Text>
							)
						}

					</View>
    			</View>
    		</View>
    	)
    }

    submitCode(){
    	this.props.dispatch(redeemCode({
    		code: this.state.code
    	}))

    	this.setState({
    		code: ""
    	})
    }

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	section: {
		flex: 1,
		padding: 10,
		alignItems: 'stretch',
		justifyContent: 'center'

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

export default connect(mapStateToProps)(Points);
