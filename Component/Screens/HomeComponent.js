import React from 'react'
import { Button, View,StyleSheet,Text,Dimensions} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import cartDAO from '../../LocalStorage/CartDAO';
import { VictoryBar,VictoryLine,VictoryLabel, VictoryChart, VictoryTheme } from "victory-native";
const windowWidth = Dimensions.get('window').width;
import { LIST_ITEM_SCREEN,NEW_SALE_SCREEN,ALL_SALE_SCREEN,STAT_SCREEN } from "../../App";
import Icon from 'react-native-vector-icons/FontAwesome'
export default class HomeComponent extends React.Component { 

    constructor(props){
        super(props)
        this.state ={
            data: null
        }
    //this.props.navigation.reset({index: 0 , routes:[{"Dashboard"}] } )
    }
   
    componentDidMount(){ 
    
    
    }

    render(){

        return(
        <View style={ styles.container}>
        <View style={styles.icon_button}>
            <TouchableOpacity style={ styles.TouchableOpacity_1}  onPress={()=>{ this.props.navigation.navigate(LIST_ITEM_SCREEN)}}>
                    <Icon  name="database" size={48} color= '#ecf0f1'/>
                    <Text style={{ color: "#ecf0f1"}}> Produit en stock</Text> 
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.TouchableOpacity_2} onPress={()=> this.props.navigation.navigate(NEW_SALE_SCREEN)}>
                    <Icon  name='shopping-cart' size={48} color= '#ecf0f1' ></Icon>
                    <Text style={{ color: "#ecf0f1"}}> Nouvelle Vente</Text>
            </TouchableOpacity>
         </View>
        
        
         <View style={styles.icon_button}>
            <TouchableOpacity style={styles.TouchableOpacity_3} onPress={()=> this.props.navigation.navigate(ALL_SALE_SCREEN)}>
                    <Icon name='history' color= '#ecf0f1' size={48}  ></Icon>
                    <Text style={{ color: "#ecf0f1"}}> Historique des ventes</Text>

            </TouchableOpacity>
        
            <TouchableOpacity style={styles.TouchableOpacity_4 } onPress={()=> this.props.navigation.navigate(STAT_SCREEN)}>
                    <Icon name='area-chart' size={48} color= '#ecf0f1' ></Icon>
                    <Text style={{ color: "#ecf0f1"}} > Rendement</Text>

            </TouchableOpacity>
         </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 4 , 
        flexDirection : 'column',
        paddingBottom: 16,
        alignContent:'center',
        alignItems:'center',
        justifyContent: 'space-around',
        paddingTop: 8, 
        paddingEnd : 8, 
        paddingStart: 8 , 
        margin: 8,
        width: windowWidth,
        marginLeft: 8
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
        margin: 16,
        padding: 8,
        flex: 1, 
        flexDirection: 'row', 
        justifyContent:'space-between',
        alignContent:'center',
        flexShrink: 1.0
      
      
    }, TouchableOpacity_1: { 
        margin: 8, 
        flex:1 , 
        flexDirection: 'column',
        padding: 8,
        alignContent:'center', 
        alignItems : 'center',
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:1,
        shadowRadius: 2,
        elevation: 8,
        borderRadius: 8,
        backgroundColor: '#27ae60'
    }, TouchableOpacity_2: { 
        margin: 8, 
        flex:1 , 
        flexDirection: 'column',
        padding: 8,
        alignContent:'center', 
        alignItems : 'center',
        justifyContent: 'center',
        flexShrink:1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:1,
        shadowRadius: 2,
        elevation: 8,
        borderRadius: 8,
        backgroundColor: '#16a085'
    }, TouchableOpacity_3: { 
        margin: 8, 
        flex:1 , 
        flexDirection: 'column',
        padding: 8,
        alignContent:'center', 
        alignItems : 'center',
        justifyContent: 'center',
        flexShrink:1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:1,
        shadowRadius: 2,
        elevation: 8,
        borderRadius: 8,
        backgroundColor: '#d35400'
    }, TouchableOpacity_4: { 
        margin: 8, 
        flex:1 , 
        flexDirection: 'column',
        padding: 8,
        alignContent:'center', 
        alignItems : 'center',
        justifyContent: 'center',
        flexShrink:1,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity:1,
        shadowRadius: 2,
        elevation: 8,
        borderRadius: 8,
        backgroundColor: '#2980b9'
    }

});

/*

 <View style={ styles.card_style}>
            <View style={{ width: '100%', flex:1 ,alignItems:'flex-end'}}> 
                <TouchableOpacity  onPress={this.getThisMonthStat}>
                    <Icon name="refresh" size={32} color="#27ae60"  />
                </TouchableOpacity>
                </View>
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
        */