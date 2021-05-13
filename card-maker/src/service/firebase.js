
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_DB_URL,
    appId: process.env.REACT_APP_FIREBASE_PROJET_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);