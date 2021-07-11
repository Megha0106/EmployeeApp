import React ,{useState,useEffect} from 'react'
import { Text, View,StyleSheet,Image ,FlatList,ActivityIndicator, Alert} from 'react-native'
import { State } from 'react-native-gesture-handler';
import {Card,FAB} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch,useSelector } from 'react-redux'
//import { Colors } from 'react-native/Libraries/NewAppScreen';



const  Home=({navigation})=> {
   /*  const[data,setData] = useState([])
    const[loading,setLoading] = useState(true) */

    const dispatch = useDispatch()
    const {data,loading}=useSelector((state)=>{
        return state
    })
    
    const fetchData=()=>{

        fetch("http://283774eeb1ee.ngrok.io/")
        .then(res=>res.json())
        .then((results)=>{
            //console.log(results)
            /* setData(results)
            setLoading(false) */

            dispatch({type:"ADD_DATA",payload:results})
            dispatch({type:"SET_LOADING",payload:false})
        }).catch(err=>{
            console.log(err)
            //Alert.alert("Something went wrong")
        })
    }

    useEffect(()=>{
        fetchData()
    })
    const renderList = ((item)=>{
        return(
            <Card style = {styles.myCard}
          onPress = {()=>navigation.navigate("Profile",{item})}
         // onPress = {()=>console.log(item)}
            >
            <View style = {styles.cardView}>
               <Image  style = {{width:80, height:80,borderRadius:40}}
               source ={{uri:item.Picture}}/>
               <View style = {{marginLeft:10}}>
                   <Text style ={{fontSize:20}}>{item.Name}</Text>
                   <Text>{item.Position}</Text>
               </View>
               
            </View>
            
       </Card>
        )

    })
    return(
        <View style = {{flex:1}}>

            <FlatList 
            data = {data}
            renderItem={({item})=>{
               return renderList(item)
            }}
            keyExtractor={item=>item._id}
            onRefresh={()=>fetchData()}
            refreshing={loading}
            />

            
        <FAB
            style={styles.fab}
            small= {false}
            icon="plus"
            theme={{colors:{accent:"#006aff"}}}
            onPress={() =>navigation.navigate("Create") }
        />
        </View>
        
            
        
    )
}
export default Home

const styles = StyleSheet.create({
    cardView:{
        flexDirection:'row',
        padding:10
        
    },
    myCard:{
       
      margin:5 ,
  
    },
    fab:{
        margin:16,
        position:'absolute',
        bottom:0,
        right:0

        
    }
    
  })