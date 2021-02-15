import React from 'react'
import { Button, View,StyleSheet,Text,Dimensions} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import cartDAO from '../../LocalStorage/CartDAO';
import { VictoryBar,VictoryLabel, VictoryChart, VictoryTheme } from "victory-native";
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome'
export default class HomeComponent extends React.Component { 

    constructor(props){
        super(props)
        this.state ={
            data: null
        }
    this.getThisMonthStat = this.getThisMonthStat.bind(this)
    }
   
    componentDidMount(){ 
    
    this.getThisMonthStat()
     
    }

    render(){

        return(
        <ScrollView style={ styles.container}>
        <View style={ styles.card_style}>
                <TouchableOpacity  onPress={this.getThisMonthStat}>
                    <Icon name="refresh" size={32} color="#27ae60"  />
                </TouchableOpacity>
         
                        <VictoryChart   theme={VictoryTheme.material} width={ windowWidth } >
                    
                        <VictoryBar data={this.state.data} x="x" y="y" 
                                labels={({ datum }) => (datum.y).toFixed(3)}
                        />
                         <VictoryLabel
                                textAnchor="start" verticalAnchor="start"
                                x={10} y={10}
                                style={{fontSize: 16}}
                                text="Vente du mois en cours"
                            />
                        </VictoryChart>
        </View>
        <View style={styles.icon_button}>
                <Icon.Button  name="list"  backgroundColor='#e74c3c' color= '#ecf0f1' onPress={()=>{ this.props.navigation.navigate('List Items')}}>Stock Produit</Icon.Button> 
        </View>
        <View style={styles.icon_button}>
                <Icon.Button  name='shopping-cart' backgroundColor= '#d35400'  onPress={()=> this.props.navigation.navigate('New Sale')}>Nouvelle Vente</Icon.Button>
         </View>
         <View style={styles.icon_button}>
                <Icon.Button name='history' backgroundColor= '#8e44ad'  onPress={()=> this.props.navigation.navigate('All Sales')}>Historique des Ventes</Icon.Button>
         </View>
         <View style={styles.icon_button}>
                 <Icon.Button name='barcode' backgroundColor= '#27ae60' >Credit</Icon.Button>
         </View>
        
        </ScrollView>
        )
    }
    getThisMonthStat(){ 
        console.log('here')
        var date = new Date();
        var n = date.getMonth()+1;
        cartDAO.getData().then((values)=>{
         // values.push({month : 2 , day : 3, total_to_pay : 12 },{month : 2 , day : 3, total_to_pay : 12 },{month : 2 , day : 4, total_to_pay : 232 },{month : 2 , day : 6, total_to_pay : 232 },{month : 2 , day : 6, total_to_pay : 232 })
            if(values !== null ){
                var this_month_sales = []
                let total_today = 0 
                let last_passed_by_day = values[0].day
 
          
                values.forEach((element,index,array) => {
                    if(element.month ==  n ){
                        if(element.day === last_passed_by_day) {
                            total_today+= element.total_to_pay
                      
                        }
                        else if (element.day != last_passed_by_day ){
                            this_month_sales.push({ x: last_passed_by_day, y : total_today})
                            total_today = 0 
                            total_today += element.total_to_pay
                        }
                        if((values.length-1) == index  ){
                            this_month_sales.push({ x: last_passed_by_day, y : total_today})
                            total_today = 0 
                            total_today += element.total_to_pay
                        }
                        last_passed_by_day = element.day 
                       
                    }
                
                });


                this.setState({
                    data : this_month_sales
                })
           
            } 
        })}
}

const styles = StyleSheet.create({
    container: {
        flex: 1 , 
        flexDirection : 'column',
        paddingBottom: 16,
        paddingTop: 8 
    },
    card_style : { 
        flex: 1,
        backgroundColor:  '#ecf0f1',
        alignItems:'center',
        flexDirection: 'column',
        flexShrink:1,
        shadowColor: '#000',
      
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:1,
        shadowRadius: 2,
        elevation: 8,
        borderRadius: 8, 
        paddingStart: 16,
        paddingEnd: 16,
        paddingRight: 16,
        margin: 8,
    },icon_button:{
        marginTop: 8,
        padding: 8,
    }

});