import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService {
    // authentication (login, logout, ...) 등에 관련된 일을 하는 클래스
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged(user => {
      onUserChanged(user);
    });
  }
}

export default AuthService;
