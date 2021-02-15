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

    updateItem=async(value,dataBase)=>{ 

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

       // Returns all values from @Product
    getDataByPaymentStatus = async (value) => {
      try {
        const jsonValue = await AsyncStorage.getItem(CART)
         let object =  JSON.parse(jsonValue)
       // return jsonValue != null ? JSON.parse(jsonValue) : null;
          let query_result = []
          object.forEach(element => {
              if(element.is_paid === value)
              query_result.push(element)    
          });
          return query_result
      } catch(e) {
        // error reading value
      }
    }
    


    // Returns  values containing %value% @Product
    getDataBylibelle = async (value) => {
      try {
        const jsonValue = await AsyncStorage.getItem(CART)
        let object =  JSON.parse(jsonValue)
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
          let query_result = []
          object.forEach(element => {
              if(element.cart_libelle.includes( value))
              query_result.push(element)    
          });
          return query_result
      } catch(e) {
        // error reading value
      }
    }






       // Returns all values from @CART by starting date 
       getDataByStartingDates = async (d,m) => {
        try {
          const jsonValue = await AsyncStorage.getItem(CART)
           let object =  JSON.parse(jsonValue)
         // return jsonValue != null ? JSON.parse(jsonValue) : null;
            let query_result = []
            object.forEach(element => {
              let dd = parseInt(element.day)  
              let mm = parseInt(element.month)
              if((dd >= d) && (mm >= m ) )
                  query_result.push(element)    
            });
            return query_result
        } catch(e) {
          // error reading value
        }
      }
      
       // Returns all values from @CART by starting date and payment status 
       getDataByStartingDatesAndStatus = async (d,m,bool) => {
        try {
          const jsonValue = await AsyncStorage.getItem(CART)
           let object =  JSON.parse(jsonValue)
         // return jsonValue != null ? JSON.parse(jsonValue) : null;
            let query_result = []
            object.forEach(element => {
              let dd = parseInt(element.day)  
              let mm = parseInt(element.month)
              if((dd >= d) && (mm >= m ) && (element.is_paid ===bool) )
                  query_result.push(element)    
            });
            return query_result
        } catch(e) {
          // error reading value
        }
      }
}

const cartDAO = new CartDAO(); 
export default cartDAO; 
