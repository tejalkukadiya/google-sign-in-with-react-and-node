import React from 'react';
import logo from './logo.svg';
import './App.css';
import Script from 'react-load-script';
import { toast } from 'react-toastify';
const axios = require('axios');
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLoadScript : true,

    }
  }
  notify = () => {
    console.log("hererer")
    toast("Default Notification !");
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });

    // toast.error("Error Notification !", {
    //   position: toast.POSITION.TOP_LEFT
    // });

    // toast.warn("Warning Notification !", {
    //   position: toast.POSITION.BOTTOM_LEFT
    // });

    // toast.info("Info Notification !", {
    //   position: toast.POSITION.BOTTOM_CENTER
    // });

    // toast("Custom Style Notification with css class!", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    //   className: 'foo-bar'
    // });
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }
   
  handleScriptError() {
    this.setState({ scriptError: true })
  }
   
   handleScriptLoad() {

    this.setState({ scriptLoaded: true,isLoadScript:false })
    window.gapi.load('auth2', () => {

      window.gapi.auth2.init({ client_id: '403338270635-i1g4gljjqiquafv8nv58el58387mi1co.apps.googleusercontent.com' }).then(() => {

          // DO NOT ATTEMPT TO RENDER BUTTON UNTIL THE 'Init' PROMISE RETURNS
          this.renderButton();

      });
  })
}
renderButton(){
  window.gapi.signin2.render('myGoogleButton',{
      'scope': 'profile email',
      'width': 240,
      'height': 40,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': (data) => {this.onSignIn(data)},
      'onfailure': (data) => {alert("couldn't fetch user data.")}
  });
}
onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  // console.log('Full Name: ' + profile.getName());
  // console.log('Given Name: ' + profile.getGivenName());
  // console.log('Family Name: ' + profile.getFamilyName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var userId = profile.getId();
  var full_Name = profile.getName();
  var profile_image =profile.getImageUrl();
   var emailId = profile.getEmail();
  var id_token = googleUser.getAuthResponse().id_token;
  var dataTosend ={
    userId:userId,
    full_Name:full_Name,
    profile_image:profile_image,
    email:emailId,
    user_token:id_token,
  }
  axios.post('http://localhost:3001/api/storeUsers',dataTosend)
  .then(res => 
    {
      console.log(res);
      alert("data added successfully");

    }
  )
}



  render(){
  return (
    <div className="App">
      <div id="myGoogleButton"></div>
     {this.state.isLoadScript!==false?
      <Script
          url="https://apis.google.com/js/platform.js" 
          async defer
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
      />:''}
    </div>
  )
}
}
export default App;
