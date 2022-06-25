import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface MembersItemProps {
  img: string;
}
const MembersItem: FC<MembersItemProps> = ({img}) => {
  return (
    <View style={styles.container}>
      <Text>{img}</Text>
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
