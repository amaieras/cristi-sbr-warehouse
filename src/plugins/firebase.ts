import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDN5oAQ5XoQVVpe5kW2aqd-kDXB3OxtN-E",
  authDomain: "cristi-sbr-warehouse.firebaseapp.com",
  projectId: "cristi-sbr-warehouse",
  storageBucket: "cristi-sbr-warehouse.appspot.com",
  messagingSenderId: "771205189677",
  appId: "1:771205189677:web:14d076026ba6af753828a4",
  measurementId: "G-7Z3CZ9MRCL"
};
export const firebaseApp = initializeApp(firebaseConfig)

// used for the firestore refs
export const db = getFirestore(firebaseApp)

// // here we can export reusable database references
export const batchesRef = collection(db, 'batches')
