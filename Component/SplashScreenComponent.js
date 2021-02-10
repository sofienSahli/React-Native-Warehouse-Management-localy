import React, {useRef} from 'react';
import { View, ImageBackground,Animated,StyleSheet, Dimensions } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class SplashScreenComponent extends React.Component {
 
 
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
    this.fadeIn
  }
   fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }, ).start(()=>{
   //   this.props.navigation.navigate('HomeComponent')

    });

  };

   fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true
    }
    
    ).start();
  };

componentDidMount(){
  this.fadeIn();

}
   
 
  
    render(){
        return (
            <View style={ styles.container}>
              <Animated.View style={ {opacity: this.state.fadeAnim }}>
                <ImageBackground source={ require('../assets/plus.png')} style ={ styles.image_background } >

                  </ImageBackground>
                </Animated.View>
                
            </View>

        )
    }
}

const styles= StyleSheet.create({
  container : {
    flex : 1,
    flexDirection: "column",
    width: windowWidth, 
    height : windowHeight,
    alignContent : 'center',
    justifyContent: "center"

  },
  fadinview :{

    alignContent : 'center',
    justifyContent: 'center',

  }, 
  image_background:{
    resizeMode: "cover",
    justifyContent: "center",
    padding:  64, 

  }
})