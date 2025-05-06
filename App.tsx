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

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}: any) => (
  <ImageBackground
    source={require('./assets/images/background.jpeg')}
    style={styles.container}
    blurRadius={1}>
    <View style={styles.overlay}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>CarpetVision AR</Title>
          <Paragraph style={styles.subtitle}>
            Visualize carpets in your space with augmented reality
          </Paragraph>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CarpetSelection')}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            icon="augmented-reality">
            Start AR Experience
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.features}>
        {['📏 Perfect Fit', '🎨 Color Match', '🛒 Shop Direct'].map(feature => (
          <Card key={feature} style={styles.featureCard}>
            <Card.Content style={styles.featureContent}>
              <Paragraph>{feature}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  </ImageBackground>
);

const App = () => {
  return (
    <PaperProvider>
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
  card: {
    borderRadius: 12,
    elevation: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
  },
  button: {
    marginVertical: 16,
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: '#6200ee',
  },
  buttonLabel: {
    fontSize: 16,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  featureCard: {
    width: '30%',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  featureContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
});

export default App;
