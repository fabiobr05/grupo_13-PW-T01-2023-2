//Importação das bibliotecas de configuração do firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth }  from "firebase/auth";

// Configurações encontradas no console do Firebase
//Insira aqui as configurações
const firebaseConfig = {
    apiKey: "AIzaSyAUOWkbMQR-vMiPeArmfabEI5WRY9-4p3w",
    authDomain: "projetoquiz-ea729.firebaseapp.com",
    projectId: "projetoquiz-ea729",
    storageBucket: "projetoquiz-ea729.appspot.com",
    messagingSenderId: "278134181965",
    appId: "1:278134181965:web:de218d9c6f3dca0a998c04",
    measurementId: "G-ZXDT9W2YRE"
  };
  

//Inicialização do firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

const analytics = getAnalytics(firebaseApp);

export { db, auth, analytics};
