import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {connect} from 'react-redux';
import {login, checkToken} from '../actions/auth';
import { Actions } from 'react-native-router-flux';

class Login extends Component {

    componentDidMount(){
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            GoogleSignin.configure({
                webClientId: '865864307125-gob0frva3ifb10ahm39nrj4e1hi74jeq.apps.googleusercontent.com'
            })
            .then(() => {
                GoogleSignin.currentUserAsync().then((user) => {
                    if(user){
                        this.props.login(user.idToken)
                    }
                }).done();
                this.props.checkToken();
            });
        })
        .catch((err) => {
            console.log("Play services error", err.code, err.message);
        })
    }

    componentDidUpdate(){
        if(this.props.user.isAuthenticated){
            Actions.subjects({type: 'reset'});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                {
                    this.props.user.isAuthenticated ? (
                        <View>
                            <Text style={styles.welcome}>
                                Welcome back!
                            </Text>
                        </View>
                    )
                    :
                    (
                        <View>
                            <Text style={styles.welcome}>
                                Welcome to Noted!
                            </Text>
                            <GoogleSigninButton
                                style={{width: 312, height: 48}}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={this._signIn.bind(this)}
                            />
                        </View>
                    )
                }
                    
                </View>
            </View>
        );
    }

    _signIn(){
        GoogleSignin.signIn()
            .then((user) => {
                this.props.login(user.idToken)
            })
            .catch((err) => {
                Alert.alert('Sign in Error', JSON.stringify(err))
            })
            .done();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  }
});

const mapStateToProps = ({user}) => ({
    user
})

const mapDispatchToProps = dispatch => ({
    login: (token) => {dispatch(login({"id_token": token}))},
    checkToken: () => {dispatch(checkToken())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)