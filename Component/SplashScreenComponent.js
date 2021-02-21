import React, {useRef} from 'react';
import { View, ImageBackground,Animated,StyleSheet, Dimensions, Button } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class SplashScreenComponent extends React.Component {
 
 
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
    
  }
   fadeIn  ()  {
    // Will change fadeAnim value to 1 in 5 seconds
    
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1500,

      useNativeDriver: true
    }).start(()=>{
      this.props.navigation.navigate("Dashboard")
    });

  }

   fadeOut  () {
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
            <Animated.View style={ styles.container,{opacity: this.state.fadeAnim}}>
            
                <ImageBackground source={ require('../assets/splash_screen.png')} style ={ styles.image_background } >

                  </ImageBackground>
            </Animated.View>
             
        )
    }
}

const styles= StyleSheet.create({
  container : {
    flex : 1,
    flexDirection: "row",
    width: windowWidth, 
    height : windowHeight,
    padding: 16,
    alignContent : 'stretch',
    justifyContent: "center"

  }, 
  image_background:{
    resizeMode: "center",
    padding:  16, 
    height: 400
  }
})