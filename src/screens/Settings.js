import { StyleSheet, Text, View , SafeAreaView } from 'react-native'
import React from 'react'
import {colors} from '../config/constants'
import SettingButtom from '../components/SettingButtom'
import Navbar from '../components/Navbar'
import {  useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice';

 

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const {userData } = useSelector((state) => state.user)
 
  return (
    <>
    <SafeAreaView style={styles.container} >
        <Text style={styles.HeaderText}>Settings</Text>
        <View style={styles.InterSpace}></View>

        <View style={styles.Main}>
            <View style={styles.UserInformation}>
                <View style={styles.User}><Text style={styles.UserText}>A</Text></View>
                <Text style={styles.UserName}>{userData.userEmail}</Text>
            </View>

            <SettingButtom title='Edit Profile' icon='person' color={colors.primary} />
            <SettingButtom title='Call Your Friends' icon='chatbubbles' color={colors.primary}/>
            <SettingButtom title ='Share Your E-mail' icon='share-social' color={colors.primary}  onPress={()=>{console.log('hi guys')}}/>

            <SettingButtom title ='Log Out' icon='power' color={colors.red} onPress={()=>{
              dispatch(logout())
               
               }} />


        </View>
      
        
 
    </SafeAreaView>
    <Navbar navigation={navigation}/>
    </>
  )
}

export default Settings

const styles = StyleSheet.create({

  container:{
    flex:1,
    marginTop:20

},
HeaderText:{
    textAlign:'center',
    fontSize:30,
    padding:10,
    fontWeight:'600'
},

InterSpace:{
    borderWidth:1,
    borderColor:colors.pink
},
Main:{
  flex:1,
  backgroundColor:'white',
},
UserInformation:{
  alignItems:'center',
  justifyContent:'center',
  marginBottom:30

},
User:{
  backgroundColor:colors.gray,
  width:170,
  height:170,
  borderRadius:85,
  marginTop:20,
  justifyContent:'center',
  alignItems:'center'
},
UserText:{
  color:'white',
  fontSize:40,
  fontWeight:'600'
},
UserName:{
  fontSize:35,
  padding:10,
  color:colors.gray,
}
})