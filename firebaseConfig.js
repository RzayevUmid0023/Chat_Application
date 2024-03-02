import { initializeApp } from "firebase/app"; 
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyDm_xL2lvEQfiuWeL6RXPCvfupO5s3XaFs",
 authDomain: "chat-app-6c840.firebaseapp.com",
 projectId: "chat-app-6c840",
 storageBucket: "chat-app-6c840.appspot.com",
 messagingSenderId: "810549088128",
 appId: "1:810549088128:web:c2e62f92a1e2c0337dfb65"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)      
  });
export const db = getFirestore(app);

export default app;