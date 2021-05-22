import firebase from 'firebase';

class AuthService {
    // authentication (login, logout, ...) 등에 관련된 일을 하는 클래스
    login(providerName) { 
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebase.auth().signInWithPopup(authProvider);
     }
    logout() { }
}

export default AuthService;