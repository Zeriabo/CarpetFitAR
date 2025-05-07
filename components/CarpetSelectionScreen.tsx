import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {useBasket} from './BasketContext';
import {Button, IconButton, Badge} from 'react-native-paper';
import Icon from '@react-native-vector-icons/fontawesome6';

const carpets = [
  {id: '1.perisian', image: require('../assets/images/1.png')},
  {id: '2.ajam', image: require('../assets/images/2.png')},
  {id: '3.italian', image: require('../assets/images/3.png')},
];

const CarpetSelectionScreen = ({navigation}: any) => {
  const {addToBasket, basket} = useBasket();

  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.container}
      blurRadius={1}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Select a Carpet</Text>

        <View style={styles.imageContainer}>
          {carpets.map(carpet => (
            <View key={carpet.id} style={styles.carpetCard}>
              <View style={styles.imageWrapper}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ARCarpet', {imageName: carpet.id})
                  }>
                  <Image source={carpet.image} style={styles.image} />
                </TouchableOpacity>
                <IconButton
                  icon="cart-plus"
                  size={24}
                  style={styles.iconButton}
                  onPress={() => addToBasket(carpet.id)}
                />
              </View>
              <Text style={styles.carpetLabel}>
                {carpet.id.replace('.png', '')}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.basketContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Basket')}
            style={styles.viewBasketButton}
            icon="cart-outline">
            View Basket
          </Button>

          {basket.length > 0 && (
            <Badge style={styles.badge}>{basket.length}</Badge>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  carpetCard: {
    alignItems: 'center',
    width: 110,
    marginHorizontal: 5,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  iconButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#fff',
  },
  carpetLabel: {
    marginTop: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  basketContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  viewBasketButton: {
    backgroundColor: '#6200ee',
    width: '60%',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: '20%',
    backgroundColor: 'red',
    color: '#fff',
  },
});

export default CarpetSelectionScreen;
