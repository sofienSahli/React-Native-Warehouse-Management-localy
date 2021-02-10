
import React from 'react';
import {StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import  HomeComponent  from "./Component/HomeComponent";
import SplashScreenComponent from './Component/SplashScreenComponent'

import ItemList from './Component/ProductListItem'
import ItemDetail from './Component/ItemDetailsComponent'
import NewProduct from './Component/NewItemComponent'
import NewSalesComponent from './Component/NewSalesComponent'
import ListSales from './Component/ListSales'
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const App: () => React$Node = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeComponent} />
              <Stack.Screen name="NewItem" component={SplashScreenComponent} />
              <Stack.Screen name="List Items" component={ItemList} />
              <Stack.Screen name="New Item Entry" component={NewProduct} />
              <Stack.Screen name="Item Details" component={ItemDetail} />
              <Stack.Screen name="New Sale" component={NewSalesComponent} />
              <Stack.Screen name="All Sales" component={ListSales} />
              
      </Stack.Navigator>
  </NavigationContainer>
 
  );
};

const styles = StyleSheet.create({});


export default App;
