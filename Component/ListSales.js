import React, { Component } from 'react'
import { FlatList, View, Text,TouchableOpacity,StyleSheet,Dimensions } from 'react-native'
import cartDAO from '../LocalStorage/CartDAO';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class ListSales extends Component {

    constructor(props){ 
        super(props)
        this.state = {
            carts : [],
        }
    }
    componentDidMount(){ 
        cartDAO.getData().then((values )=> {
            console.log(values)
            this.setState({
                carts : values
            })
        })
    }

    render(){ 
        return (
            <View>
                <FlatList
                    style = {{
                        paddingBottom: 0, 
                        marginBottom: 0,         
                    }}
                    ListHeaderComponent ={ 
                        <>
                        <View style= {styles.card_style}> 
                        </View>
                        </>
                    }
                    data= {this.state.carts}
                    renderItem= {({item}) => (
                        <View style ={ styles.singleItemList}>
                            <TouchableOpacity onPress={()=>this.itemPressed(item) } >
                        
                                <View style ={ styles.singleItemDetails}>
                                    <Text>Valeur total des achats :{item.total_to_pay}</Text>
                                    <Text>Date :{item.day}-{item.month}</Text>
                                </View>
                    
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor= { item => item.id ? item.id.toString(): null}
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

    },singleItemDetails :{
        paddingLeft: 8, 
        paddingEnd: 8, 
        paddingRight: 8, 
        paddingStart: 8, 
        flex: 1 , 
  
    }
})