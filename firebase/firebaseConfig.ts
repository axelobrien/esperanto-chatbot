import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAHHi1Hq-DAlWGCEoSdlt8A4OHiSOhgD_E",
  authDomain: "gpt-sass-bot.firebaseapp.com",
  projectId: "gpt-sass-bot",
  storageBucket: "gpt-sass-bot.appspot.com",
  messagingSenderId: "605489484246",
  appId: "1:605489484246:web:84cdf506294960fd0a9477",
  measurementId: "G-B2PCT8NKL8"
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

turnOnLocalEmulators()

export { app, auth, db, functions, storage }
