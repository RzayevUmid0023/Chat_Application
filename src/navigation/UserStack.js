import React from 'react';
 import { Chats, Settings, Chat } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Chats" component={Chats}  />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    
  );
};

export default UserStack;
