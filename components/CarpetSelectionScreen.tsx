import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

const carpets = [
  {id: '1.png', image: require('../assets/images/1.png')},
  {id: '2.png', image: require('../assets/images/2.png')},
  {id: '3.png', image: require('../assets/images/3.png')},
];

const CarpetSelectionScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Carpet</Text>
      <View style={styles.imageContainer}>
        {carpets.map(carpet => (
          <TouchableOpacity
            key={carpet.id}
            onPress={() =>
              navigation.navigate('ARCarpet', {imageName: carpet.id})
            }>
            <Image source={carpet.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default CarpetSelectionScreen;
