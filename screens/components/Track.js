import React from 'react';
import { Avatar, Badge, Icon, withBadge,Card, ListItem, Image } from 'react-native-elements'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: hp('3%'),
    paddingVertical: hp('1%'),
    borderWidth: hp('0.1%'),
    borderColor: "#C8C8C8",
  },
  text: {
    color: '#4a4a4a',
    fontSize: hp('5%'),
  },
  separator: {
    flex: hp('0,3%'),
    height: hp('0,3%'),
    backgroundColor: '#e4e4e4',
    marginLeft: hp('3%'),
  },
 
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: hp('6,5%'),
  },
});

export const Separator = () => <View style={styles.separator} />;



const Track = ({id, text,name, url}) => (
    <View style={styles.container}>

      <ListItem

        leftElement={<Image
        style={{width: 40, height: 40}}
        source={{uri: 'https://img.cdandlp.com/2019/01/imgL/119431391.jpg'}}
      />}
      title='Stevie Wonder'
      subtitle='Superstition'
      rightIcon={{ type: 'font-awesome', name: 'play', color: 'black' }}
     
      />

    </View>
  
);

export default Track;