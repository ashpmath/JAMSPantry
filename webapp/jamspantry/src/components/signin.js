/*
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getAuth, linkWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();
var firebase = require('firebase');
var firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(firebase.auth());   //initialize a new authentication UI 

// EMAIL & PASSWORD - AUTHENTICATION from multiple social media platforms
ui.start('#firebaseui-auth-container', {
    signInOptions: [
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });

linkWithPopup(auth.currentUser, provider).then((result) => {
  // Accounts successfully linked.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const user = result.user;
  // ...
}).catch((error) => {
  // Handle Errors here.
  // ...
});

linkWithPopup(auth.currentUser, provider).then 
*/
