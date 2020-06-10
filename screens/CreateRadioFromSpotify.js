import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView, ScrollView ,FlatList,TouchableOpacity,} from 'react-native';

import { ListItem,Button,ButtonGroup } from 'react-native-elements'
import SearchComponent, { Separator } from './components/SearchResult';

import police from './components/font';

import { TextField } from 'react-native-material-textfield';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {connect} from 'react-redux';

// import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font'




function CreateRadio2(props) {

const [radioName, setRadioName] = useState()

const [send, setSender] = useState(false);

/* Spotify : Get playlist informations */

//Matthieu  http://192.168.1.43
// IP Marion http://192.168.1.43
//IP Ben http://192.168.1.43

let idSpotify = 1127664154

const [playlistUser,setPlaylistUser] =useState();

// requete BDD
useEffect(()=>{
  
    async function recupDonnée(){
      var requestBDD = await fetch('http://192.168.1.43:3000/user-playlist',{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`idSpotify=${idSpotify}`
      })
      var reponse = await requestBDD.json()
        // console.log(reponse)
      setPlaylistUser(reponse)
    }
    recupDonnée()
  },[])
  

 /* mise en forme du JSON receptionné */
 let listOfPlaylist =[] ;
 const[arrayPlaylist, setArrayPlaylist] =useState();

 useEffect(()=>{
     if(playlistUser){ // attente de la reception du JSON
         let infoplaylistGlobal = playlistUser.response.items// Filtrage de la réponse JSON pou mise en forme
         let infoPlaylist = infoplaylistGlobal.map((info,i)=>{
         
             let namePlaylist = info.name
             let nbTracks = info.tracks.total
             let spotifyId = info.id
             let type = info.type
             let textDescr = nbTracks + " Tracks"
             let imgPlaylist = 'https://image.freepik.com/vecteurs-libre/illustration-icone-application-musicale_53876-35882.jpg'
             
             if(info.images[0]){ // if playlist have img
                imgPlaylist = info.images[0].url
             }
          listOfPlaylist.push({id:i,name:namePlaylist,text:textDescr,url:imgPlaylist,spotifyId:spotifyId,type:type})
          setArrayPlaylist(listOfPlaylist)
         })

     }else {
         console.log("----------------> ko")
     }


  },[playlistUser])


// fonction filtre
const[search,setSearch]=useState("")
let filteredPlaylist=[] ;

/*  waiting for array playlist initialisation */
   if(arrayPlaylist){
       filteredPlaylist= arrayPlaylist.filter(function(item) {
        //applying filter for the inserted text in search bar
        
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
        });

   }else{
       console.log("<=====waiting ")
   }
 
  return (
<View style={styles.container}>

                {/*  "#c2185b" */}
        
                            <View style={styles.input}> 
                            <Text style={styles.categoryTitle}> New Radio</Text>
                            
                            <TextField
                                label={'Find a Playlist'}
                                highlightColor="#c2185b"
                                onChangeText={ (value) => setSearch(value) }
                                />
                            </View>
                    
    {/* liste des musiques */}
                 <FlatList

                data={filteredPlaylist}
                keyExtractor={item => item.id}
                renderItem={({ item}) => (

                  <SearchComponent
                    {...item}
                    navigation={props.navigation}
                    //onPress={()=>{validPlaylist(props.spotifyId)}} 
                  />
                       
                )}
                ItemSeparatorComponent={() => <Separator />}
               
              />

                <View style={styles.button}>
                        <Button 
                            title="Press me"
                            onPress={() => alert('Simple Button pressed')}
                            buttonStyle={{
                                backgroundColor:"#00838F",
                            }}
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
   marginRight:wp('10%'),
   marginLeft:wp('10%'),
   marginBottom:wp('20%'),
},

categoryTitle: {
    color:"#383838", 
    fontSize:hp('3%'), 
    width:wp('75%'), 
    marginLeft:wp('7%'),
    fontFamily: 'PermanentMarker',
    marginTop: wp ('20%')
  },
  
});
function mapStateToProps(state){
    return {playlistRedux: state.PlaylistAdd, token:state.token}
  }
  
  export default connect(
    mapStateToProps, 
    null
  )(CreateRadio2);

//export default CreateRadio2


