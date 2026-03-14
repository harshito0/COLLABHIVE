import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCq0Rt1pdX_TFQmOLXkFgRnkd142Vl06UY",
  authDomain: "collabhive-72364.firebaseapp.com",
  projectId: "collabhive-72364",
  storageBucket: "collabhive-72364.firebasestorage.app",
  messagingSenderId: "700567467111",
  appId: "1:700567467111:web:c5265cc3b2301664dd10c2",
  measurementId: "G-477D4SMV1P"
};

// Check if real credentials have been added
export const isFirebaseConfigured =
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "YOUR_API_KEY" &&
  firebaseConfig.projectId !== "YOUR_PROJECT_ID";

let auth;
let db;

if (isFirebaseConfigured) {
  console.log("Initializing Firebase with project:", firebaseConfig.projectId);
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("Firebase Services Ready");
} else {
  console.warn("Firebase not configured - using demo mode");
}

const githubProvider = new GithubAuthProvider();
githubProvider.addScope('repo');
githubProvider.addScope('read:user');

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { auth, db, githubProvider, googleProvider };
