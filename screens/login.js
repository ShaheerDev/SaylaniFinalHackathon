import React, { Component } from "react";
import styles from "./loginstyle";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase'

class Login extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: ' ',
      password: ' ',
    }
  }
  
  render() {
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Student Login</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text)=>{this.setState({username: text})}} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={(text)=>{this.setState({password: text})}} />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
              title="Login as Company..."
              color="#000"
            />
            <Text onPress={()=> {this.props.navigation.navigate('Signup')}} style={{marginTop: 15, marginLeft: 10, color: 'blue'}}>Signup</Text>
            <Text onPress={()=> {this.props.navigation.navigate('Adminlogin')}} style={{position: 'absolute', bottom: 1, left: 1, right: 1, color: 'blue'}}>ADMIN PORTAL</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  componentDidMount=()=>{
  
  }

  componentWillUnmount=()=>{

  }

  onLoginPress=()=>{
   firebase.database().ref('students/'+this.state.username).once('value', (snapshot)=>{
     var username = (snapshot.val() && snapshot.val().username);
     var password = (snapshot.val() && snapshot.val().password);
     if(username === this.state.username && password === this.state.password){
       this.props.navigation.navigate('Home', {username: username});
     }else{
       Alert.alert("Username or password is incorrect.")
     }
   });
  }

  onFbLoginPress=()=>{
   this.props.navigation.navigate('CLogin')
  }
}

export default function(props) {
  const navigation = useNavigation();

  return <Login {...props} navigation={navigation} />;
}