import React, { Component } from 'react'
import {View, Text, Button,Dimensions,StyleSheet,Alert} from 'react-native'
import { RNCamera } from 'react-native-camera';
import { FlatList, ScrollView, TextInput,TouchableOpacity } from 'react-native-gesture-handler';
import ScanCodeModal from './Modal/ScanCodeModal'
import productDao from '../LocalStorage/ProductDAO'
import cartDAO from '../LocalStorage/CartDAO';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class NewSalesComponent extends Component { 

        constructor(props){ 
            super (props)
            this.state = { 
               
                    modal_visible: false,
                    cart : {
                        total_to_pay: 0,
                        day: null ,
                        month: null ,
                        year: null, 
                        is_paid: false, 
                        customer_name: null , 
                        id: Math.random(),
                        product: [] 
                    },
                    last_scanned_barcode: null,
                    product_name: null,
                    product_quantity: null, 
                    product_price: null,
                    total: null
                
            }
            this.callbackFunction = this.callbackFunction.bind(this)
            this.calculateTotal = this.calculateTotal.bind(this)
            this.add_product_to_cart = this.add_product_to_cart.bind(this)
            this.presisit_data = this.presisit_data.bind(this)
        }

      
        callbackFunction = (childData) => {
            //this.setState({message: childData})
       
            productDao.findItemByBarCode(childData).then((value) => {
                if(value !== undefined){    
                    this.setState({
                            last_scanned_barcode : childData, 
                            product_name : value.product_name, 
                            product_price : value.product_price
                    })
          
                }else { 
                    Alert.alert('Produit non disponible dans la base des produits.')
                }
            })
      }


      calculateTotal(e){ 
          this.setState({ 
             product_quantity : e , 
             total : (this.state.product_price * e)
          })
      }

      presisit_data ( ){
        if(this.state.cart.product.length >= 1){
    
            cartDAO.storeData(this.state.cart).then( this.props.navigation.navigate('Home') )
        }else {
            Alert.alert("Impossible d'enregister une caisse vide ")
        }
    }
      
      add_product_to_cart(){
          if(this.state.total !== null){ 
          var array_to_state = this.state.cart.product.concat({
            product_name: this.state.product_name, 
            product_barcode: this.state.last_scanned_barcode,
            product_price: this.state.product_price,
            product_quantity: this.state.product_quantity,
            product_total_price : this.state.total
            })
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var f = parseFloat(this.state.cart.total_to_pay + this.state.total)
            this.setState({
                total : null, 
                last_scanned_barcode: null,
                product_name: null,
                product_quantity: null, 
                product_price: null,
                
                cart: {
                    day: dd, 
                    month : mm ,
                    year: yyyy, 
                    total_to_pay : f,
                    product : array_to_state,
                    id: this.state.cart.id,
                }
            });
        }else { 
            Alert.alert("Aucun produit n'a été scanné ")
        }
      }
        render(){ 
            return (
      
                    <View style={ styles.container}>
                            <View style={{ flex:1, alignContent:'center' ,alignSelf:'baseline', marginEnd:16}}> 
                                    <ScanCodeModal
                                    modal_visibile = { this.state.modal_visible}
                                    parentCallback = {this.callbackFunction}
                                    />
                                </View>
                 
                        <View style={{ flex:4}}>
                                <FlatList
                                    style = {{
                                        paddingBottom: 0, 
                                        marginBottom: 0,         
                                    }}
                                    ListHeaderComponent ={ 
                                        <>
                                        <View style= {styles.card_style}> 
                                            <Text > Valeur total des achats :  <Text style={{color:'#c0392b'}}>{this.state.cart.total_to_pay}</Text></Text>
                                            <Text style={{ marginBottom: 8, marginTop: 8}}>Barcode :<Text style={{color:'#c0392b'}}>{this.state.last_scanned_barcode}</Text></Text>
                                            <Text style={{ marginBottom: 8, marginTop: 8}}> Produit : {this.state.product_name}</Text> 
                                            <Text style={{ marginBottom: 8, marginTop: 8}}> Prix unitaire : {this.state.product_price}</Text> 
                                            <TextInput placeholder="Quantité" keyboardType="numeric" onChangeText={(e)=>this.calculateTotal(e)}/>
                                            <Text style={{ marginBottom: 8, marginTop: 8}}> Total : {this.state.total}</Text> 
                                            <Button title='Confirmer' onPress={ this.add_product_to_cart } color='#27ae60'/>
                                            <Button title='Valider Caisse' onPress={ this.presisit_data } color='#2980b9' />
                                            <Button title='Annuler' onPress={ this.add_product_to_cart } color='#e74c3c' />
                                        </View>
                                        </>
                                    }
                                    data= {this.state.cart.product}
                                    renderItem= {({item}) => (
                                        <View style ={ styles.singleItemList}>
                                            <TouchableOpacity onPress={()=>this.itemPressed(item) } >
                                                <Text>{item.product_name}</Text>
                                                <View style ={ styles.singleItemDetails}>
                                                    <Text>Prix : {item.product_price}</Text>
                                                    <Text>Quantité : {item.product_quantity}</Text>
                                                    <Text>Total ligne : {item.product_total_price}</Text>
                                                </View>
                                    
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor= { item => item.product_barcode ? item.product_barcode.toString(): null}
                                    >                         
                                </FlatList>
                            </View>
                    </View> 
  

            )
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      flexShrink: 1, 
       
        width :windowWidth , 
        height: windowHeight,
        padding:8,
    },
    preview: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    capture: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 0,
      margin: 0,
      paddingHorizontal: 20,
      alignSelf: 'center',
     
    }, card_style : { 
        flex: 4,
        backgroundColor:  '#ecf0f1',
        alignContent:'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 16, 
        margin : 8,
        padding: 8,
    },singleItemList :{
        padding: 16, 
        margin: 8 ,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        flex: 1 , 
        borderColor: '#000', 

    },singleItemDetails :{
        paddingLeft: 8, 
        paddingEnd: 8, 
        paddingRight: 8, 
        paddingStart: 8, 
        flex: 1 , 
  
    }
  });
/*
cart = {
    total_to_pay :  , 
    date: , 
    product[{

    }]

}*/