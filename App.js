
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
import alertDAO from './LocalStorage/AlertDAO'
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const HOME_SCREEN = "home"
export const NEW_ITEM_SCREEN = "NewItem"
export const LIST_ITEM_SCREEN = "List Items"
export const NEM_ITEM_ENTRY_SCREEN = "New Item Entry"
export const ITEM_DETAILS_SCREEN = "Item Details"
export const NEW_SALE_SCREEN = "New Sale"
export const ALL_SALE_SCREEN = "All Sales"
export const SINGLE_SALE_SCREEN = "Single Sale Detail"

import Icon from 'react-native-vector-icons/FontAwesome'


const App: () => React$Node = () => {
 let header = null 
 alertDAO.getData().then((values)=>{
   if(values !== null  ){
    header =  <Icon
    onPress={() => console.log('ok')}
    name='exclamation-circle'
    size={32} color="#c0392b"
    style={{ marginEnd: 16}}
   />
   }
 })
 /*
*/

  return (
    <NavigationContainer> 
      <Stack.Navigator>
              <Stack.Screen name= {HOME_SCREEN} component={HomeComponent}  options={{
              
          headerRight: () => (
           header
         
          )
        }} />
   
              <Stack.Screen name={LIST_ITEM_SCREEN} component={ItemList} />
              <Stack.Screen name={NEW_ITEM_SCREEN} component={NewProduct} />
              <Stack.Screen name={ITEM_DETAILS_SCREEN} component={ItemDetail} />
              <Stack.Screen name={NEW_SALE_SCREEN} component={NewSalesComponent} />
              <Stack.Screen name={ALL_SALE_SCREEN} component={ListSales} />
              <Stack.Screen name={SINGLE_SALE_SCREEN} component={CartDetail} />
              
      </Stack.Navigator>
  </NavigationContainer>
 
  );
};

const styles = StyleSheet.create({});


export default App;
