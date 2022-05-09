import React, { Component } from "react";
import {
     StyleSheet,
      View,
       Button,
    SafeAreaView,
    Platform,
    Text,
    StatusBar,
    Dimensions,
    
    } from "react-native";
import * as Google from "expo-google-app-auth"
import firebase from "firebase"
import {TouchableOpacity} from "react-native -gesture-handler"
import{RFValue } from " react-native-responsive-fontsize"
import firebase from "firebase "
import AppLoading from "expo-google-app-auth"
import *as Font from "expo-loading "

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
  };

export default class LoginScreen extends Component{
constructor(props){
    super(props)
    this.state = {
        fontsLoaded:false
    }
}
async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
    
    isUserEqual =(googleUser,firebaseUser)=>{
        if(firebaseUser){
    var providerData =firebaseUser.providerData
    for(var i = 0 ; i <providerData.length ;i++){
    if(
        providerData[i].providerId ===
        firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
    ){
        return true 
    }
}
        }
        return false 
    }

onSignIn =googleUser =>{
    var unsubscribe = firebase.auth().onAuthChangedState(firebaseUser =>{
    unsubscribe()
    if (!this.isUserEqual(googleUser, firebaseUser)){
        var credential = firebase.auth.GoogleAuthPRovider.credential(
            googleUser.idToken, 
            googleUser.accessToken
        )

        firebase 
        .auth()
        .signInWithCredential(credential)
        .then (function (result){
            if (result.additionalUserInfo.isNewUser){
                firebase 
                .database ()
                .ref("/user/"+ result.user.id)
        .set({
        gmail:result.user.email,
        provide_picture:resultAdditionalUserInfo.profile.picture,
        locale :result .additionalUserInfo.profile.locale ,
        first_name :result .additionalUserInfo.profile.given_name ,
        Last_name :result .additionalUserInfo.profile.family_name,
        cureent_theme :"dark" 
})
.then(function(snapshot){})
            }
        })

.catch(error =>{
var errorCode = error.code
var errorMessage= error.message 
var email = error.email
var credential = error.credential 
})
    }
    else{
        console.log("userAlreadySignedIn")
    }
})
}

signInWithGoogleAsync =async ()=>{
try{
    const result =await Google.logInAsync ({
        behavior:"web",
        androidClientId:
          "993908358863-7oqsf84qld4tnqbaa6jgcfnmmi7m6frm.apps.googleusercontent.com",
        iosClientId:
          "993908358863-871ltgfaogm9tdss7c897rabbchab742.apps.googleusercontent.com",
        scopes: ["profile", "email"]
    })

    if (result.type === "success"){
        this.onSignIn(result)
        return result.accessToken
    }
    else{
        return {cancelled:true }
    }
    }
    catch(e){
        console.log (e.message )
        return {error:true }
    }

    }

render (){
if (!this.state.fontsLoaded){
    return<AppLoading/>
}
else{
    return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.appIcon}
            ></Image>
            <Text style={styles.appTitleText}>{`Storytelling\nApp`}</Text>
          </View>
<View style = {styles.buttonContainer}>
    <TouchableOpacity
    style = {styles.button}
    onPress = {() => this.signInWithGoogleAsync()}>
    <Image    
    source ={require("../assets/google_icon.png")}
    style={styles.googleIcon }></Image>
   <Text style ={styles.googleText}>Sign In With Google </Text>

    </TouchableOpacity>
</View>
<View style ={styles.cloudContainer}>
    <Image 
    source ={require("../assets/cloud.png")}
    style={styles.cloudImage }>
        </Image>
</View>
</View>       
    )
}
}
}
const styles=StyleSheet .create ({
container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
}   ,
droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: RFValue(130),
    height: RFValue(130),
    resizeMode: "contain"
  },
appTitleText:{
    color:"white ",
    textAlign :"center",
    fontSize:20,
    fontFamily:"Bubblegum-Sans"
},
buttonContainer:{
    flex:0.3,
    justifyContent:"center",
    alignItems:"center"
},
button :{
    width:300,
    height:100,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    backgroundColor:"red"
},
googleIcon :{
    width:30,
    height:30,
    resizeMode:"contain"
},
googleText:{
    width:30,
    height:30,
    fontFamily:"Bubblegum-Sans "
},
cloudContainer :{
    flex:0.3,

},
cloudImage :{
    position :"absolute",
    width:100,
    resizeMode:"contain",
    bottom :-5
}
})











