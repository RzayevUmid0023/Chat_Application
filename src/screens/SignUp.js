import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
 
import {Ionicons} from '@expo/vector-icons'
import SignTextInput from '../components/SignTextInput'
import { colors } from '../config/constants'
import Loading from '../components/Loading';
import {signin} from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux';


const Login = ({navigation}) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const dispatch = useDispatch();
  const {isLoad} = useSelector((state) => state.user)

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [coniformPassword , setConiformPassword] = useState('')
  const [text , setText] = useState('')


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HeaderBox} >
        <Text style={styles.headerText}>SignUp</Text>
        <Ionicons name="chatbubbles" size={50} color="black" />
      </View>
      <View style={styles.InputBox}>
        <SignTextInput title='Enter Email' secure={false} onChange ={(email)=>{setEmail(email)}}/>
        <SignTextInput title='Enter Password' secure={true} onChange ={(password)=>{setPassword(password)}}/>
        <SignTextInput title='Coniform Password' secure={true} onChange ={(coniformPassword)=>{setConiformPassword(coniformPassword)}}/>

        <Text>{text}</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{
            if(password === coniformPassword){
              dispatch(signin({email , password}))
              setText('Kayıt işlemi başarılı')
            }else{
              setText('Password coniform error')
            }
          }}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>

      </View>

       <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          styles.bottomTextBox,
          { bottom: keyboardOpen ? -50 : 15 }, 
        ]}
      >
          <Text  style={styles.bottomText}>You have account?</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                  <Text style={styles.bottombutton}>Login</Text>
          </TouchableOpacity>
          
      </KeyboardAvoidingView>
      {isLoad ? <Loading/> : null}

    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.pink

  },
  HeaderBox:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'32%'
     
    
    

  },
  headerText:{
    fontSize:42,
    fontWeight:'600',
    padding:10,
    
  },
  InputBox:{
    marginTop:'8%',
    alignItems:'center'
  },
  button:{
    width:'90%',
    backgroundColor:colors.gray,
    padding:20,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:35,
    marginTop:10
  },
  buttonText:{
    color:'white',
    fontSize:18
  },

  bottomTextBox:{
    position:'absolute',
    bottom:20,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
     
    height:40,
    flexDirection:'row'
  },
  bottomText:{
    fontSize:16,
     
  },
  bottombutton:{
    fontSize:16,
    fontWeight:'600',
    marginLeft:5
     
  }
})