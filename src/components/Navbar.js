import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Navbar = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Chats');

  const goToChats = () => {
    setSelectedTab('Chats');
    navigation.navigate('Chats'); 
  };

  const goToSettings = () => {
    setSelectedTab('Settings');
    navigation.navigate('Settings'); 
  };

  return (
         <View style={styles.navbar}>
        <TouchableOpacity onPress={goToChats} style={styles.navButton}>
            <Ionicons name={selectedTab === 'Chats' ? 'people-outline' : 'people'} size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToSettings} style={styles.navButton}>
            <Ionicons name={selectedTab === 'Settings' ? 'settings-outline' : 'settings'} size={28} color="black" />
        </TouchableOpacity>
        </View>
   );
};

const styles = StyleSheet.create({

   
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5fa',
    height: 60,
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navbar;
