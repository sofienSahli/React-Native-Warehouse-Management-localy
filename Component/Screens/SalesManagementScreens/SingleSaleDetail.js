import React from 'react'
import { View, FlatList , Text,Dimensions,StyleSheet,TextInput } from 'react-native'

import { Switch } from 'react-native-gesture-handler';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class CartDetail extends React.Component{ 

    constructor(props){ 
        super(props)
        this.state = {
            cart : this.props.route.params.item,

        }
        console.log(this.state.cart)
        this.toggleSwitch = this.toggleSwitch.bind(this)
    }

    componentDidMount(){ }

    render(){ 
        return ( 
            <View styles={ StyleSheet.container}>
                   <FlatList
                    style = {{
                        paddingBottom: 0, 
                        marginBottom: 0,         
                    }}
                    ListHeaderComponent ={ 
                        <>
                        <View style= {styles.card_style}> 
                            <View style={ styles.card_line}>
                                <TextInput placeholder="Libelle de vente" value={this.state.cart.cart_libelle}></TextInput>
                                
                            </View>
                            <View style={styles.card_line}> 
                                <Text>Prix total des achats :</Text>
                                <Text style={{ color: '#27ae60'}}>{this.state.cart.total_to_pay} </Text>
                            </View>
                            <View style={styles.card_line}>
                                <Text> Is paid</Text>
                                <Switch trackColor={{ false: "#c0392b", true: "#27ae60" }} 
                                           onValueChange={this.toggleSwitch}    value={this.state.cart.is_paid} enabled={true}></Switch>
                            </View>
                        </View>
                        </>
                    }
                    data= { this.state.cart.product}
                    renderItem= {({item}) => (
                        <View style ={ styles.singleItemList}>
                                <View style ={ styles.singleItemDetails}>
                                    <Text>Libelle : <Text style={{color: '#d35400'}}>{item.product_name}</Text></Text>
                                    <Text>Barcode : {item.product_barcode}</Text>
                                    <Text>Prix unitaire : <Text style={{color: '#27ae60'}}>{item.product_price}</Text></Text>
                                    <Text>Quantité acheté :<Text style={{color: '#2c3e50'}}>{item.product_quantity}</Text></Text>
                                    <Text>Prix de la ligne :<Text style={{color: '#2c3e50'}}>{item.product_total_price}</Text></Text>
                                </View>
                             
                        </View>
                    )}
                    keyExtractor= { item => item.product_barcode ? item.product_barcode.toString(): null}
                    >                         
                </FlatList>
            </View>


        )
    }
    toggleSwitch(){ 
        //console.log(this.state.cart)
        let cart_temp = this.props.route.params.item
        cart_temp.is_paid = !cart_temp.is_paid
        this.setState({
            cart: cart_temp
        })

    
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
    singleItemList :{
        padding: 16, 
        margin: 8 ,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        flex: 1 , 
        borderColor: '#000',  
       alignContent:'space-between',
       

    },singleItemDetails :{
        paddingLeft: 8, 
        paddingEnd: 8, 
        paddingRight: 8, 
        paddingStart: 8, 
        flex: 1 , 
  
    }, card_style : { 
        flex: 4,
        backgroundColor:  '#ecf0f1',
        alignContent:'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column',
        margin : 0,
        width : windowWidth, 
        padding: 16,
    },card_line : {
        flex: 1 , 
        alignContent:'center',
        justifyContent: 'space-between',
        flexDirection:'row', 
        paddingStart: 8 , 
        paddingEnd: 8, 
        marginTop: 8 , 
        marginBottom : 8 
    }
})