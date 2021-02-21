import React from'react'
import { View,StyleSheet,TouchableOpacity,Text} from 'react-native'
import { VictoryChart, VictoryTheme,VictoryBar,VictoryLabel,VictoryPie } from "victory-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import cartDAO from '../../../LocalStorage/CartDAO';
import { ScrollView } from 'react-native-gesture-handler';

//const windowWidth = Dimensions.get('window').width;

export default class StatsMainScreen extends React.Component{ 

    constructor(props){ 
        super(props)
        this.state = { 
            data:[], 
            total_transaction : null ,
            pie: [],
            total_not_paid: null,
            total_real_paid: null ,
        }
        this.getThisMonthStat = this.getThisMonthStat.bind(this)
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
                let total_transaction = 0
                
                let total_not_paid= 0
                let total_real_paid= 0 
                
                
                console.log(values)
                
                values.forEach((element,index,array) => {
                    if (this_month_sales.length == 0) 
                        this_month_sales.push({x : last_passed_by_day -1 , y: 0  }) 

                    if(element.is_paid)
                        total_real_paid += element.total_to_pay
                    else 
                        total_not_paid += element.total_to_pay

                    if(element.month ==  n ){
                        total_transaction += element.total_to_pay

                        if(element.day === last_passed_by_day) {
                            total_today+= element.total_to_pay
                      
                        }
                        else if (element.day != last_passed_by_day ){
                            this_month_sales.push({ x: last_passed_by_day, y : total_today})
                            total_today = 0 
                            total_today += element.total_to_pay
                        }
                        // Beug if the last index is the first one of the day it will provok a beug where the last item and the first one per day will be displayed with yesterday values 
                        if((values.length-1) == index  ){
                            this_month_sales.push({ x: last_passed_by_day, y : total_today})
                            total_today = 0 
                            total_today += element.total_to_pay
                            this_month_sales.push({ x: last_passed_by_day+1, y : 0})
                            
                            let a = []
                            a.push({ x: "Crédit",y:total_not_paid},{ x: "Encaissement", y: total_real_paid })
                            this.setState({
                                total_transaction : total_transaction.toFixed(3),
                                pie: a,
                                total_not_paid: total_not_paid.toFixed(3),
                                total_real_paid: total_real_paid.toFixed(3) ,
                            })
                        }
                        last_passed_by_day = element.day 
                    }
                
                });

                console.log(this_month_sales)
                this.setState({
                    data : this_month_sales
                })
           
            } 
        })}

        componentDidMount(){
            this.getThisMonthStat()
        }
    render(){ 
        return (<ScrollView style={styles.container}>
        
                <VictoryChart   theme={VictoryTheme.material} width={ 350 } >
                    
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
                    
                    <Text>Recette mensuel        :<Text style={{ flex:1, color: '#c0392b'}}>{this.state.total_transaction}</Text></Text>
                        <View style ={styles.seperator}/>
                        <VictoryPie
                                colorScale={["tomato", "orange" ]}
                                data={this.state.pie}
                                />
                    <Text>Vrais Recette mensuel  :  <Text style={{ flex:1, color: 'orange'}}>{this.state.total_real_paid}</Text></Text>
                    <Text>Crédit mensuel  :  <Text style={{ flex:1, color: 'tomato'}}>{this.state.total_not_paid}</Text></Text>

        </ScrollView>)
    }


} 
/*
  <View style={{  flex:.5 ,alignItems:'flex-end'}}> 
          <TouchableOpacity  onPress={this.getThisMonthStat}>
                    <Icon name="refresh" size={32} color="#27ae60"  />
                    </TouchableOpacity>
            </View>

*/
const styles = StyleSheet.create({
        container: { 
            flex: 1 ,
            flexDirection:'column',
            alignContent:'center',
            paddingBottom: 64,
            marginBottom: 8,
        },seperator : {
            borderBottomWidth: 2,
            borderBottomColor : '#2c3e50',
            marginTop: 16,
        }

})