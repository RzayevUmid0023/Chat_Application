import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Pressable, ScrollView ,Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getChatData, sendMessage ,deleteChat } from '../redux/messageSlice';
import { Ionicons } from 'react-native-vector-icons';
 


function Chat({ route , navigation }) {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const { messageData } = useSelector((state) => state.message);

  const scrollViewRef = useRef();

  const [loading, setLoading] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    dispatch(getChatData(route.params.id));
  }, []);

  useEffect(() => {
    if (messageData) {
      console.log('Messages updated:', messageData);
      setMessages(messageData);
      setLoading(false);
      scrollToBottom();
    }
  }, [messageData]);

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleSendMessage = () => {
    const chatId = route.params.id;
    const newMessage = {
      _id: Math.round(Math.random() * 1000000).toString(),
      text: inputMessage,
      createdAt: new Date().toISOString(),
      user: {
        _id: userData.userId,
        name: userData.userEmail,
      },
    };
    if(inputMessage === ''){
      return;
    }else{
      console.log(newMessage);
      dispatch(sendMessage({ chatId, message: newMessage }));
      setInputMessage('');
      scrollToBottom();
    }
    
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
       
        <View style={styles.header}>
             
              <Pressable 
              onPress={()=>{navigation.navigate('Chats')}}
              style={[styles.header_icon, { opacity: buttonPressed ? 0.7 : 1 }]}>
                 <Text><Ionicons name="arrow-back" style={styles.buttonName} /></Text>
              </Pressable>
             

          <View><Text style={styles.header_name}>{route.params.name}</Text></View>

          <Pressable 
              onPress={async()=>{
                await dispatch(deleteChat(route.params.id))
                navigation.navigate('Chats')
              }}
              
              style={[styles.header_icon, { opacity: buttonPressed ? 0.7 : 1 }]}>
                 <Text><Ionicons name="trash" style={styles.buttonName} /></Text>
              </Pressable>
        
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messageContainer}
          onContentSizeChange={() => scrollToBottom()}>
          {messages.map((item) => (
            <View
              key={item._id}
              style={[
                styles.messageItem,
                { alignSelf: item.user.name === userData.userEmail ? 'flex-end' : 'flex-start' },
                { backgroundColor: item.user.name === userData.userEmail ? 'blue' : '#e9e9f5' },
              ]}>
                <View style={styles.messageStyleContainer}>
                  <Text style={[{ color:'white' , fontSize:16 ,paddingRight:35}, { color: item.user.name === userData.userEmail ? 'white' : 'black' }]}>{item.text}</Text>
                  <Text style={[styles.date, { color: item.user.name === userData.userEmail ? '#e9e9f5' : 'gray' }]}>
                      {(new Date(item.createdAt)).getHours()}:{(new Date(item.createdAt)).getMinutes()}
                  </Text>
                </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type your message..."
            
          />
          <Pressable
            onPressIn={() => setButtonPressed(true)}
            onPressOut={() => setButtonPressed(false)}
            onPress={handleSendMessage}
            style={[styles.button, { opacity: buttonPressed ? 0.7 : 1 }]}>
            <Ionicons name="send" style={styles.buttonName} />
          </Pressable>
        </View>
        {loading && <Text>Loading...</Text>}
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -5,
  },
  header:{
    height:80,
    
    paddingTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20

  },
  header_name:{
    fontSize:22,
    fontWeight:'600',
    color:'black'

  },
  header_icon:{
    width:40,
    height:40,
    backgroundColor:'blue',
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
  },
  
  messageContainer: {
    marginTop: 0,
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },
  messageItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '65%',
    marginHorizontal:30 ,
    marginVertical:5,
    color:'white'
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    marginBottom:20,
    paddingHorizontal:'4%'
    
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
    color:'black',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    
    
  },
  button: {
    borderRadius: 25,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    
     
  },
  buttonName: {
    fontSize: 16,
    color: 'white',
  },
  messageStyleContainer:{
    flexDirection:'row',
     
  },
  date:{
    fontSize:12,
    position:'absolute',
    right:-3,
    bottom:-8,
  }
});

export default Chat;
