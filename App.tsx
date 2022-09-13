import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CountryDetails from './Components/CountryDetails';
import Home from './Components/Home';
import WeatherCheck from './Components/WeatherCheck';


const App:React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='CountryDetails' component={CountryDetails} />
          <Stack.Screen name='WeatherCheck' component={WeatherCheck} />
         </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
