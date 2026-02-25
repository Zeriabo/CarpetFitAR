import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
  Pressable,
} from 'react-native';
import {useBasket} from '../components/BasketContext';

const BasketScreen = () => {
  const {basket, clearBasket, removeFromBasket} = useBasket();

  const handleBuy = () => {
    Alert.alert('Purchase Successful', `You bought ${basket.length} carpets!`);
    clearBasket();
  };
  const totalPrice = basket.reduce(
    (sum: any, item: any) => sum + item.price,
    0,
  );

  function handleRemove(item: any): void {
    removeFromBasket(item);
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.container}
      blurRadius={1}>
      <View style={styles.container}>
        {/* 🛒 Title section */}
        <View style={styles.header}>
          <Text style={styles.title}>🛒 Basket</Text>
          <Text style={styles.subtitle}>
            {basket.length} item{basket.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <View style={styles.divider} />

        {basket.length === 0 ? (
          <Text style={styles.emptyText}>Your basket is empty.</Text>
        ) : (
          <FlatList
            data={basket}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.itemText}>
                    {item.id} - ${item.price}
                  </Text>
                  <Pressable
                    onPress={() => handleRemove(item)}
                    style={styles.deleteButton}>
                    <Text style={styles.deleteButtonLabel}>🗑️</Text>
                  </Pressable>
                </View>
              </View>
            )}
            contentContainerStyle={{paddingBottom: 20}}
          />
        )}
        <Text style={{textAlign: 'center', fontSize: 16, marginVertical: 10}}>
          Total: ${totalPrice}
        </Text>

        <Pressable
          onPress={handleBuy}
          disabled={basket.length === 0}
          style={[
            styles.buyButton,
            basket.length === 0 ? styles.buyButtonDisabled : null,
          ]}>
          <Text style={styles.buyButtonLabel}>Buy Now</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f9f9f9'},
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    width: '60%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: '#999',
  },
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  deleteButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  deleteButtonLabel: {fontSize: 18, color: '#ff4444'},
  buyButton: {
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: 'silver',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyButtonDisabled: {
    opacity: 0.5,
  },
  buyButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default BasketScreen;
