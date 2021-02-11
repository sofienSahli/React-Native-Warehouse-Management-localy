import React, { Component } from 'react'
import { FlatList, View, Text,TouchableOpacity,StyleSheet,Dimensions } from 'react-native'
import { Switch } from 'react-native-gesture-handler';
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
                                    <Text>Libelle : <Text style={{color: '#d35400'}}>{item.libelle}</Text></Text>
                                    <View style={{flex: 1 , flexDirection:'row', alignItems:'stretch',alignContent:'stretch',alignSelf:'stretch'}}><Text>Payment reçut</Text><Switch trackColor={{ false: "#c0392b", true: "#27ae60" }} 
                                               value={item.is_paid} enabled={false}></Switch></View>
                                    <Text>Valeur total des achats : <Text style={{color: '#27ae60'}}>{(item.total_to_pay).toFixed(3)}</Text></Text>
                                    <Text>Date :<Text style={{color: '#2c3e50'}}>{item.day}-{item.month}-{item.year}</Text></Text>
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
       alignContent:'space-between',
       

    },singleItemDetails :{
        paddingLeft: 8, 
        paddingEnd: 8, 
        paddingRight: 8, 
        paddingStart: 8, 
        flex: 1 , 
  
    }
})