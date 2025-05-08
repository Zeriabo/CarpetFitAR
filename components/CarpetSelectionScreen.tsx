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
import {IconButton, Badge} from 'react-native-paper';
import Icon from '@react-native-vector-icons/FontAwesome6'; // corrected casing

const carpets = [
  {id: '1.perisian', image: require('../assets/images/1.png'), price: 200},
  {id: '2.ajam', image: require('../assets/images/2.png'), price: 150},
  {id: '3.italian', image: require('../assets/images/3.png'), price: 180},
];

const CarpetSelectionScreen = ({navigation}: any) => {
  const {addToBasket, basket} = useBasket();

  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.container}
      blurRadius={1}>
      <View style={styles.overlay}>
        {/* 🛒 Basket Icon at top right */}
        <View style={styles.basketIconContainer}>
          <IconButton
            icon="cart-outline"
            size={28}
            onPress={() => navigation.navigate('Basket')}
            style={styles.basketIcon}
          />
          {basket.length > 0 && (
            <Badge style={styles.badge}>{basket.length}</Badge>
          )}
        </View>

        <Text style={styles.title}>Select a Carpet</Text>

        <View style={styles.imageContainer}>
          {carpets.map(carpet => (
            <View key={carpet.id} style={styles.carpetCard}>
              <View style={styles.imageWrapper}>
                <Text style={styles.priceText}>${carpet.price}</Text>
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
                  onPress={() => addToBasket(carpet)}
                />
              </View>
              <Text style={styles.carpetLabel}>
                {carpet.id.replace('.png', '')}
              </Text>
            </View>
          ))}
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
  },
  basketIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  basketIcon: {
    backgroundColor: 'white',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'red',
    color: '#fff',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  priceText: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: '500',
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
});

export default CarpetSelectionScreen;
