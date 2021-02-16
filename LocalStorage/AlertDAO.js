import AsyncStorage from '@react-native-async-storage/async-storage';
export const ALERT = "@ALERT"



class AlertDAO {
storeData = async (value) => {
    try {
        const jsonValue = await AsyncStorage.getItem(ALERT)
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
      await AsyncStorage.setItem(ALERT, jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  //Delete all values 
  removeValue = async () => {
    try {
      await AsyncStorage.removeItem(ALERT)
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }


  // Returns all values 
getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(ALERT)
       let object =  JSON.parse(jsonValue)
     // return jsonValue != null ? JSON.parse(jsonValue) : null;

        return object
    } catch(e) {
      // error reading value
    }
  }

   // Returns all values 
getDataByPaymentStatus = async (value) => {
  try {
    const jsonValue = await AsyncStorage.getItem(ALERT)
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
    // Find item by it's barcode value 
    findItemByBarCode = async (value)=> {
        try {
          const jsonValue = await AsyncStorage.getItem(PRODUCT)
     
          var object;
          object = JSON.parse(jsonValue)
          var search_result ;
          object.forEach(element => {
          
              if(element.product_barcode.toString().includes(value.toString()))
             
                  search_result = element
          });
          console.log(search_result)
          return search_result
      }catch(e){
          console.log(e)
      }
      }

}

const alertDAO = new AlertDAO(); 
export default alertDAO; 
