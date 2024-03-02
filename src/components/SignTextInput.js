import { StyleSheet, View ,TextInput } from 'react-native'
import React from 'react'
import {colors} from '../config/constants'

const SignTextInput = ({title , secure ,onChange }) => {
  return (
    <View style={styles.inputContainer}>
        <TextInput 

            placeholder={title} 
            style={styles.input} 
            secureTextEntry={secure}
            onChangeText={onChange}
        / >
         
    
    </View>
  )
}

export default SignTextInput

const styles = StyleSheet.create({
    inputContainer:{
        width:'100%',
        padding:30
    },
    input:{
        fontSize:18,
        borderBottomWidth:1,
        height:50,
        borderColor:colors.gray

    }
})