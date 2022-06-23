import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserToken} from '../../../store/user/selectors';
import {ProfileScreenNavigationProp} from '../../../navigation/UserNavigator/Navigator';
import {PPAYER_SCREEN_ROUTE} from '../../../navigation/UserNavigator/routes';
import SvgUser from '../../../assets/icons/User';
import SvgPrayer from '../../../assets/icons/Prayer';
import SvgState from '../../../assets/icons/State';
import SvgOff from '../../../assets/icons/Off';
interface PrayerProps {
  title: string;
  prayerId: number;
  navigation: ProfileScreenNavigationProp;
}

const Prayer: React.FC<PrayerProps> = ({title, prayerId, navigation}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert('Deleting', 'Deleting board', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => dispatch({type: 'DELETE_PRAYER_SAGA', prayerId}),
      },
    ]);
  };

  const handleClick = () => {
    navigation.navigate(PPAYER_SCREEN_ROUTE);
  };
  return (
    <SafeAreaView style={styles.prayer}>
      <TouchableHighlight onLongPress={handleDelete} onPress={handleClick}>
        <View style={styles.prayerContainer}>
          <View style={styles.border}>
            <SvgState />
          </View>
          <View style={styles.checkboxIcon}>
            <SvgOff style={styles.checkboxIcon} />
          </View>
          <Text style={styles.prayerTitle}>{title}</Text>
          <View style={styles.userIcon}>
            <SvgUser />
          </View>
          <Text style={styles.count}>5</Text>
          <View style={styles.prayerIcon}>
            <SvgPrayer fill={'#72A8BC'} />
          </View>
          <Text style={styles.count}>5</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  prayer: {
    display: 'flex',
    paddingTop: 23,
    paddingBottom: 23,
    width: '100%',
    justifyContent: 'center',
  },
  border: {
    width: 3,
    height: 22,
    marginRight: 15,
  },
  checkboxIcon: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  userIcon: {
    marginRight: 5,
  },
  prayerIcon: {
    marginRight: 5,
  },
  prayerTitle: {
    width: 199,
    color: 'black',
    fontFamily: 'SF UI Text',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.024,
    marginRight: 5,
  },
  count: {
    textAlign: 'center',
    color: '#514D47',
    fontFamily: 'SF UI Text',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: -0.024,
  },
  prayerContainer: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default Prayer;
