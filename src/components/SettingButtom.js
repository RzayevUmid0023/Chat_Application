import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'

const SettingButtom = ({icon , title ,color ,onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>

        <Ionicons  name={icon} size={25} color={color}/> 
        <Text style={styles.text}>{title}</Text>
        

    </TouchableOpacity>
  )
}

export default SettingButtom

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:30,
        paddingVertical:10,
        margin:10,
        
        borderRadius:25
    },
    text:{
        fontSize:20,
        marginStart:15
        

    }
})