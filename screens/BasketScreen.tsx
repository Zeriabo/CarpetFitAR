import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import {Button, Card, Divider, IconButton} from 'react-native-paper';
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
        <Divider style={styles.divider} />

        {basket.length === 0 ? (
          <Text style={styles.emptyText}>Your basket is empty.</Text>
        ) : (
          <FlatList
            data={basket}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
              <Card mode="elevated" style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.itemText}>
                    {item.id} - ${item.price}
                  </Text>
                  <IconButton
                    icon="delete-outline"
                    size={20}
                    onPress={() => removeFromBasket(item)}
                    style={styles.removeButton}
                    iconColor="#ff4444"
                  />
                </Card.Content>
              </Card>
            )}
            contentContainerStyle={{paddingBottom: 20}}
          />
        )}
        <Text style={{textAlign: 'center', fontSize: 16, marginVertical: 10}}>
          Total: ${totalPrice}
        </Text>

        <Button
          mode="contained-tonal"
          onPress={handleBuy}
          disabled={basket.length === 0}
          style={styles.buyButton}
          labelStyle={styles.buyButtonLabel}
          icon="cart-check">
          Buy Now
        </Button>
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
  removeButton: {
    marginLeft: 10,
  },
  buyButton: {
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: '#1a8cff',
  },
  buyButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default BasketScreen;
