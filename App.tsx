import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
  SafeAreaView,
} from 'react-native';
import ARCarpetViewer from './components/ARCarpetViewer';
import CarpetSelectionScreen from './components/CarpetSelectionScreen';
import {BasketProvider} from './components/BasketContext';
import BasketScreen from './screens/BasketScreen';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}: any) => (
  <ImageBackground
    source={require('./assets/images/background.jpeg')}
    style={styles.backgroundImage}
    blurRadius={1}>
    <SafeAreaView style={styles.safeArea} className="flex-1">
      <View style={styles.container} className="flex-1">
        <View style={styles.overlay} className="justify-center px-6">
          <View style={styles.content} className="flex-1 justify-center">
            {/* Hero Section */}
            <View style={styles.heroCard}>
              <Text style={styles.emoji}>🏠</Text>
              <Text style={styles.title} className="text-white text-center font-extrabold">
                CarpetVision
              </Text>
              <Text style={styles.subtitle} className="text-center text-slate-200">
                Visualize perfect carpets in your space before you buy
              </Text>
              
              {/* Feature Pills */}
              <View style={styles.features}>
                <View style={styles.featurePill}>
                  <Text style={styles.pillEmoji}>✨</Text>
                  <Text style={styles.pillText}>AR Preview</Text>
                </View>
                <View style={styles.featurePill}>
                  <Text style={styles.pillEmoji}>📏</Text>
                  <Text style={styles.pillText}>Real Size</Text>
                </View>
                <View style={styles.featurePill}>
                  <Text style={styles.pillEmoji}>🎨</Text>
                  <Text style={styles.pillText}>Colors</Text>
                </View>
              </View>

              {/* CTA Button */}
              <Pressable
                className="rounded-xl"
                onPress={() => navigation.navigate('CarpetSelection')}
                style={({pressed}) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}>
                <Text style={styles.buttonLabel} className="font-bold text-white">Start AR Experience</Text>
                <Text style={styles.buttonIcon}> →</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  </ImageBackground>
);

const App = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
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
  },
});

export default App;
