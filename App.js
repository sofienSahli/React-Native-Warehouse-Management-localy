
import React from 'react';
import {StyleSheet,Text} from 'react-native';
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
import StatsMainScreen from './Component/Screens/Stats/StatsMainScreen'
import productDao from './LocalStorage/ProductDAO'
export const HOME_SCREEN = "Dashboard"
export const NEW_ITEM_SCREEN = "Nouveau produit"
export const LIST_ITEM_SCREEN = "Produit en stock"
export const NEM_ITEM_ENTRY_SCREEN = "New Item Entry"
export const ITEM_DETAILS_SCREEN = "Detaille"
export const NEW_SALE_SCREEN = "Caisse"
export const ALL_SALE_SCREEN = "Ventes"
export const SINGLE_SALE_SCREEN = "Single Sale Detail"
export const SPLASH_SCREEN = "Splash Screen"
export const STAT_SCREEN = "Stats"

import Icon from 'react-native-vector-icons/FontAwesome'



const Stack = createStackNavigator();
//const Tab = createMaterialBottomTabNavigator();
function home (){ 

  return(<Stack.Navigator>

<Stack.Screen name= {HOME_SCREEN} component={HomeComponent} options={  {
    title: HOME_SCREEN,
    headerLeft: null
}}  />
   
              <Stack.Screen name={LIST_ITEM_SCREEN} component={ItemList} />
              <Stack.Screen name={NEW_ITEM_SCREEN} component={NewProduct} />
              <Stack.Screen name={ITEM_DETAILS_SCREEN} component={ItemDetail} />
              <Stack.Screen name={NEW_SALE_SCREEN} component={NewSalesComponent} />
              <Stack.Screen name={ALL_SALE_SCREEN} component={ListSales} />
              <Stack.Screen name={SINGLE_SALE_SCREEN} component={CartDetail} />
              <Stack.Screen name={STAT_SCREEN} component={StatsMainScreen} />

  </Stack.Navigator>)
}


const App: () => React$Node = () => {

 /*
*/

  return (
    <NavigationContainer> 
      <Stack.Navigator   screenOptions={{
    headerShown: false
  }}>
              <Stack.Screen name ={SPLASH_SCREEN} component={SplashScreenComponent} />
              <Stack.Screen name ={HOME_SCREEN} component={home} />
              
      </Stack.Navigator>
  </NavigationContainer>
 
  );
};

const styles = StyleSheet.create({});


export default App;
