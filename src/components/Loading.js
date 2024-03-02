import { StyleSheet, Text, View , ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.container}>
       <ActivityIndicator size="large" color="blue" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({

    container:{
        position:'absolute',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        opacity:0.7
    }
})