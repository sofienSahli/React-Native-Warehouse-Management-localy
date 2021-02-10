import React from 'react'
import { Button, View,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeComponent extends React.Component { 

    constructor(props){
        super(props)

    }

    render(){

        return(
        <View style={ styles.container}>
    
         <TouchableOpacity  style= { styles.row_view}><Button title="Stock Produit" color= '#e74c3c' onPress={()=>{ this.props.navigation.navigate('List Items')}}></Button></TouchableOpacity>   
         <TouchableOpacity style= { styles.row_view}><Button title="Nouvelle Vente" color= '#d35400'  onPress={()=> this.props.navigation.navigate('New Sale')}></Button></TouchableOpacity> 
         <TouchableOpacity style= { styles.row_view}><Button title="Historique des Ventes" color= '#8e44ad'  onPress={()=> this.props.navigation.navigate('All Sales')}></Button></TouchableOpacity> 
         <TouchableOpacity style= { styles.row_view}><Button title="Credit"  color= '#27ae60' ></Button></TouchableOpacity> 
       
        
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 , 
        flexDirection : 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    
    },
    row_view:{ 
        paddingEnd: 8, 
        paddingStart: 8,
        margin: 8, 
        marginBottom: 8, 
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    }
});