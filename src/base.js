import Rebase from 're-base'
import firebase from 'firebase'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCf8RlhZatVoHbONL13fPNTJ95aR3QmOUc',
  authDomain: 'catch-of-the-day-philip-balbas.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-philip-balbas.firebaseio.com',
})

const base = Rebase.createClass(app.database())

export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
export const githubAuthProvider = new firebase.auth.GithubAuthProvider()
export const auth = firebase.auth()
export const database = firebase.database()
export default base
