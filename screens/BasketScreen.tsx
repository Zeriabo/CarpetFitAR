import React from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {useBasket} from '../components/BasketContext';

const BasketScreen = () => {
  const {basket, clearBasket, removeFromBasket} = useBasket();

  const handleBuy = () => {
    Alert.alert('Purchase Successful', `You bought ${basket.length} carpets!`);
    clearBasket();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Basket</Text>
      {basket.length === 0 ? (
        <Text style={styles.emptyText}>Your basket is empty.</Text>
      ) : (
        <FlatList
          data={basket}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={styles.itemText}>{item}</Text>
                <Button
                  mode="outlined"
                  onPress={() => removeFromBasket(item)}
                  style={styles.removeButton}
                  icon="delete">
                  Remove
                </Button>
              </Card.Content>
            </Card>
          )}
        />
      )}
      <Button
        mode="contained"
        onPress={handleBuy}
        disabled={basket.length === 0}
        style={styles.buyButton}
        icon="cart-check">
        Buy Now
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {textAlign: 'center', marginTop: 50, fontSize: 16},
  card: {marginVertical: 8},
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {fontSize: 16},
  removeButton: {marginLeft: 10},
  buyButton: {marginTop: 20, backgroundColor: '#6200ee'},
});

export default BasketScreen;
