import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: process.env.REACT_APP_FIREB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AuthDomain,
    projectId: process.env.REACT_APP_FB_ProjectID,
    storageBucket: process.env.REACT_APP_FB_StorageBucket,
    messagingSenderId: process.env.REACT_APP_FB_MsgSenderID,
    appId: process.env.REACT_APP_FB_AppID,
    measurementId: process.env.REACT_APP_FB_MeasurementID
  };



class Firebase {
    constructor(){
      app.initializeApp(config);
      this.auth = app.auth()
      this.db = app.firestore()
    }
    login(username , password){
        let user = `${username}@dokobus.in`;
        return this.auth.signInWithEmailAndPassword(user,password);
    }
    logout(){
      return this.auth.signOut();
    }
    async signUp(userSignUpDetails,UserDetails){

      const username = `${userSignUpDetails.username}@dokobus.in`
      await this.auth.createUserWithEmailAndPassword(username,userSignUpDetails.password);
      this.db.collection("users").doc(this.auth.currentUser.uid).set(UserDetails);
      return this.auth.currentUser.updateProfile({
        displayName:UserDetails.fullname
      });
    }
    getCurrentUser(){
      return this.auth.currentUser;
    }

    isInitialized() {
      return new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
      })
    }
    //driver CRUD

    AddNewDriver({driverID,driverName,driverContactNumber,imagePreview}){
      return this.db.collection("drivers").doc(driverID).set({
          name:driverName,
          contactNumber:driverContactNumber,
          displayImage:imagePreview
      })
    
  }
}

export default new Firebase()