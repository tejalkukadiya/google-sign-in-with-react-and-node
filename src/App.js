import React from 'react';
import logo from './logo.svg';
import './App.css';
import Script from 'react-load-script';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLoadScript : true,

    }
  }
  handleGooglesignin(e){
    console.log("google sign in");
  }
  componentDidMount(){

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
    // console.log(gapi);
  //   window.gapi.load('auth2', async function() {
  //    let authData = await window.gapi.auth2.init({
  //       client_id:
  //         '403338270635-i1g4gljjqiquafv8nv58el58387mi1co.apps.googleusercontent.com',
  //     })
  //     console.log(authData)
  // });
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
  console.log(googleUser)
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}



  render(){
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
      <div id="myGoogleButton"></div>
      {/* <a className="App-link" onClick={this.handleGooglesignin.bind(this)}> Sign in with Google</a> */}
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
