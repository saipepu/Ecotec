import { StyleSheet } from 'react-native';
import color from './theme/colors';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './Page/Welcome';
import Home from './Page/Home';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from './Page/Restaurants';
import RestaurantMenu from './Page/RestaurantMenu';
import Cart from './Page/Cart';
import { useState } from 'react';
import AppStateContext from './hook/AppStateContext';
import ChiefProfile from './Page/ChiefProfile';
import CreateMenu from './Page/CreateMenu';

export default function App() {

  const [contextRestaurant, setContextRestaurant] = useState({})

  const updateContextRestaurant = r => {
    setContextRestaurant(r)
  }

  const contextValue = {
    contextRestaurant: contextRestaurant,
    updateContextRestaurant: updateContextRestaurant
  }

  const Stack = createStackNavigator()

  return (
    <>
    <AppStateContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={"Welcome"}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurants" component={Restaurants} />
          <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="ChiefProfile" component={ChiefProfile} />
          <Stack.Screen name="CreateMenu" component={CreateMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: color.primary
  }
});
