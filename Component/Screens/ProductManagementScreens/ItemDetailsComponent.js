import React from 'react'
import { View,Text, Button,StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import productDao from  '../../../LocalStorage/ProductDAO';
import { LIST_ITEM_SCREEN } from '../../../App'
export default class ItemDetail extends React.Component { 

    constructor(props){ 
        super(props)
        this.state = { 
            product : this.props.route.params.item
        }
        console.log(this.props.route.params.item)
        this.delete_item = this.delete_item.bind(this)
        this.update_item = this.update_item.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changePrice = this.changePrice.bind(this)
        this.changeQuantity = this.changeQuantity.bind(this)
        this.changeLowQuantity= this.changeLowQuantity.bind(this)
    }

    delete_item ( ){
        productDao.remove_item(this.props.route.params.item).then((val)=>  this.props.navigation.navigate(LIST_ITEM_SCREEN))
    }
    update_item(){ 
        productDao.update_item(this.state.product).then(this.props.navigation.navigate(LIST_ITEM_SCREEN))
    }
    changeName  (text ){ 
        this.setState({
            product: { 
                product_barcode: this.state.product.product_barcode, 
                product_name : text, 
                product_price : this.state.product.product_price,
                product_quantity : this.state.product.product_quantity,
                product_low_quantity : this.state.product.product_low_quantity
            }
        })
    }
    
    changePrice  (text ){ 
        this.setState({
            product: { 
                product_barcode: this.state.product.product_barcode, 
                product_name : this.state.product.product_name, 
                product_price : parseFloat(text),
                product_quantity : this.state.product.product_quantity,
                product_low_quantity : this.state.product.product_low_quantity
            }
        })
    }
    
    changeQuantity  (text ){ 
        this.setState({
            product: { 
                product_barcode: this.state.product.product_barcode, 
                product_name : this.state.product.product_name, 
                product_price : this.state.product.product_price,
                product_quantity : parseInt(text),
                product_low_quantity : this.state.product.product_low_quantity
            }
        })
    }
    
    changeLowQuantity  (text ){ 
        this.setState({
            product: { 
                product_barcode: this.state.product.product_barcode, 
                product_name : this.state.product.product_name,  
                product_price : this.state.product.product_price,
                product_quantity : this.state.product.product_quantity,
                product_low_quantity : parseInt(text)
            }
        })
    }
    render( ){ 
        return ( 
            <View style={ style.container}>
                <View style= { style.detailsLine}>
                <Text>Barcode : </Text>
                <Text style={{ color:"#d35400"}} >{this.state.product.product_barcode} </Text>
                </View>

                <View style= { style.detailsLine}>
                <Text style={{marginTop:12 }} >Produit : </Text>
                <TextInput   style={style.input_text} onSubmitEditing={(text)=>{this.changeName(text.nativeEvent.text)}}>{this.state.product.product_name}</TextInput>
                </View>
                
                <View style= { style.detailsLine}>
                <Text style={{marginTop:12 }} >Price : </Text>
                <TextInput multiline={false} style={ style.input_text} onSubmitEditing={(text)=>{this.changePrice(text.nativeEvent.text)} }>{this.state.product.product_price}</TextInput>
                </View>
                
                <View style= { style.detailsLine}>
                <Text style={{marginTop:12 }} >Quantité : </Text>
                <TextInput multiline={false} style={ style.input_text} onSubmitEditing={(text)=>{this.changeQuantity(text.nativeEvent.text)}}>{this.state.product.product_quantity} </TextInput>
                </View>
                <View style= { style.detailsLine}>
                <Text style={{marginTop:12 }} >Alerte quantité faible: </Text>
                <TextInput multiline={false} style={ style.input_text}  onSubmitEditing={(text)=>{this.changeLowQuantity(text.nativeEvent.text)}}>{this.state.product.product_low_quantity}</TextInput>
                </View>
                <View style={{ marginBottom: 8, marginTop: 8 }}><Button title= "Mettre à jours les infos" color='#2980b9' onPress={this.update_item}></Button></View>
                <View style={{ marginBottom: 8, marginTop: 8 }}><Button title= "Supprimer Produit" color='#c0392b' onPress={this.delete_item} style={{ marginBottom: 8, marginTop: 8 }}></Button>
                </View>
            </View>

        )
    }
}

const style = StyleSheet.create ({

    container : { 
            flex: 1 , 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            alignItems : 'stretch',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
            borderColor: '#000', 
            margin: 16
    },detailsLine : { 
        flex: 1 , 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems:'baseline',
        margin: 8, 
        padding: 8, 

    },input_text :{
        flex:1,
        borderBottomColor : '#27ae60',
        borderBottomWidth: 1,
        height: 40,
        marginEnd: 8, 
        marginStart: 16,
        paddingBottom: 8,
        paddingTop: 8
     }

})