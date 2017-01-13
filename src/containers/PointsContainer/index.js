import React from 'react';
import NavbarContainer from '../NavbarContainer';
import {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	StyleSheet,
    ToastAndroid
} from 'react-native';
import {Loading, PointsDisplay} from '../../components';
import {redeemCode} from './actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import styles from './styles';

const mapStateToProps = ({points}) => ({
	points
});


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
    			<NavbarContainer title="Coins" />
    			<View style={styles.container}>
    				<View style={styles.section}>
						<Text style={styles.sectionHeader}>Have a code? Enter below</Text>

                        <View>
                            <Text style={styles.formLabel}>Code:</Text>
                            <TextInput
                                style={{height: 50}}
                                onChangeText={(text) => this.setState({code: text})}
                                value={this.state.code}
                                borderBottomColor="#50537f"
                                autoCapitalize="characters"
                                maxLength={5}
                            />
                        </View>

                        <TouchableHighlight
                            style={[styles.btn, {backgroundColor: 'green'}]}
                            onPress={() => this.submitCode()}
                        >
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableHighlight>


						{ this.props.points.isFetching && <Loading />}

						{this.props.points.errorMesssage && (
							<Text>Error: {this.props.points.errorMesssage}</Text>
						)}

					</View>
					<View style={styles.section}>
                        <Text style={styles.sectionHeader}>Buy coins</Text>
                        <View style={styles.cost}>
                            <PointsDisplay points={500} dark />
                            <Text style={{fontSize: 25}}> for Rs.50/-</Text>
                        </View>


                        <TouchableHighlight
                            style={[styles.btn, {backgroundColor: 'steelblue'}]}
                            onPress={() => Actions.payOnline()}
                        >
                            <Text style={styles.btnText}>Pay Online</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={[styles.btn, {backgroundColor: '#50537f'}]}
                            onPress={() => Actions.offlineBuy()}
                        >
                            <Text style={styles.btnText}>Pay Offline</Text>
                        </TouchableHighlight>
                    </View>
    			</View>
    		</View>
    	)
    }

    submitCode(){

	    if(this.state.code.length < 4){
	        ToastAndroid.show('Error: Check code', ToastAndroid.BOTTOM)
        }else{
            this.props.dispatch(redeemCode({
                code: this.state.code
            }));

            this.setState({
                code: ""
            })
        }

    }

}



export default connect(mapStateToProps)(Points);
