import React,{useState} from 'react'
import{ View,StyleSheet ,Modal,PermissionsAndroid,Alert}from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'react-native-image-picker';
import { RESULTS } from 'react-native-permissions';



const CreateEmp = ({navigation,route})=>{

    const getDetails=(type)=>{
      if(route.params){

        switch(type)
        {
          case "Name":
            return route.params.Name
          case "Phone":
            return route.params.Phone
          case "Email":
            return route.params.Email
          case "Salary":
            return route.params.Salary
          case "Picture":
            return route.params.Picture
          case "Position":
              return route.params.Position

        }

      }
      return ""
    }

    const[Name,setName] = useState(getDetails("Name"))
    const[Phone,setPhone] = useState(getDetails("Phone"))
    const[Email,setEmail] = useState(getDetails("Email"))
    const[Salary,setSalary] = useState(getDetails("Salary"))
    const[Picture,setPicture] = useState(getDetails("Picture"))
    const[Position,setPosition] = useState(getDetails("Position"))
    const[modal,setModal] = useState(false)


    const submitData = ()=>{
      fetch("http://283774eeb1ee.ngrok.io/send-data",{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          Name,
          Email,
          Phone,
          Salary,
          Picture,
          Position
        }),
      }).then(res =>res.json())
      .then((data)=>{
        Alert.alert(`${data.Name} saved successfuly`)
        navigation.navigate("Home")
      })
    }

    const updateDetails=()=>{

      fetch("http://283774eeb1ee.ngrok.io/update",{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          _id:route.params._id,
          Name,
          Email,
          Phone,
          Salary,
          Picture,
          Position
        }),
      }).then(res =>res.json())
      .then((data)=>{
        Alert.alert(`${data.Name} Updated successfuly`)
        navigation.navigate("Home")
      })
    }
    

    
    const pickFromGallery= async() =>{

        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
              
            },
          };

      try{
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                title:"Gallery Access Permission",
                message:"Apps wants to access your Gallery",
                buttonNeutral:"Ask me later",
                buttonPositive:"OK",
                buttonNegative:"Cancel"
                }
                );

                if(granted == PermissionsAndroid.RESULTS.GRANTED){
                    ImagePicker.launchImageLibrary(options, (response) => {
                       // console.log('Response = ', response);
                  
                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (response.error) {
                          console.log('ImagePicker Error: ', response.error);
                        } else if (response.customButton) {
                          console.log('User tapped custom button: ', response.customButton);
                          alert(response.customButton);
                        } else {
                          const source = { uri: response.uri };
                          //console.log('response', JSON.stringify(response));
                          let newFile = {
                            uri:response.uri,
                            type:`test/${response.uri.split(".")[1]}`,
                            name: `test/${response.uri.split(".")[1]}`

                          }

                          handleUplaod(newFile)
                        }
                      });
                    }

                
                else{
                    console.log("Gallery permission denied")
                }
        }
        catch(err){
            console.log(err)

        }
    }
   
    const requestCamera = async () => {

        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         
            ImagePicker.launchCamera(options, (response) => {
               // console.log('Response = ', response);
          
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                  alert(response.customButton);
                } else {
                  const source = { uri: response.uri };
                 let newFile = {
                   uri:response.uri,
                   type:`test/${response.uri.split(".")[1]}`, 
                   name:`test/${response.uri.split(".")[1]}`
                  
                 }
                 handleUplaod(newFile)
                }
              });
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
      
      const handleUplaod = (image) =>{

        const data = new FormData()
        data.append("file",image)
        data.append('upload_preset',"EmployeeApp")
        data.append("cloud_name","meghass")

        fetch("https://api.cloudinary.com/v1_1/meghass/image/upload",{
          method:"post",
          body:data
        }).then(res=>res.json()).
        then(data=>{
          console.log(data)
          setPicture(data.url);
          setModal(false)
        }).catch(err=>{
          Alert.alert("Something went wrong")
        })
      }

    return(

        <View style = {styles.root}>

            <TextInput 
            style = {styles.inputStyle}
            label='Name'
            value={Name}
            mode="outlined"
            theme={theme}
            onChangeText ={text=>setName(text)}
            />


            <TextInput
            style = {styles.inputStyle}
            label = "Email"
            value = {Email}
            mode = "outlined"
            theme = {theme}

            onChangeText = {text=>setEmail(text)}
            />
            <TextInput
            style = {styles.inputStyle}
            label = "Phone No"
            value = {Phone}
            mode = "outlined"
            theme = {theme}
            keyboardType="number-pad"
            onChangeText = {text=>setPhone(text)}
            />

        <TextInput 
          style={styles.inputStyle}
          label="Position"
          value={Position}
          mode="outlined"
          theme={theme}

          onChangeText = {text =>setPosition(text)}
        />
        <TextInput
        style = {styles.inputStyle}
            label = "Salary"
            value = {Salary}
            mode = "outlined"
            theme = {theme}

            onChangeText = {text=>setSalary(text)}
            />

            <Button
                style = {styles.inputStyle}
                theme = {theme}
                icon ={Picture==""?"upload":"check-bold"}
                 mode = "contained" onPress ={()=>setModal(true)}>
                    Upload Image
            </Button>

            {route.params?
            <Button
            style = {styles.inputStyle}
            theme = {theme}
            icon="content-save"
            mode = "contained"
            onPress = {()=>updateDetails()} 
           >
            Update Details
        </Button>
            
            :
                  <Button
                  style = {styles.inputStyle}
                  theme = {theme}
                  icon="content-save"
                  mode = "contained"
                  onPress = {()=>submitData()} 
                 >
                  Save
              </Button>
            }

           

            <Modal
                animationType="slide"
                visible = {modal}
                transparent={true}
                onRequestClose = {()=>setModal(false)}
                >
                    <View style = {styles.modalView}> 
                        <View style = {styles.modalButtonView}>
                            <Button 
                                icon ="camera" mode ='contained' onPress ={()=>requestCamera()}
                                theme = {theme}
                             >
                                Camera
                            </Button>
                            <Button 
                                icon ="image-area" mode ='contained' onPress = {()=>pickFromGallery()} 
                                theme = {theme}
                            >
                             Gallery
                            </Button>
                        </View>
                        <Button
                             icon ="close-circle" mode ='text' onPress ={()=>setModal(false)}
                             theme = {theme}
                         >
                            Cancel
                        </Button>
                    </View>

            </Modal>
        </View>
    )
}

export default CreateEmp
const theme ={
    colors:{
        primary:'#006aff'
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        margin:5
    },
    modalButtonView:{
        flexDirection:'row',
        padding:10,
        justifyContent:'space-around'


    },
    modalView:
    {
        backgroundColor:"white",        
        position:'absolute',
        bottom:2,
        width:"100%"
    }
})