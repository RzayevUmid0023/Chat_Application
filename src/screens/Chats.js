import React, { useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView , Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchMessages, addUser } from '../redux/messageSlice';
import Navbar from '../components/Navbar'
import ChatUser from '../components/ChatUser';
import CustomModal from '../components/Modal';
 


const Chats = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchMessages());
    }, [])
  );

  const showPrompt = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    if (!inputValue.includes('@')) {
      Alert.alert('Lütfen karşı tarafın mailini giriniz...')
      return;
    } else {
      dispatch(addUser(
        {
          users: [userData.userEmail, inputValue],
          messages: []
        }
      ));
      setIsModalVisible(false);
      setInputValue('');
      dispatch(fetchMessages());
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setInputValue('');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <Text style={styles.HeaderText}>Messages</Text>
          <TextInput  style={styles.searchInput} placeholder='Search ...'/>
          {messages.map((message) => (
            <ChatUser
              key={message.id}
              name={message.data.users.find((x) => x !== userData.userEmail)}
              message={message.data.messages.length > 0 ? message.data.messages[message.data.messages.length - 1].text : 'Şu anda bir mesajınız yok'}
              Press={() => navigation.navigate('Chat', { id: message.id, name: message.data.users.find((x) => x !== userData.userEmail) })}
            />
          ))}
          <CustomModal
            visible={isModalVisible}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity style={styles.add_button_component} onPress={showPrompt}>
        <Ionicons name='add' style={styles.add_button} />
      </TouchableOpacity>
      <Navbar navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor:'white'
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -5,
  },
  HeaderText: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10,
    fontWeight: '600',
    color: 'black'
  },
  add_button_component: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#3e3eed',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  add_button: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },
  searchInput:{
    width:'90%',
    marginLeft:'5%',
    height:50,
    borderWidth:1,
    borderRadius:30,
    paddingHorizontal:20,
    fontSize:16,
    marginVertical:10
  }
});

export default Chats;
