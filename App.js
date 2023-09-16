import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import color from './theme/colors';
import Welcome from './Page/Welcome';
import Home from './Page/Home';
import Restaurants from './Page/Restaurants';
import RestaurantMenu from './Page/RestaurantMenu';
import Cart from './Page/Cart';
import AppStateContext from './hook/AppStateContext';
import ChefProfile from './Page/ChefProfile';
import CreateMenu from './Page/FormPage/CreateMenu';
import UserProfile from './Page/UserProfile';
import SignUp from './Page/FormPage/SignUp';
import SignIn from './Page/FormPage/SignIn';
import CreateRestaurant from './Page/FormPage/CreateRestaurant';
import Store from './Page/Store';

export default function App() {

  const [contextRestaurant, setContextRestaurant] = useState({})
  const [contextCurrentTab, setContextCurrentTab] = useState('Home')
  const [contextCart, setContextCart] = useState({})
  const [contextCurrentUser, setContextCurrentUser] = useState()
  const [contextRole, setContextRole] = useState('Customer')

  const updateContextRestaurant = r => {
    setContextRestaurant(r)
  }
  const updateContextCurrentTab = r => {
    setContextCurrentTab(r)
  }
  const contextValue = {
    contextRestaurant: contextRestaurant,
    updateContextRestaurant: updateContextRestaurant,
    contextCurrentTab: contextCurrentTab,
    updateContextCurrentTab: updateContextCurrentTab,
    contextCart: contextCart,
    setContextCart: setContextCart,
    contextCurrentUser: contextCurrentUser,
    setContextCurrentUser: setContextCurrentUser,
    contextRole: contextRole,
    setContextRole: setContextRole,
  }

  const Stack = createStackNavigator()

  return (
    <>
    <AppStateContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress
              }
            })
          }}
          initialRouteName={"Welcome"}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurants" component={Restaurants} />
          <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="ChefProfile" component={ChefProfile} />
          <Stack.Screen name="CreateMenu" component={CreateMenu} />
          <Stack.Screen name="CreateRestaurant" component={CreateRestaurant} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="Store" component={Store} />
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
