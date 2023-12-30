import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDLX0yeqImC7rHBuLPyrHLIALVSu_wEm5s',
  authDomain: 'silvana-eventos.firebaseapp.com',
  projectId: 'silvana-eventos',
  storageBucket: 'silvana-eventos.appspot.com',
  messagingSenderId: '861173185601',
  appId: '1:861173185601:web:e5fbe7780dd2d124f15ac0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
