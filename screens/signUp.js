console.disableYellowBox = true; 
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import  {TextField,  FilledTextField, OutlinedTextField,}  from 'react-native-material-textfield';


import {Button,Input} from 'react-native-elements'

import {connect} from 'react-redux'



import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
function connectSignUp(props) {
  
//Matthieu  http://192.168.1.43
// IP Marion http://192.168.1.43
//IP Ben http://192.168.1.43

const [email,setEmail]=useState('email@email.com')
const [firstName,setFirstName]=useState('')
const [lastName,setLastName]=useState('')
const [password,setPassword]=useState('')
useEffect(()=>{
  async function recupDonnée(){
    var requestBDD = await fetch('http://192.168.1.43:3000/infoSignUp',{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`email=${props.emailStore}`
    })
    var reponse = await requestBDD.json()
    setEmail(reponse.infoUser[0].email)
  }
  recupDonnée()
},[])

async function signUp(email,firstName,lastName,password){
  var userCreate = await fetch('http://192.168.1.43:3000/sign-up',{
  method:"POST",
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body:`email=${email}&firstName=${firstName}&lastName=${lastName}&password=${password}`
})
var resultServer =await userCreate.json()
var storageUser = {
                    "email":resultServer.result[0].email,
                    "idSpotify":resultServer.result[0].musicAccounts[0].platfornUserID,
                    "namePlatform":resultServer.result[0].musicAccounts[0].namePlatform
                  }
AsyncStorage.setItem("user",JSON.stringify(storageUser))

                /* recuperer les données du localstaorage */
                /* AsyncStorage.getItem('user',function(error,data){
                  var userData = JSON.parse(data)
                }) */
props.navigation.navigate("Home")
}


return (
<View>
  
    <View style={styles.input}>
      <Text style={{marginTop:50, fontFamily:'PermanentMarker'}}> Create Your Playdio Account</Text>
      
  
      <TextField
      label={email}
      tintColor="#26a69a"
      onChangeText={(value)=>setEmail(value)}
      />
      
      <TextField
      label={'firstName'}
      tintColor="#26a69a"
      onChangeText={(value)=>setFirstName(value)}
      />  

      <TextField
      label={'lastName'}
      tintColor="#26a69a"
      onChangeText={(value)=>setLastName(value)}
      />   

      <TextField

      label={'Password'}
      tintColor="#26a69a"
      secureTextEntry={true}
      onChangeText={(value)=>setPassword(value)}
      />


      <Button           
      buttonStyle={{
              backgroundColor:"#00838F",
          }}
      title="Sign up with email"
      type="solid"
      titleStyle={
        {fontFamily:'Roboto'}
      }
      onPress={()=>signUp(email,firstName,lastName,password)}
      />
      </View>

</View>

  );
}

const styles = StyleSheet.create({
  container: {
  display:"flex",
  flex:1,
  backgroundColor: '#fff',   
    },

  form:{
   display:"flex",
   flex:1,
   justifyContent:'flex-end',
    marginBottom:wp("15%"),
  },

input:{
  marginRight:wp('10%'),
  marginLeft:wp('10%'),
  marginBottom:wp('10%'),
  
  },  


paramPlaylist:{  
  backgroundColor: "#26a69a",
  marginRight:wp('7%'),
  marginLeft:wp('7%'),
  marginBottom:wp('70%'),
  
},


button:{
  backgroundColor: "#26a69a",
 marginRight:wp('10%'),
 marginLeft:wp('10%'),
},

});


function mapStateToProps(state) {
  return { emailStore : state.email }
}

export default connect(
  mapStateToProps,
  null
)(connectSignUp)