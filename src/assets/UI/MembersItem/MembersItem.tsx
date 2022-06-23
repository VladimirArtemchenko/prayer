import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
interface MembersItemProps {
  img: string;
}
const MembersItem: FC<MembersItemProps> = ({img}) => {
  return (
    <View style={styles.container}>
      {/*<Image style={styles.image} source={'./'} />*/}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
  },
  image: {
    borderRadius: 30,
  },
});
export default MembersItem;
