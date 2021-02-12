import React, { Component } from 'react'
import { FlatList, View, Text,TouchableOpacity,StyleSheet,Dimensions,TextInput, Button } from 'react-native'
import { Switch } from 'react-native-gesture-handler';

import { Picker } from 'react-native-woodpicker'
import { DatePicker } from 'react-native-woodpicker'
import cartDAO from '../LocalStorage/CartDAO';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const picker_data = [ 
    {label : 'Toutes les ventes', value: 0},
    {label : 'Payments reçut', value: 1},
    {label : 'Payments non reçut', value: 2}
]
export default class ListSales extends Component {

    constructor(props){ 
        super(props)
        this.state = {
    
            carts : [],
            displayed_values: "Toutes les ventes",
            pickedDate: 'Date',
            is_paid: null , 
            libelle_search: null , 
            
        }
        this.itemPressed = this.itemPressed.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
        this.handlePicker = this.handlePicker.bind(this)
        this.handleDatePicker = this.handleDatePicker.bind(this)
        this.clear_filter = this.clear_filter.bind(this)
        this.text_submited = this.text_submited.bind(this)
    }
    componentDidMount(){ 
        cartDAO.getData().then((values )=> {
            console.log(values)
            this.setState({
                displayed_values: "Toutes les ventes",
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
                            <TextInput  style={ styles.text_input} placeholder='Vente Par libelle' onSubmitEditing={this.text_submited}></TextInput>
                            <View style={ styles.card_line}>
                                <Text>Affichage:</Text>        
                                <Picker
                                        onItemChange={this.handlePicker}
                                        items={picker_data}
                                        title="Status des ventes"
                                        placeholder={this.state.displayed_values }
                                        placeholderStyle={{ color:'#2980b9'}}
                                        //item={this.state.pickedData}
                                        //backdropAnimation={{ opactity: 0 }}
                                        //androidPickerMode="dropdown"
                                        //isNullable
                                        //disable
                                        />
                            </View>
                            <View style={ styles.card_line }>
                                <Text> Vente depuis </Text>
                                <DatePicker
                                    onDateChange={this.handleDatePicker}
                                    value={this.state.pickedDate}
                                    title="Date Picker"
                                    placeholder={this.state.pickedDate}
                                    placeholderStyle={{ color:'#27ae60'}}
                                    //iOSOnlyProps={{style: {color: 'green'} }}
                                    //iosPickerMode="date"
                                    androidPickerMode="spinner"
                                    locale="fr"
                                    //isNullable
                                    //disable
                                    />
                            </View>
                            <Button title="Clear filter" onPress={this.clear_filter} color='#c0392b'></Button>
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
    itemPressed(item ){

        this.props.navigation.navigate('Single Sale Detail', {item})
    }

    toggleSwitch(){
       cartDAO.getDataByPaymentStatus(!this.state.is_paid).then((values)=>{
           this.setState({
               carts : values, 
               is_paid : !this.state.is_paid
           })
       }) 

    }
    handleDatePicker  (value){
        var d = new Date(value),
        month = '' + (d.getMonth() + 1)
        day = '' + d.getDate()
        year = d.getFullYear()
        console.log(day)
        if(this.state.is_paid === null )
            cartDAO.getDataByStartingDates(day,month).then((values)=>{
                this.setState({
                    carts : values,
                    pickedDate : day + "-" + month + "-"+year
                })
            })
        else {
            cartDAO.getDataByStartingDatesAndStatus(day,month,this.state.is_paid).then((values)=>{
                this.setState({
                    carts : values,
                    pickedDate : day + "-" + month+ "-" +year

                })
            })
        }
            
    }
    clear_filter(){ 
        cartDAO.getData().then((values)=> {
      this.setState({
            carts : values,
            displayed_values: "Toutes les ventes",
            pickedDate: 'Date',
            is_paid: null , 
            libelle_search: null , 
        })})
    }

   text_submited(event){ 
    console.log(event.nativeEvent.text )
    cartDAO.getDataBylibelle(event.nativeEvent.text).then((values)=> {
        this.setState({
            carts:values,
        })

    })
   }




    handlePicker(data){ 
        switch (data.value) { 
            case 0 :
                cartDAO.getData().then((value)=>{
                    this.setState({
                        carts: value, 
                        displayed_values: "Toutes les ventes",
                        is_paid: null , 
                    })
                }) 
            break; 
            case 1: 
                cartDAO.getDataByPaymentStatus(true).then((value)=>{
                    this.setState({
                        carts: value, 
                        displayed_values: "Payment encaissé",
                        is_paid: true ,
                    })
                }) 
            break; 
            case 2: 
                cartDAO.getDataByPaymentStatus(false).then((value)=>{
                    this.setState({
                        carts: value, 
                        displayed_values: "En attente de payments",
                        is_paid: false
                    })
                }) 
            break;
        }
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
    },text_input: {
        borderBottomColor: '#27ae60',
        borderBottomWidth: 2,
    }
})