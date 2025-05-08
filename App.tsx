import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Provider as PaperProvider,
  Appbar,
  Button,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import {View, StyleSheet, ImageBackground} from 'react-native';
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
      <Card style={styles.transparentCard}>
        <Card.Content>
          <Title style={styles.title}>CarpetVision</Title>
          <Paragraph style={styles.subtitle}>
            Visualize carpets in your space with augmented reality
          </Paragraph>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CarpetSelection')}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            icon="cube-scan">
            Start AR Experience
          </Button>
        </Card.Content>
      </Card>
    </View>
  </ImageBackground>
);

const App = () => {
  return (
    <PaperProvider>
      <BasketProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              header: ({navigation}) => (
                <Appbar.Header>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title="CarpetVision" />
                </Appbar.Header>
              ),
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
    </PaperProvider>
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
  transparentCard: {
    backgroundColor: 'transparent',
    elevation: 0,
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
    marginVertical: 16,
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: 'silver',
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default App;
