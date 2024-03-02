// messageSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, doc, setDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
 
 
const initialState = {
  messages: [],
  status: 'idle',
  error: null,
  userData: {},
  messageData: [],
};

export const fetchMessages = createAsyncThunk('message/fetchMessages', async (_, { getState }) => {
  const state = getState();
  const userData = state.user.userData;
  const email = userData.userEmail;

  const querySnapshot = await getDocs(collection(db, 'chats'));

  const messages = querySnapshot.docs
    .map(doc => {
      const messageData = doc.data();
      if (messageData.users && messageData.users.includes(email)) {
        return {
          id: doc.id,
          data: messageData,
        };
      } else {
        return null;
      }
    })
    .filter(message => message !== null);
  console.log(messages)
  return messages;
});

export const addUser = createAsyncThunk('message/addUser', async ({ users, messages }) => {
  try {
   
    const newChatRef = await addDoc(collection(db, 'chats'), { users, messages });
    console.log('New chat created with ID:', newChatRef.id);
    
    
    return newChatRef.id;
  } catch (error) {
    throw error;
  }
});

export const getChatData = createAsyncThunk('message/getChatData', async (chatId) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'chats'));
    let messagesData = [];

    querySnapshot.forEach((doc) => {
      if (doc.id === chatId) {      
        const chatData = doc.data();
        messagesData = chatData.messages;     
      }
    });

    return messagesData;
  } catch (error) {
    throw error;
  }
});



export const sendMessage = createAsyncThunk('message/sendMessage', async ({ chatId, message }) => {
  try {
     const querySnapshot = await getDocs(collection(db, 'chats'));
    let chatData = null;
     
    querySnapshot.forEach((doc) => {
      if (doc.id === chatId) {
        chatData = doc.data();
        chatId = doc.id;
      }
    });

    if (!chatData) {
      throw new Error('Chat not found');
    }
   
    

    const updatedMessage = {
      ...message,
      _id: Math.random().toString(36).substring(2, 10),
    };

    const updatedMessages = [
      ...chatData.messages,
      updatedMessage,
    ];

    const chatRef = doc(db, 'chats', chatId);
    
    await setDoc(chatRef, {
      messages: updatedMessages,
    }, { merge: true });

    return updatedMessages;
  } catch (error) {
    throw error;
  }
});


export const deleteChat = createAsyncThunk(
  'message/deleteChat',
  async (chatId) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'chats'));
      for (const doc of querySnapshot.docs) {
        if (doc.id === chatId) {
          await deleteDoc(doc.ref);
          console.log('silindi')
          return chatId;
        }
      }
    } catch (error) {
      console.log('Chat silme işleminde problem çıktı:', error);
      throw error; 
    }
  }
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getChatData.fulfilled, (state, action) => {
        state.messageData = action.payload;
      })
      .addCase(getChatData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
         
        state.messageData = action.payload;
      });
    }
  })
  

export const { setUserData } = messageSlice.actions;
export default messageSlice.reducer;
