import React from 'react';
import NavbarContainer from '../NavbarContainer';
import {
	View,
	Text,
	TouchableHighlight,
  ScrollView
} from 'react-native';
import {Loading} from '../../components';
import {reps} from './repsInfo';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';

class OfflineBuyContainer extends React.Component {
    render() {
      console.log(reps)
    	return (
    		<View style={{flex: 1}}>
    			<NavbarContainer title="Buy Offline" />
          <View style={styles.container}>
            <Text style={styles.headerText}>
              You can buy points from one of your representatives
              by paying with cash
            </Text>
            <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
              {
                reps.map((rep, i) => {
                  return(
                    <View key={i} style={styles.rep}>
                      <View style={styles.repDetails}>
                        <Text style={styles.repName}>
                          {rep.name}
                        </Text>
                        <Text style={styles.repInfo}>
                          College: {rep.college}
                        </Text>
                        <Text style={styles.repInfo}>
                          Area: {rep.area}
                        </Text>
                      </View>
                      <View style={styles.repContact}>
                        <TouchableHighlight
                          underlayColor="#f1f1f1"
                          onPress={() => this.textRep(rep)}
                        >
                          <Icon name="textsms" size={30} color="gray" />
                        </TouchableHighlight>
                        <TouchableHighlight
                          underlayColor="#f1f1f1"
                          onPress={() => this.callRep(rep.number)}
                        >
                          <Icon name="call" size={30} color="green" />
                        </TouchableHighlight>
                      </View>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
    		</View>
    	)
    }

    callRep(number){
      Communications.phonecall(number, true)
    }

    textRep(rep){
      Communications.text(rep.number, `Hey ${rep.name}! I want to buy points for Noted!`)
    }

}


export default OfflineBuyContainer;
