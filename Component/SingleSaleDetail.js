import React from 'react'
import { View, FlatList , Text,Dimensions,StyleSheet } from 'react-native'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class CartDetail extends React.Component{ 

    constructor(props){ 
        super(props)
        this.state = {
            cart : this.props.route.params.item,

        }
        console.log(this.state.cart)
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 16, 
        margin : 8,
        padding: 8,
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