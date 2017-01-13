import React, { Component } from 'react';
import {
    View,
    WebView,
    Text
} from 'react-native';
import {connect} from 'react-redux';
import {requestPayment, paymentStatus, getNewPoints} from './actions';
import {
    Loading
} from '../../components';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import {Actions} from 'react-native-router-flux';

const mapStateToProps = ({payment}) => ({
    payment
});

class PaymentContainer extends Component {

    componentDidMount() {
        this.setInterval(this.checkStatus, 3000);
        this.props.dispatch(requestPayment())
    }

    componentDidUpdate(){
        if(this.props.payment.status === 'Credit'){
            this.props.dispatch(getNewPoints());
            Actions.pop()
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.payment.isFetching ? (<Loading />) : (
                    <WebView source={{uri: this.props.payment.request.longurl}} />
                    )
                }
            </View>
        )
    }

    checkStatus() {
        this.props.dispatch(paymentStatus(this.props.payment.key))
    }
}

reactMixin(PaymentContainer.prototype, TimerMixin);

export default connect(mapStateToProps)(PaymentContainer)
