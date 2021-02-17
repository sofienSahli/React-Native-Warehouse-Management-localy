import React from 'react'; 
import { FlatList, StyleSheet, View, SafeAreaView,Dimensions,StatusBar,TouchableOpacity ,Text, Image, ImageBackground } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productDao from '../../../LocalStorage/ProductDAO'
import {NEW_ITEM_SCREEN, ITEM_DETAILS_SCREEN} from '../../../App'
import Icon from 'react-native-vector-icons/FontAwesome'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const PRODUCT = "@PRODUCT"
export default  class ItemList extends React.Component { 
    
    constructor(props){ 
            super(props)
        
            this.state= {
                selectedId : null, 
                data : []
            }
            this.itemPressed = this.itemPressed.bind(this)
            this.addNewItem = this.addNewItem.bind(this)
            this.searchByQuery = this.searchByQuery.bind(this)
            this.refresh = this.refresh.bind(this)
        }
  
        refresh(){
            productDao.getData().then((values)=>{
                this.setState({
                    data: values
                })
            })
        }
        componentDidMount(){
            this.refresh()
        }
    searchByQuery(text){ 
        productDao.findItemByName(text).then((values)=>{
            this.setState({
                data: values
            })
        })
    }

    addNewItem(){ 
       this.props.navigation.navigate(NEW_ITEM_SCREEN)
    }

    itemPressed(item){
       this.setState({
           selectedId : item.id
       })
     
       this.props.navigation.navigate(ITEM_DETAILS_SCREEN, {item})
    }


    renderItem({item}){
  
      if(item.product_quantity <= item.product_low_quantity)
            return (
                <View style ={ styles.singleItemList}>
                    <TouchableOpacity onPress={ ()=>this.itemPressed(item) } >
                        <View style={{ flex:1 , flexDirection: 'row',alignItems:'c'}}>
                            
                        
                            <View style ={ styles.singleItemDetails}>
                                <Text>Nom : {item.product_name}</Text>
                                <Text>Prix : {item.product_price}</Text>
                                <Text style={{ color:"#c0392b"}}>Stock : {item.product_quantity}</Text>

                            </View>
                            <Icon
                                    onPress={() => console.log('ok')}
                                    name='exclamation-circle'
                                    size={32} color="#c0392b"
                                    style={{ marginEnd: 16}}
                                />
                        </View>
                    </TouchableOpacity>
                </View>
            )
        else 
           return  (
                <View style ={ styles.singleItemList}>
                <TouchableOpacity onPress={ ()=>this.itemPressed(item) } >
                    <Text>{item.product_name}</Text>
                    <View style ={ styles.singleItemDetails}>
                        <Text>Prix : {item.product_price}</Text>
                        <Text>Stock : {item.product_quantity}</Text>
                    </View>
        
                </TouchableOpacity>
            </View>
            )
      
      
      
    }


    render( ){ 
    /*
  */
        return(
        <SafeAreaView style={styles.container}>
            <FlatList
            style = {{
                paddingBottom: 32, 
                marginBottom: 46,
                flex: 1 ,
            }}
            ListHeaderComponent = { 
                <>
                <View style={styles.ListHeader}> 
                <TouchableOpacity onPress ={this.refresh }> 
                     <Icon name="refresh" size={32} color="#27ae60" />
                    </TouchableOpacity>
                    <TextInput placeholder="Search Item" style={styles.input_text} onChangeText={ this.searchByQuery}></TextInput>
                    <TouchableOpacity onPress ={this.addNewItem }> 
                     <Icon name="plus-circle" size={32} color="#27ae60" />
                    </TouchableOpacity>
                </View>
                <View style= {{ width: windowWidth, height:1 , marginBottom: 8, marginBottom: 8, backgroundColor: '#000' }} /> 
                </>
            }
     
            data= {this.state.data}
            renderItem= {({item}) => this.renderItem({item}) }
            keyExtractor= { item => item.product_barcode ? item.product_barcode.toString(): null}
            >
          
                 
             
            </FlatList>
       
        </SafeAreaView>
      
        )
    }
}

const styles = StyleSheet.create ({ 
    container : {
        flex: 1,
        paddingBottom: 32,
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: StatusBar.currentHeight || 0,
        paddingEnd: 0,
        paddingLeft: 0, 
        width: windowWidth, 
        paddingEnd: 0,
        position: 'absolute',
        height: windowHeight,
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

    },singleItemList_highlited :{
        padding: 16, 
        margin: 8 ,
        shadowColor: '#c0392b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        flex: 1 , 
        borderColor: '#c0392b', 
        borderWidth: 1,

    },singleItemDetails :{
        paddingLeft: 8, 
        paddingEnd: 8, 
        paddingRight: 8, 
        paddingStart: 8, 
        flex: 1 , 
  
    }, selectedBackground: { 
        backgroundColor : '#1e90ff'
    },itembackground : { 
        backgroundColor: '#fffaf0'
    },ListHeader: { 
        margin: 16, 
        flex: 3 , 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems : 'stretch'
    },Seperator : { 
        width: windowWidth, 
        height : 8, 
        backgroundColor: '#000000'
    },input_text : {
        marginStart: 8, 
        marginEnd: 8, 
        height : 20, 
        flex: 1 , 
        borderColor : "#27ae60", 
        borderRadius: 8.0, 
        borderBottomWidth : 1.0 
    },
    
});