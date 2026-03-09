import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useBasket} from '../components/BasketContext';

const {width} = Dimensions.get('window');

const BasketScreen = () => {
  const {basket, clearBasket, removeFromBasket} = useBasket();

  const handleBuy = () => {
    Alert.alert(
      '✅ Order Placed',
      `You purchased ${basket.length} carpet${basket.length !== 1 ? 's' : ''}!\n\nTotal: $${totalPrice}`,
      [{text: 'OK', onPress: clearBasket}],
    );
  };

  const totalPrice = basket.reduce((sum: any, item: any) => sum + item.price, 0);

  const handleRemove = (item: any) => {
    removeFromBasket(item);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyTitle}>Your basket is empty</Text>
      <Text style={styles.emptyText}>Add some beautiful carpets to get started!</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.background}
      blurRadius={2}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🛒 Your Basket</Text>
            <View style={styles.headerInfo}>
              <Text style={styles.itemCount}>
                {basket.length} item{basket.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          {/* Content */}
          {basket.length === 0 ? (
            renderEmptyState()
          ) : (
            <>
              <FlatList
                data={basket}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({item, index}) => (
                  <View style={styles.itemCard}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemNumber}>{index + 1}</Text>
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemId}>{item.id}</Text>
                      </View>
                    </View>
                    <View style={styles.itemRight}>
                      <Text style={styles.itemPrice}>${item.price}</Text>
                      <Pressable
                        onPress={() => handleRemove(item)}
                        style={({pressed}) => [
                          styles.deleteBtn,
                          pressed && styles.deleteBtnPressed,
                        ]}>
                        <Text style={styles.deleteBtnIcon}>✕</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
                contentContainerStyle={styles.listContent}
                scrollEnabled={true}
              />

              {/* Summary */}
              <View style={styles.summary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>${totalPrice}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Shipping</Text>
                  <Text style={styles.summaryValue}>FREE</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>${totalPrice}</Text>
                </View>
              </View>
            </>
          )}

          {/* CTA Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleBuy}
              disabled={basket.length === 0}
              style={({pressed}) => [
                styles.buyButton,
                basket.length === 0 ? styles.buyButtonDisabled : null,
                pressed && !basket.length && {opacity: 0.6},
              ]}>
              <Text style={styles.buyButtonLabel}>
                {basket.length === 0 ? '✕ Basket Empty' : '✅ Checkout'}
              </Text>
            </Pressable>
            {basket.length > 0 && (
              <Pressable
                onPress={() =>
                  Alert.alert('Clear Basket?', 'Remove all items?', [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'Clear',
                      style: 'destructive',
                      onPress: clearBasket,
                    },
                  ])
                }
                style={({pressed}) => [
                  styles.clearButton,
                  pressed && styles.clearButtonPressed,
                ]}>
                <Text style={styles.clearButtonLabel}>Clear Basket</Text>
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: 13,
    color: '#E0E7FF',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#E0E7FF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 16,
  },
  itemCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0891B2',
    backgroundColor: 'rgba(8, 145, 178, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 32,
    textAlign: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  itemId: {
    fontSize: 11,
    color: '#999999',
    marginTop: 2,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0891B2',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 67, 67, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnPressed: {
    backgroundColor: 'rgba(255, 67, 67, 0.2)',
  },
  deleteBtnIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4343',
  },
  summary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#E0E7FF',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 2,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 4,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  totalLabel: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 18,
    color: '#0FF7FF',
    fontWeight: '800',
  },
  buttonContainer: {
    gap: 10,
  },
  buyButton: {
    backgroundColor: '#0891B2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0891B2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buyButtonDisabled: {
    backgroundColor: 'rgba(8, 145, 178, 0.5)',
    shadowOpacity: 0.1,
  },
  buyButtonLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  clearButton: {
    backgroundColor: 'rgba(255, 67, 67, 0.15)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 67, 67, 0.4)',
  },
  clearButtonPressed: {
    backgroundColor: 'rgba(255, 67, 67, 0.25)',
  },
  clearButtonLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FF6B6B',
  },
});

export default BasketScreen;
