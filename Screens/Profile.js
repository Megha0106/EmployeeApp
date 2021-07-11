import React from 'react'
import { Text, View,StyleSheet,Image,Linking ,Platform, Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Title,Card,Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile=(props)=>{

    const {_id,Name,Email,Phone,Position,Salary,Picture} = props.route.params.item

    const deleteEmp = ()=>{
        fetch("http://283774eeb1ee.ngrok.io/delete",{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                _id
            }),
        }).then(res =>res.json())
        .then((data)=>{
          Alert.alert(`${data.Name} deleted successfuly`)
          props.navigation.navigate("Home")
        })
    }

    const openDial =() =>{
        if(Platform.OS =="android")
        {
            Linking.openURL(`tel:${Phone}`)
        }
        else{
            Linking.openURL(`telprompt:${Phone}`)
        }
    }
    return(
        <View style = {styles.root}>
            <LinearGradient 
                colors={["#0033ff","#6bc1ff"]}
                style = {{height:"30%"}}
            />
            <View style = {{alignItems:'center'}}>
                <Image
                style = {{height:130,width:130,borderRadius:65,marginTop:-70}}
                source = {{uri:Picture}}
                />
            </View>

            <View style = {{alignItems:'center',margin:10}}>
                <Title>{Name}</Title>
                <Text style = {{fontSize:17}}>{Position}</Text>
            </View>

            <Card style = {styles.myCard} onPress = {()=>Linking.openURL(`mailto:${Email}`)}>
                <View style = {styles.cardContent}>
                    <Icon name ="email" size={25} color="#006aff" />
                    <Text style= {styles.myText}>{Email}</Text>
                </View>
            </Card>
            <Card style = {styles.myCard} onPress = {()=>openDial()}>
                <View style = {styles.cardContent}>
                    <Icon name ="phone" size={25} color="#006aff" />
                    <Text style= {styles.myText}>{Phone}</Text>
                </View>
            </Card>
            <Card style = {styles.myCard}>
                <View style = {styles.cardContent}>
                    <Icon name ="attach-money" size={25} color="#006aff" />
                    <Text style= {styles.myText}>{Salary}</Text>
                </View>
            </Card>

            <View style = {{flexDirection:'row',justifyContent:'space-around',padding:10,marginTop:10}}>
                <Button icon="account-edit" mode="contained" theme={theme}
                onPress={()=>
                    {props.navigation.navigate("Create",
                    {_id,Name,Email,Phone,Position,Salary,Picture}
                    )}
                }>
                    Edit 
                </Button>

                <Button icon="delete" mode="contained" theme={theme}
                onPress={()=>deleteEmp()}>
                    Delete
                </Button>
            </View>
            
        </View>
    )
}

export default Profile

const theme = {
    colors:{
        primary:'#006aff'
    }
}
const styles = StyleSheet.create({
    root:{
        flex:1
    },
    myCard:{
        margin:8,
        padding:8,
       
    },
    cardContent:{
        flexDirection:'row',
        
    },
    myText:{
        fontSize:17,
        marginLeft:5
    }
})