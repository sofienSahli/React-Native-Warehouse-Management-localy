import React from 'react' 
import { TextInput, Text, Button, View,StyleSheet, TouchableOpacity,Dimensions} from 'react-native'
import { RNCamera } from 'react-native-camera';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import productDao from  '../../../LocalStorage/ProductDAO';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
  );
export default class NewProduct extends React.Component { 


    constructor(props){ 
        super(props)
        this.camera = null;
        this.barcodeCodes = [];
        this.state = { 
            isScanUp: false, 
            lastScanned: null, 
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
              }, 
   
                product_name: null, 
                product_quantity: null, 
                product_price: null, 
                barcodes: null  , 
     
           
        }
        this.onBarCodeRead = this.onBarCodeRead.bind(this)
        this.persist_data = this.persist_data.bind(this)
        //this.storeData = this.storeData.bind(this)
    }

   
    
    onBarCodeRead(scanResult) {
        if(scanResult[0].type !== "UNKNOWN_FORMAT"){
            
    
            this.setState({ 
                isScanUp: !this.state.isScanUp, 
                lastScanned : scanResult[0].data,
                product :{ 
                    barcodes : scanResult[0].data,
                },
          
            })
        
        }
    }

    render(){ 
        var content = null 
        if(this.state.isScanUp)
            content = <View style={ styles.line}> 
              
                    <RNCamera
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            this.onBarCodeRead(barcodes)
                        }}
                    >
                    </RNCamera>
                </View>
        if (!this.state.isScanUp) 
                    
                content = 
                <View style={ styles.line }> 
                    <Icon.Button onPress={()=> this.setState( {isScanUp: !this.state.isScanUp}) } 
                      name="barcode">Scan</Icon.Button> 
                    <TextInput style={ styles.input_text} placeholder='Barcode'>{this.state.lastScanned}</TextInput>
                </View>
                  

        return ( 
            <ScrollView >
                        <View style={ styles.container}>
                            { content }
                        
                            
                            <View style={ styles.line}> 
                                <Text > Nom du Produit : </Text>
                                <TextInput  style={ styles.input_text}
                                 placeholder="Entrer le nom du produit"
                                   onChangeText={ (text)=>{ this.setState({ product_name: text  }) }}
                                   onSubmitEditing = { (text) => { this.setState({ product_name: text.nativeEvent.text  })}}
                                />
                            </View>

                            <View style={ styles.line}> 
                                <Text > Prix de vente : </Text>
                                <TextInput  style={ styles.input_text} 
                                    placeholder='Entrer le prix de vente du produit'
                                    keyboardType="numeric"
                                   onChangeText={ (text)=>{ this.setState({ product_price: text  }) }}
                                   onSubmitEditing = { (text) => { this.setState({ product_price: text.nativeEvent.text  })}}
                                />
                            </View>
                            
                            <View style={ styles.line}> 
                                <Text > Quantité : </Text>
                                <TextInput style={ styles.input_text} multiline={ false} 
                                keyboardType="numeric"
                                    placeholder='Entrer la quantité disponible à la  vente'
                                onChangeText={ (text)=>{ this.setState({ product_quantity: text }) }}
                                onSubmitEditing = { (text) => { this.setState({ product_quantity: text.nativeEvent.text  })}}
                                />
                            </View>
                            <View style={ styles.line}>
                                <Button title="Ajouter" color ="#27ae60" onPress={this.persist_data}></Button>
                                <Button title="Annuler" color="#c0392b" onPress={()=> this.props.navigation.navigate('List Items')}></Button>
                            </View>
              
                        </View>
          </ScrollView>
        )
    }
    persist_data(){
     
     //   var key =;
        var obj ={ 
            product_name :  this.state.product_name,
            product_price : this.state.product_price, 
            product_quantity : this.state.product_quantity,
            product_barcode : this.state.lastScanned
        } 
        productDao.storeData(obj).then(()=> this.props.navigation.navigate('List Items'))
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',

        width :windowWidth , 
        height: windowHeight
    },
    preview: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },line: {
        padding: 8, 
        margin: 8,
        marginEnd: 16 ,
        flex: 1 , 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems : 'stretch',
    },input_text : {
        flex: 4 , 
        borderColor : "#27ae60", 
        borderRadius: 8.0, 
        marginTop: 8,
        marginStart: 8, 
        marginEnd: 8, 
        borderBottomWidth : 1.0 
    }, box :{ 
        flexDirection : 'column',
        flex: 4, 
        alignContent: "space-between",
        alignItems:"stretch"
    }
  });
