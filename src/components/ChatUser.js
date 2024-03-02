import { StyleSheet, Text, View ,TouchableOpacity } from "react-native";
import React from "react";
import {MaterialIcons} from '@expo/vector-icons'



const ChatUser = ({name , message ,Press }) => {
  return (
    <>
      <TouchableOpacity style={styles.UserBox} onPress={Press}>
        <View style={styles.UserIcon}>
          <Text style={styles.UserIconText}>{name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()}</Text>
        </View>

        <View style={styles.UserInformation}>
          <Text style={styles.UserName}>{name}</Text>
          <Text style={styles.UserText}>{message}</Text>
        </View>

        <MaterialIcons name="keyboard-arrow-right" size={25} color={'white'} />
      </TouchableOpacity>

      <View style={styles.border}></View>
    </>
  );
};

export default ChatUser;

const styles = StyleSheet.create({
    UserBox:{
        paddingHorizontal:20,
        flexDirection:'row',
        padding:14,
        alignItems:'center',
        marginTop:2

    },
    UserIcon:{
        width:45,
        height:45,
        backgroundColor:'#4d4ddb',
        borderRadius:23,
        justifyContent:'center',
        alignItems:'center'
    },
    UserIconText:{
        color:'white',
        fontWeight:'700'
        
    },
    
    UserInformation:{
        flex:1,
        marginStart:20
         
    },
    UserName:{
        fontSize:20,
        fontWeight:'600',
        color:'black'
    },
    UserText:{
        fontSize:13,
        color:'gray'
    },
    border:{
        borderBottomWidth:1,
        borderColor:'gray',
        padding:1,
        opacity:0.4,
        width:'90%',
        marginLeft:'5%'

    },
});
