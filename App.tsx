<<<<<<< HEAD
=======
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

>>>>>>> Initial commit of migrated CarpetFitAR project
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
<<<<<<< HEAD
  Provider as PaperProvider,
  Appbar,
  Button,
<<<<<<< HEAD
  Text,
  MD3LightTheme,
} from 'react-native-paper';
import {View, StyleSheet, ImageBackground, ScrollView} from 'react-native';
=======
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import {View, StyleSheet, ImageBackground} from 'react-native';
>>>>>>> origin/master
=======
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
  SafeAreaView,
} from 'react-native';
>>>>>>> Initial commit of migrated CarpetFitAR project
import ARCarpetViewer from './components/ARCarpetViewer';
import CarpetSelectionScreen from './components/CarpetSelectionScreen';
import {BasketProvider} from './components/BasketContext';
import BasketScreen from './screens/BasketScreen';

const Stack = createNativeStackNavigator();

<<<<<<< HEAD
<<<<<<< HEAD
// Modern Material Design 3 theme
const appTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2C5F8D',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D4E4FF',
    onPrimaryContainer: '#001B3F',
    secondary: '#A84000',
    onSecondary: '#FFFFFF',
    tertiary: '#155E3F',
    onTertiary: '#FFFFFF',
    background: '#FFFBFE',
    surface: '#FFFBFE',
    surfaceVariant: '#E7E0EC',
  },
};

=======
>>>>>>> origin/master
const HomeScreen = ({navigation}: any) => (
  <ImageBackground
    source={require('./assets/images/background.jpeg')}
    style={styles.container}
    blurRadius={1}>
    <View style={styles.overlay}>
<<<<<<< HEAD
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.homeContent}>
          <Text style={styles.mainTitle}>CarpetVision</Text>
          <Text style={styles.tagline}>Discover your perfect carpet in augmented reality</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📐</Text>
              <Text style={styles.featureText}>Real-size preview</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎨</Text>
              <Text style={styles.featureText}>Authentic colors</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🛒</Text>
              <Text style={styles.featureText}>Easy checkout</Text>
            </View>
          </View>

          <Button
            mode="contained"
        <Card.Content>
          <Title style={styles.title}>CarpetVision</Title>
          <Paragraph style={styles.subtitle}>
            Visualize carpets in your space with augmented reality
              <Text style={styles.emoji}>🏠</Text>
              <Text style={styles.title} className="text-white text-center font-extrabold">
                CarpetVision
              </Text>
              <Text style={styles.subtitle} className="text-center text-slate-200">
                Visualize perfect carpets in your space before you buy
              </Text>
                <Text style={styles.buttonLabel} className="font-bold text-white">Start AR Experience</Text>
                <Text style={styles.buttonIcon}> →</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
>>>>>>> Initial commit of migrated CarpetFitAR project
  </ImageBackground>
);

const App = () => {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <PaperProvider theme={appTheme}>
      <BasketProvider>
        <NavigationContainer>
          <Stack.Navigator>
=======
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
>>>>>>> origin/master
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
<<<<<<< HEAD
              name="CarpetSelection"
              component={CarpetSelectionScreen}
              options={{title: 'Select a Carpet'}}
            />
=======
              name="Basket"
              component={BasketScreen}
              options={{title: 'Your Basket'}}
            />
            <Stack.Screen
              name="CarpetSelection"
              component={CarpetSelectionScreen}
              options={{title: 'Select Carpet'}}
            />

>>>>>>> origin/master
            <Stack.Screen
              name="ARCarpet"
              component={ARCarpetViewer}
              options={{title: 'AR Viewer'}}
            />
<<<<<<< HEAD
            <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{title: 'Your Basket'}}
            />
=======
>>>>>>> origin/master
          </Stack.Navigator>
        </NavigationContainer>
      </BasketProvider>
    </PaperProvider>
=======
    <BasketProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: 'CarpetVision',
            headerStyle: {
              backgroundColor: '#075985',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{title: '🛒 Your Basket'}}
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
>>>>>>> Initial commit of migrated CarpetFitAR project
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
=======
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
>>>>>>> Initial commit of migrated CarpetFitAR project
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
<<<<<<< HEAD
<<<<<<< HEAD
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  homeContent: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: '#E8E8E8',
    fontWeight: '400',
    lineHeight: 24,
  },
  featuresList: {
    width: '100%',
    marginBottom: 32,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2C5F8D',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
  },
  ctaButton: {
    width: '100%',
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#2C5F8D',
  },
  ctaLabel: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
    paddingVertical: 4,  },
});

export default App;
=======
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
=======
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  heroCard: {
    backgroundColor: 'rgba(12, 61, 102, 0.85)',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
    color: '#fff',
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 15,
    color: '#e0e7ff',
    lineHeight: 22,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
    gap: 8,
  },
  featurePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  pillEmoji: {
    fontSize: 16,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: '#0ea5e9',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#0284c7',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonPressed: {
    backgroundColor: '#0284c7',
    transform: [{scale: 0.98}],
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  buttonIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 4,
>>>>>>> Initial commit of migrated CarpetFitAR project
  },
});

export default App;
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> Initial commit of migrated CarpetFitAR project
