import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

import {
    DrawerContentScrollView,
    DrawItemList
}from "react-navigation/draw"

export default class CustomSidebarMenu extends Component{
    constructor (props){
        super(props)
        this.state = {
            light_theme:true
        }
    }

    componentDidMount(){
        let theme 
        firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", function(snapshot) {
          theme = snapshot.val().current_theme;
        });
      this.setState({ light_theme: theme === "light" ? true : false });
    }

render(){
    let props = this.props
    return(
        <View 
        style = {{
            flex:1,
            backgroundColor:this.state.light_theme?"white":"blue"
        }}
        >
<Image
source = {require("../assets/logo.png")}
style = {styles.sideMenuProfileIco}></Image>
<DrawerContentScrollView{...props}>
<DrawIconList{...props}/>
</DrawerContentScrollView>
        </View>
    )
}
}

const styles = StyleSheet.create({
    sideMenuProfileIcon:{
        width:140,
        height:140,
        borderRadius:70,
        alignSelf:"centre",
        marginTop:60,
        resizeMode:"contain"
    }
})



