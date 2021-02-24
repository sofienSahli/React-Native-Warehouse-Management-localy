import React from 'react'; 
import { FlatList, StyleSheet, View, SafeAreaView,Dimensions,StatusBar,TouchableOpacity,Animated ,Text, Image,Easing , ImageBackground } from 'react-native'
import {  TextInput } from 'react-native-gesture-handler';

import productDao from '../../../LocalStorage/ProductDAO'

import Icon from 'react-native-vector-icons/FontAwesome'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const PRODUCT = "@PRODUCT"
const NEW_ITEM_SCREEN = "Nouveau produit"
const ITEM_DETAILS_SCREEN = "Detaille"
export default  class ItemList extends React.Component { 
    
    constructor(props){ 
            super(props)
           
            this.state= {
          
                selectedId : null, 
                data : []
            }
            this.animatedValue = new Animated.Value(0)
            this.itemPressed = this.itemPressed.bind(this)
            this.addNewItem = this.addNewItem.bind(this)
            this.searchByQuery = this.searchByQuery.bind(this)
            this.refresh = this.refresh.bind(this)
            this.render_list_headedr_view = this.render_list_headedr_view.bind(this)
            this.render_flat_list = this.render_flat_list.bind(this)
   
        }
  
    
       
        refresh(){
            productDao.getData().then((values)=>{
                if(values != null )
                this.setState({
                    data: values
                })
            }).catch(err => { throw err})
        
        }
        componentDidMount(){
           // this.handleAnimation()
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
                        <View style={{ flex:1 , flexDirection: 'row',alignItems:'center'}}>
                            
                        
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
    render_no_item_view(){ 

    }

    render_list_headedr_view (){ 
        return (   <>
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
            </>)
    }
    render_flat_list ( ){
        return ( <FlatList
            style = {{
                paddingBottom: 32, 
                marginBottom: 46,
                flex: 1 ,
            }}
            ListHeaderComponent = { 
             this.render_list_headedr_view
            }
     
            data= {this.state.data}
            renderItem= {({item}) => this.renderItem({item}) }
            keyExtractor= { item => item.product_barcode ? item.product_barcode.toString(): null}
            >
          
                 
             
            </FlatList>
       )
    }
    render( ){ 
        let content = null 
        if(this.state.data!=null && this.state.data.length > 0) {
            content =  this.render_flat_list()
        }else 
            content =( <>
            <ImageBackground source={ require('../../../assets/empty.png')} style ={ styles.image_background }/>

                  <TouchableOpacity  style={styles.new_item_style} onPress={this.addNewItem}> 
                        <Icon name="cart-plus" color='#27ae60' backgroundColor='#27ae60' size={48} />
                        <Text > Commencez à enregistrer vos produits. </Text>

                    </TouchableOpacity>
            </>)
    
    
        return(
        <SafeAreaView style={styles.container}>
            
            {content}
        </SafeAreaView>
      
        )
    }
}
/*
translate anim
 {


            <Animated.View  style={{
                        position: 'absolute',
                        flex: 1, 
                        flexWrap: 'wrap',
                        flexDirection : 'row',

                        transform: [
                           
                            {
                                scaleX: this.animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 1.1]
                                })
                            },
                            {
                                scaleY: this.animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 1.1]
                                })
                            }
                        ]
                    }}>            </Animated.View>   

                                translateX: this.animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 120]
                                })
                            },
                            {
                                translateY: this.animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 25]
                                })
                            }
                                handleAnimation  ()  {
            Animated.loop(Animated.sequence([Animated.delay(500),Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 500,
                
                useNativeDriver: false , 
                easing: Easing.ease
            })]) ,  {
                iterations: -1
              }).start(()=> {})
        }

*/

const styles = StyleSheet.create ({ 
    container : {
        flex: 1,
        paddingBottom: 32,
        alignContent: 'center',
        flexDirection: 'column',
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
    },image_background:{
        resizeMode: "center",
        height: 200,
        flex:1,
      },new_item_style: { 
          flex: 1 ,
        position:'relative', 
        flexDirection : 'column', 
        justifyContent:'center',
        alignItems:'center', 
        alignContent:'space-around',
     
     
    }
    
});