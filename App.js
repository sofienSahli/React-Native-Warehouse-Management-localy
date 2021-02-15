
import React from 'react';
import {StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import  HomeComponent  from "./Component/Screens/HomeComponent";
import SplashScreenComponent from './Component/SplashScreenComponent'

import ItemList from './Component/Screens/ProductManagementScreens/ProductListItem'
import ItemDetail from './Component/Screens/ProductManagementScreens/ItemDetailsComponent'
import NewProduct from './Component/Screens/ProductManagementScreens/NewItemComponent'
import NewSalesComponent from './Component/Screens/SalesManagementScreens/NewSalesComponent'
import ListSales from './Component/Screens/SalesManagementScreens/ListSales'
import CartDetail from './Component/Screens/SalesManagementScreens/SingleSaleDetail'
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
              <Stack.Screen name="Single Sale Detail" component={CartDetail} />
              
      </Stack.Navigator>
  </NavigationContainer>
 
  );
};

const styles = StyleSheet.create({});


export default App;
