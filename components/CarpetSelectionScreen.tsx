import React from 'react';
import {
  View,
  StyleSheet,
  Image,
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
];

const CarpetSelectionScreen = ({navigation}: any) => {
  const {addToBasket, basket} = useBasket();

  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.container}
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    top: 0,
    right: 0,
    backgroundColor: '#A84000',
    color: '#FFFFFF',
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
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    height: carpetCardWidth * 0.85,
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cardHeader: {
    marginBottom: 10,
  },
  nameSection: {
    marginBottom: 6,
  },
  carpetName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  ratingBadge: {
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666666',
  },
  priceTag: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C5F8D',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arButton: {
    flex: 1,
    marginRight: 6,
  },
  arButtonLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  infoSection: {
    marginTop: 12,
    gap: 8,
  },
  infoChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default CarpetSelectionScreen;
