// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_Firebase_API,
  authDomain: "real-state-images.firebaseapp.com",
  projectId: "real-state-images",
  storageBucket: "real-state-images.appspot.com",
  messagingSenderId: "130681301861",
  appId: "1:130681301861:web:815c40d1ea8ed60dbb8f8c"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_Firebase_API,
//   authDomain: "real-state-appp.firebaseapp.com",
//   projectId: "real-state-appp",
//   storageBucket: "real-state-appp.appspot.com",
//   messagingSenderId: "504941655468",
//   appId: "1:504941655468:web:f0f2a10cddc4739d663609"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;