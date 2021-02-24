import React from 'react'
import { Modal,View,Button,StyleSheet,Dimensions} from 'react-native'

import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ScanCodeModal extends React.Component {


    constructor(props){
        super (props)
        this.state = {
            modalVisible :  this.props.modal_visibile,
            barcodeRead: null
        }
        this.onBarCodeRead = this.onBarCodeRead.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
    }

    onBarCodeRead(scanResult) {
        console.log(scanResult)
        if(scanResult.barcodes[0].type !== "UNKNOWN_FORMAT"){      
         
           
            this.props.parentCallback(scanResult.barcodes[0].data);
            this.setState({
                modalVisible : !this.state.modalVisible
                })
        }
    }
    setModalVisible (){
      this.setState({
        modalVisible : !this.state.modalVisible
      })
    }
    render(){ 
        return (
            <View style={styles.centeredView}>
              <Icon.Button name="barcode" onPress={this.setModalVisible} backgroundColor='#27ae60'>Scan</Icon.Button>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
              >
           
                   
                    <View 
                    style= {  {height: windowHeight/3 ,width: windowWidth/2 }}
                    ><RNCamera
                                    style={styles.preview}
                                    type={RNCamera.Constants.Type.back}
                                    flashMode={RNCamera.Constants.FlashMode.on}
                                    androidCameraPermissionOptions={{
                                    title: 'Permission to use camera',
                                    message: 'We need your permission to use your camera',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel',
                                    }}
                        
                                    onGoogleVisionBarcodesDetected={ (barcodeRead) =>  this.onBarCodeRead(barcodeRead)}
                                >
                        </RNCamera>
                   
                        <Button title="Close" onPress={this.setModalVisible} color='#e74c3c'></Button>

                    </View>

              </Modal>
           
            </View>
          );
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      marginTop: 0,
      paddingTop: 0,
      width: windowWidth,
      alignContent:'space-around', 
      alignItems:'stretch', 
      padding: 8, 
      justifyContent: 'center'
    },
    modalView: {
      margin: 0,
      backgroundColor: "white",
      borderRadius: 0,
      paddingTop: 0,
      alignItems: "stretch",
      shadowColor: "#000",

        flex:1,
        shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      flexWrap:'wrap'
    },  preview: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap:'wrap'
      }, capture: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 0,
        margin: 0,
        paddingHorizontal: 8,
        alignSelf: 'center',
        flexWrap:'wrap'
      },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
 
  });