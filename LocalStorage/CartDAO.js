import AsyncStorage from '@react-native-async-storage/async-storage';


export const CART = "@CART"

class CartDAO{ 
    // store single value 
    storeData = async (value) => {
        try {
            const jsonValue = await AsyncStorage.getItem(CART)
            var object =  JSON.parse(jsonValue)

             
           // return jsonValue != null ? JSON.parse(jsonValue) : null;
              if(object !== null){
                    object.push(value)
                
                }else {
                object = []
                object.push(value)
                }
              } catch(e) {
                // error reading value*
                console.log(e)
              }
        try {
          const jsonValue = JSON.stringify(object)
            //console.warn(jsonValue)
          await AsyncStorage.setItem(CART, jsonValue)
        } catch (e) {
          console.log(e)
        }
      }
      //Delete all values 
      removeValue = async () => {
        try {
          await AsyncStorage.removeItem(CART)
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }

      
      // Returns all values from @Product
    getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(CART)
           let object =  JSON.parse(jsonValue)
         // return jsonValue != null ? JSON.parse(jsonValue) : null;
    
            return object
        } catch(e) {
          // error reading value
        }
      }
}

const cartDAO = new CartDAO(); 
export default cartDAO; 
