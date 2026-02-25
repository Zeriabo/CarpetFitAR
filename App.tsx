import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
} from 'react-native';
import ARCarpetViewer from './components/ARCarpetViewer';
import CarpetSelectionScreen from './components/CarpetSelectionScreen';
import {BasketProvider} from './components/BasketContext';
import BasketScreen from './screens/BasketScreen';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}: any) => (
  <ImageBackground
    source={require('./assets/images/background.jpeg')}
    style={styles.container}
    blurRadius={1}>
    <View style={styles.overlay}>
      <View style={styles.heroCard}>
        <Text style={styles.title}>CarpetVision</Text>
        <Text style={styles.subtitle}>
          Visualize carpets in your space with augmented reality
        </Text>
        <Pressable
          onPress={() => navigation.navigate('CarpetSelection')}
          style={styles.button}>
          <Text style={styles.buttonLabel}>Start AR Experience</Text>
        </Pressable>
      </View>
    </View>
  </ImageBackground>
);

const App = () => {
  return (
    <BasketProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: 'CarpetVision',
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{title: 'Your Basket'}}
          />
          <Stack.Screen
            name="CarpetSelection"
            component={CarpetSelectionScreen}
            options={{title: 'Select Carpet'}}
          />
          <Stack.Screen
            name="ARCarpet"
            component={ARCarpetViewer}
            options={{title: 'AR Viewer'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BasketProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  heroCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 14,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: 'silver',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
