import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  Snackbar,
} from 'react-native-paper';
import {useBasket} from '../components/BasketContext';

const {height} = Dimensions.get('window');

const BasketScreen = () => {
  const {basket, clearBasket, removeFromBasket} = useBasket();
  const [visibleSnackbar, setVisibleSnackbar] = React.useState(false);

  const totalPrice = basket.reduce(
    (sum: any, item: any) => sum + (item.price || 0),
    0,
  );

  const handleBuy = () => {
    Alert.alert(
      '🎉 Purchase Successful!',
      `You purchased ${basket.length} carpet${basket.length !== 1 ? 's' : ''} worth $${totalPrice}`,
      [
        {
          text: 'Continue Shopping',
          onPress: () => {
            clearBasket();
            setVisibleSnackbar(true);
          },
        },
      ],
    );
  };

  const handleRemove = (item: any) => {
    removeFromBasket(item);
    setVisibleSnackbar(true);
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.container}
      blurRadius={2}>
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Your Basket</Text>
          <View style={styles.itemCount}>
            <Text style={styles.itemCountText}>
              {basket.length} item{basket.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Empty State */}
        {basket.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your basket is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add carpets to get started with your AR shopping experience
            </Text>
          </View>
        ) : (
          <>
            {/* Basket Items List */}
            <FlatList
              data={basket}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={({item}) => (
                <Card style={styles.basketItem}>
                  <Card.Content style={styles.itemContent}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name || item.id}</Text>
                      <Text style={styles.itemPrice}>${item.price}</Text>
                    </View>
                    <IconButton
                      icon="trash-can-outline"
                      size={20}
                      iconColor="#A84000"
                      onPress={() => handleRemove(item)}
                      style={styles.deleteButton}
                    />
                  </Card.Content>
                </Card>
              )}
              scrollEnabled={true}
              contentContainerStyle={styles.listContent}
              style={{flex: 1}}
            />

            {/* Summary Section */}
            <View style={styles.summarySection}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${totalPrice}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>Free</Text>
              </View>
              <Divider style={styles.summaryDivider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${totalPrice}</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <Button
                mode="contained"
                onPress={handleBuy}
                style={styles.checkoutButton}
                labelStyle={styles.checkoutLabel}>
                Proceed to Checkout
              </Button>
              <Button
                mode="outlined"
                onPress={clearBasket}
                style={styles.clearButton}
                labelStyle={styles.clearLabel}
                textColor="#A84000">
                Clear Basket
              </Button>
            </View>
          </>
        )}

        {/* Snackbar */}
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          duration={2000}>
          Item removed from basket
        </Snackbar>
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
    padding: 16,
  },
  headerSection: {
    paddingVertical: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  itemCount: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 12,
  },
  basketItem: {
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C5F8D',
  },
  deleteButton: {
    margin: 0,
  },
  summarySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#E0E0E0',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  summaryDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFD700',
  },
  actionContainer: {
    gap: 12,
  },
  checkoutButton: {
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#2C5F8D',
  },
  checkoutLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  clearButton: {
    paddingVertical: 4,
    borderRadius: 12,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  clearLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});
export default BasketScreen;