import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBLZCBFeDdQ5Fsn1JC_ilgHUKpf3Kuwckc",
  authDomain: "esperanto-chatbot.firebaseapp.com",
  projectId: "esperanto-chatbot",
  storageBucket: "esperanto-chatbot.appspot.com",
  messagingSenderId: "720856462408",
  appId: "1:720856462408:web:11100dfd0bc7f6c9bd547d",
  measurementId: "G-FP3T13R77C"
}

let app: FirebaseApp

if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
  console.log(getApps()[0].options)
}
  
const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)
const storage = getStorage(app)

function connectEmulators(host: string) {
  connectAuthEmulator(auth, `http://${host}:9099`, {disableWarnings: true})
  connectFirestoreEmulator(db, host, 8080)
  connectStorageEmulator(storage, host, 9199)
  connectFunctionsEmulator(functions, host, 5001)
}

function turnOnLocalEmulators() {
  if (typeof window !== 'undefined') {
    switch (window.location.hostname) {
      case 'localhost':
        connectEmulators('localhost')
        break
      case '127.0.0.1':
        connectEmulators('127.0.0.1')
        break
      case '192.168.0.4':
        connectEmulators('192.168.0.4')
        break
      default:
        break
    }
  } else {
    connectEmulators('localhost')
  }
}

// turnOnLocalEmulators()

export { app, auth, db, functions, storage }
