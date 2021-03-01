import React, { Component } from "react";
import styles from "./loginstyle";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

class CSignup extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      cname: ' ',
      cusername: ' ',
      cpassword: ' ',
    }
  }
  
  render() {
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Company Signup</Text>
            <TextInput placeholder="Company Name" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text)=>{this.setState({cname: text})}} />
            <TextInput placeholder="Company Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text)=>{this.setState({cusername: text})}} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={(text)=>{this.setState({cpassword: text})}} />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Signup"
            />
            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
              title="Goto Student Signup Page..."
              color="#000"
            />
            <Text onPress={()=> {this.props.navigation.navigate('CLogin')}} style={{marginTop: 15, marginLeft: 10, color: 'blue'}}>Login as Company</Text>
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
    if(this.state.cname === " " || this.state.cusername === ' ' || this.state.cpassword === ' '){
      Alert.alert('Please fill in all the fields.')
    }else{
      firebase.database().ref('company/'+this.state.cusername).once('value', (snapshot)=>{
        var exists = snapshot.val();
        if(exists === ' ' || exists === '' || exists === null){
          firebase.database().ref('company/'+this.state.cusername).set({
            fullname: this.state.cname,
            username: this.state.cusername,
            password: this.state.cpassword,
          })
          this.props.navigation.navigate('CLogin');
        }else{
          Alert.alert('Company username already exists.');
          this.props.navigation.navigate('CSignup');
      }
      });
    }
  }

  onFbLoginPress=()=>{
   this.props.navigation.navigate('Signup')
  }
}

export default function(props) {
  const navigation = useNavigation();

  return <CSignup {...props} navigation={navigation} />;
}