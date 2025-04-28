import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Button} from 'react-native';
import ARCarpetViewer from './components/ARCarpetViewer';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}: any) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Welcome to CarpetFit</Text>
    <Button
      title="Try Carpet in Room"
      onPress={() => navigation.navigate('ARCarpet')}
    />
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ARCarpet" component={ARCarpetViewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
