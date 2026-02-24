import React from 'react';
import {
  View,
  StyleSheet,
  Image,
<<<<<<< HEAD
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {useBasket} from './BasketContext';
import { TouchableOpacity, Text as RNText } from 'react-native';

const {width} = Dimensions.get('window');
const carpetCardWidth = (width - 32) / 2;

const carpets = [
  {
    id: '1.perisian',
    name: 'Persian ',
    image: require('../assets/images/1.png'),
    price: 200,
    rating: 4.8,
  },
  {
    id: '2.ajam',
    name: 'Ajam',
    image: require('../assets/images/2.png'),
    price: 150,
    rating: 4.5,
  },
  {
    id: '3.italian',
    name: 'Italian',
    image: require('../assets/images/3.png'),
    price: 180,
    rating: 4.7,
  },
=======
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
>>>>>>> origin/master
];

const CarpetSelectionScreen = ({navigation}: any) => {
  const {addToBasket, basket} = useBasket();

  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.container}
<<<<<<< HEAD
      blurRadius={2}>
      <View style={styles.overlay}>
        {/* Header with Basket Button */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <RNText style={styles.title}>Explore Carpets</RNText>
            <RNText style={styles.subtitle}>Tap to preview in AR</RNText>
          </View>
          <View style={styles.basketReference}>
            <TouchableOpacity onPress={() => navigation.navigate('Basket')} style={{padding: 4}}>
              <RNText style={{fontSize: 24, color: '#FFF'}}>🛒</RNText>
              {basket.length > 0 && (
                <View style={styles.badge}><RNText style={{color: '#FFF', fontSize: 12}}>{basket.length}</RNText></View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Carpets Grid */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.cardsGrid}>
            {carpets.map(carpet => (
              <TouchableOpacity
                key={carpet.id}
                style={styles.carpetCard}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ARCarpet', {imageName: carpet.id})}
              >
                <Image source={carpet.image} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View style={styles.nameSection}>
                      <RNText style={styles.carpetName} numberOfLines={1}>
                        {carpet.name}
                      </RNText>
                      <View style={styles.ratingBadge}>
                        <RNText style={styles.ratingText}>⭐ {carpet.rating}</RNText>
                      </View>
                    </View>
                    <RNText style={styles.priceTag}>${carpet.price}</RNText>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.arButton} onPress={() => navigation.navigate('ARCarpet', {imageName: carpet.id})}>
                      <RNText style={styles.arButtonLabel}>View AR</RNText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addToBasket(carpet)}>
                      <RNText style={{fontSize: 20, color: '#2C5F8D'}}>♡</RNText>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoChip}>
              <RNText style={{color: '#FFF'}}>ℹ️ 30-day return policy</RNText>
            </View>
            <View style={styles.infoChip}>
              <RNText style={{color: '#FFF'}}>🚚 Free shipping on orders</RNText>
            </View>
          </View>
        </ScrollView>
=======
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
>>>>>>> origin/master
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#E0E0E0',
    fontWeight: '400',
  },
  basketReference: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#A84000',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 8,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  carpetCard: {
    width: carpetCardWidth,
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(44,95,141,0.07)',
  },
  cardImage: {
    height: carpetCardWidth * 0.85,
    width: '100%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardContent: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },
  cardHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameSection: {
    marginBottom: 0,
    flex: 1,
  },
  carpetName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 2,
  },
  ratingBadge: {
    marginTop: 2,
    backgroundColor: '#F2F6FA',
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#2C5F8D',
    fontWeight: '600',
  },
  priceTag: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C5F8D',
    marginLeft: 8,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  arButton: {
    flex: 1,
    marginRight: 6,
    backgroundColor: '#2C5F8D',
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2C5F8D',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
  },
  arButtonLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.2,
  },
  infoSection: {
    marginTop: 18,
    gap: 10,
  },
  infoChip: {
    backgroundColor: 'rgba(44,95,141,0.13)',
    borderColor: 'rgba(44,95,141,0.18)',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginBottom: 2,
=======
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
>>>>>>> origin/master
  },
});

export default CarpetSelectionScreen;
