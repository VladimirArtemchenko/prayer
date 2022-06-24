import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import DetailsItem from '../../../UI/DetailsItem';
import SvgBack from '../../../assets/icons/Back';
import SvgPrayer from '../../../assets/icons/Prayer';
import SvgAddMember from '../../../assets/icons/AddMember';
import {useDispatch, useSelector} from 'react-redux';
import {selectComments} from '../../../store/ducks/comments/selectors';
import {ProfileScreenNavigationProp} from '../Navigator';
import {sagaActions} from '../../../store/ducks/comments/types';
import Comment from '../../../UI/Comment';

interface PrayerScreenProps {
  navigation: ProfileScreenNavigationProp;
}
const PrayerScreen: React.FC<PrayerScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: sagaActions.FETCH_COMMENTS_SAGA});
  }, []);
  const comments = useSelector(selectComments);

  const handleAddMemberClick = () => {
    console.log('click');
  };
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <View style={styles.headerBack}>
          <TouchableHighlight
            style={styles.headerBack}
            onPress={() => navigation.goBack()}>
            <SvgBack />
          </TouchableHighlight>
          <View>
            <SvgPrayer fill={'#fff'} />
          </View>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>
            Prayer item two which is for my family to love God whole heartedly.
          </Text>
        </View>
      </View>
      <View>
        <View>
          <View style={styles.lastPriedContainer}>
            <Text style={styles.lastPriedText}>Last prayed 8 min ago</Text>
          </View>
          <View style={styles.detailsContainer}>
            <DetailsItem title="July 25 2017" info="Date Added" />
            <DetailsItem title="123" info="Times Prayed Total" />
          </View>
          <View style={styles.detailsContainer}>
            <DetailsItem title="July 25 2017" info="Date Added" />
            <DetailsItem title="123" info="Times Prayed Total" />
          </View>
          <View style={styles.membersContainer}>
            <Text style={styles.membersTitle}>members</Text>
            <TouchableHighlight
              onPress={handleAddMemberClick}
              style={styles.membersAvatarsContainer}>
              <SvgAddMember />
            </TouchableHighlight>
          </View>
          <View>
            <View style={styles.membersContainer}>
              <Text style={styles.membersTitle}>comments</Text>
            </View>
            {comments &&
              comments.map(item => (
                <Comment
                  comment={item.body}
                  name={item.prayerId}
                  id={item.id}
                />
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  lastPriedContainer: {
    width: '100%',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastPriedText: {
    marginLeft: 7,
    color: '#514d47',
    fontSize: 20,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  membersContainer: {
    padding: 15,
  },
  headerContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#bfb393',
    padding: 15,
  },
  headerBack: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerTextContainer: {
    width: '100%',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  membersTitle: {
    color: '#72a8bc',
    fontSize: 17,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  membersAvatarsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default PrayerScreen;
