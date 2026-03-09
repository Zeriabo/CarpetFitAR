import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useBasket} from './BasketContext';
import {TouchableOpacity, Text as RNText} from 'react-native';

const {width} = Dimensions.get('window');
const carpetCardWidth = (width - 40) / 2;

const carpets = [
  {
    id: '1.perisian',
    name: 'Persian',
    image: require('../assets/images/1.png'),
    price: 200,
    rating: 4.8,
    category: 'Classic',
  },
  {
    id: '2.ajam',
    name: 'Ajam',
    image: require('../assets/images/2.png'),
    price: 150,
    rating: 4.5,
    category: 'Modern',
  },
  {
    id: '3.italian',
    name: 'Italian',
    image: require('../assets/images/3.png'),
    price: 180,
    rating: 4.7,
    category: 'Contemporary',
  },
];

const CarpetSelectionScreen = ({navigation}: any) => {
  const {addToBasket, basket} = useBasket();

  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.container}
      blurRadius={2}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          {/* Modern Header */}
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <RNText style={styles.title}>✨ Explore Carpets</RNText>
              <RNText style={styles.subtitle}>Find your perfect match</RNText>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Basket')}
              style={styles.basketButton}>
              <RNText style={styles.basketIcon}>🛒</RNText>
              {basket.length > 0 && (
                <View style={styles.badge}>
                  <RNText style={styles.badgeText}>{basket.length}</RNText>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Carpets Grid */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.cardsGrid}>
              {carpets.map(carpet => (
                <View key={carpet.id} style={styles.cardWrapper}>
                  <TouchableOpacity
                    style={styles.carpetCard}
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate('ARCarpet', {imageName: carpet.id})
                    }>
                    {/* Image Container */}
                    <View style={styles.imageContainer}>
                      <Image
                        source={carpet.image}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                      <View style={styles.categoryBadge}>
                        <RNText style={styles.categoryText}>{carpet.category}</RNText>
                      </View>
                    </View>

                    {/* Card Content */}
                    <View style={styles.cardContent}>
                      {/* Header */}
                      <View style={styles.cardHeader}>
                        <RNText
                          style={styles.carpetName}
                          numberOfLines={1}>
                          {carpet.name}
                        </RNText>
                        <RNText style={styles.priceTag}>
                          ${carpet.price}
                        </RNText>
                      </View>

                      {/* Rating */}
                      <View style={styles.ratingContainer}>
                        <RNText style={styles.ratingText}>
                          ⭐ {carpet.rating}
                        </RNText>
                      </View>

                      {/* Actions */}
                      <View style={styles.actions}>
                        <TouchableOpacity
                          style={styles.arButton}
                          onPress={() =>
                            navigation.navigate('ARCarpet', {
                              imageName: carpet.id,
                            })
                          }>
                          <RNText style={styles.arButtonLabel}>
                            👁️ Preview
                          </RNText>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => addToBasket(carpet)}>
                          <RNText style={styles.addButtonLabel}>
                            ➕ Add
                          </RNText>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoBanner}>
                <RNText style={styles.bannerEmoji}>✅</RNText>
                <View style={styles.bannerContent}>
                  <RNText style={styles.bannerTitle}>30-Day Returns</RNText>
                  <RNText style={styles.bannerText}>Not satisfied? Full refund</RNText>
                </View>
              </View>
              <View style={styles.infoBanner}>
                <RNText style={styles.bannerEmoji}>🚚</RNText>
                <View style={styles.bannerContent}>
                  <RNText style={styles.bannerTitle}>Free Shipping</RNText>
                  <RNText style={styles.bannerText}>On orders over $150</RNText>
                </View>
              </View>
              <View style={styles.infoBanner}>
                <RNText style={styles.bannerEmoji}>🔒</RNText>
                <View style={styles.bannerContent}>
                  <RNText style={styles.bannerTitle}>Secure Checkout</RNText>
                  <RNText style={styles.bannerText}>Encrypted & trusted payment</RNText>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#E0E7FF',
    fontWeight: '500',
  },
  basketButton: {
    position: 'relative',
    padding: 8,
    marginRight: -8,
  },
  basketIcon: {
    fontSize: 28,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardWrapper: {
    width: carpetCardWidth,
    marginBottom: 4,
  },
  carpetCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  cardImage: {
    height: carpetCardWidth * 0.9,
    width: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(8, 145, 178, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFF',
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    marginBottom: 8,
  },
  carpetName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  priceTag: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0891B2',
    marginTop: 4,
  },
  ratingContainer: {
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  arButton: {
    flex: 1,
    backgroundColor: 'rgba(8, 145, 178, 0.15)',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(8, 145, 178, 0.4)',
  },
  arButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0891B2',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#0891B2',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#0891B2',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoSection: {
    marginTop: 20,
    gap: 10,
    paddingHorizontal: 4,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  bannerEmoji: {
    fontSize: 24,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 2,
  },
  bannerText: {
    fontSize: 11,
    color: '#E0E7FF',
    fontWeight: '400',
  },
});

export default CarpetSelectionScreen;
