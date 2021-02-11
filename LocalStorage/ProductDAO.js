import AsyncStorage from '@react-native-async-storage/async-storage';


export const PRODUCT = "@PRODUCT"

 class ProductDAO { 
    
    //Remove a signle item from @Product
    remove_item = async(val) => { 
        this.getData().then((value)=>{
            
     
            value.forEach((element,index,array) => {
           // console.error(val);
                if(element.product_barcode.toString() == val.product_barcode.toString()){
                    value.splice(index,1)
                    //console.warn(index)
                }
            });
            //console.warn(value)
            this.removeValue().then(()=>{
              this.storeArrayData(value)
              
            }) 
      
        }).catch((e) => console.error(e))
    }

    // Delete all values from @Product
    removeValue = async () => {
        try {
          await AsyncStorage.removeItem(PRODUCT)
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }



      // Returns all values from @Product
    getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(PRODUCT)
           let object =  JSON.parse(jsonValue)
         // return jsonValue != null ? JSON.parse(jsonValue) : null;
    
            return object
        } catch(e) {
          // error reading value
        }
      }
      
      // Save a new value to @Product
    storeData = async (value) => {
        try {
            const jsonValue = await AsyncStorage.getItem(PRODUCT)
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
           // console.warn(jsonValue)
          await AsyncStorage.setItem(PRODUCT, jsonValue)
        } catch (e) {
          console.log(e)
        }
      }
      // Save an Array of value to @Product
      storeArrayData = async (value) => {
        
        try {
          const jsonValue = JSON.stringify(value)
           // console.warn(jsonValue)
          await AsyncStorage.setItem(PRODUCT, jsonValue)
          return value
        } catch (e) {
          console.log(e)
        }
      }
    
      // Run a simple search query by name 
      findItemByName = async (value)=> {
        try {
            const jsonValue = await AsyncStorage.getItem(PRODUCT)
       
            var object =  []
            object = JSON.parse(jsonValue)
            var search_result = []
            object.forEach(element => {
            
                if(element.product_name.toString().includes(value.toString()))
               
                    search_result.push(element)
            });
            return search_result
        }catch(e){
            console.log(e)
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
          return search_result
      }catch(e){
          console.log(e)
      }
      }

}
const productDao = new ProductDAO(); 
export default productDao; 
