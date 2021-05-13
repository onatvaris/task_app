import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import App from './Screens/App';
import MechanicsDetail from './Screens/MechanicsDetail';
import Search from './Screens/Search';

const Router = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen
          name="App"
          component={App}
          options={{
            headerTitle: 'Task App',
            headerTitleAlign: 'center',
            headerTintColor: '#f59e42',
          }}
        />
        <Stack.Screen
          name="Details"
          component={MechanicsDetail}
          options={({route}) => ({title: route.params.mechanicName})}
        />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
