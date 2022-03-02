<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDvO6R70UMgNKUha1OvyA-p0_YTdZVnNyk",
    authDomain: "fir-project-6cfb2.firebaseapp.com",
    projectId: "fir-project-6cfb2",
    storageBucket: "fir-project-6cfb2.appspot.com",
    messagingSenderId: "788871224104",
    appId: "1:788871224104:web:29c125f60179c758bbce1d",
    measurementId: "G-4FFM5RHTZ6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>


npm i firebase
const { Firestore } = require("@firebase/firestore");
// with Commonjs syntax (if using Node)
const firebase = require("firebase/app");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDpLmM79mUqbMDBexFtOQOkSl0glxCW_ds",
  authDomain: "lfasdfkjkjlkjl.firebaseapp.com",
  databaseURL: "https://lfasdlkjkjlkjl.firebaseio.com",
  projectId: "lfasdlkjkjlkjl",
  storageBucket: "lfasdlkjkjlkjl.appspot.com",
  messagingSenderId: "616270824980",
  appId: "1:616270824990:web:40c8b177c6b9729cb5110f",
};

//create a constant variable db (database) so it easier to reference or refer to
const db = firebase.firestore();

/***
 * Group Still is in the process of determining which
 * one to use...leaning more towards Cloud Firestore to
 * collect and store information since it is heavily
 * used with IoT devices and offers an additional
 * layer of security with REST API.
 */


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//Not sure which to use for Cloud Firestore
firebase.initializeApp(FirestoreConfig);
firebase.initializeApp(Firestore);


// Get Analytics
firebase.FirestoreConfig.getAnalytics();

// Declare Collection
const smartPantry = firebase.firestore().collection('food');