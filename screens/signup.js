import React, { Component } from "react";
import styles from "./loginstyle";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase'

class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
     fullname: ' ',
     username: ' ',
     password: ' ',
     age: ' ',
     title: ' ',
     overallxp: ' ',
     highestq: ' ',
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Student Signup</Text>
          <TextInput placeholder="Student Name" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text)=>{this.setState({fullname: text})}}/>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text)=>{this.setState({username: text})}}/>
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={(text)=>{this.setState({password: text})}}/>
            <TextInput placeholder="Job title" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text)=>{this.setState({title: text})}}/>
            <TextInput placeholder="Total Experience" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text)=>{this.setState({overallxp: text})}}/>
            <TextInput placeholder="Highest Qualification" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text)=>{this.setState({highestq: text})}}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Signup"
            />
            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
              title="Goto Company Signup Page..."
              color="#000"
            />
            <Text onPress={()=> {this.props.navigation.navigate('Login')}} style={{marginTop: 15, marginLeft: 10, color: 'blue'}}>Login as Student</Text>
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
    if(this.state.fullname === " " || this.state.highestq === ' ' || this.state.password === ' ' || this.state.title === ' ' || this.state.overallxp === ' '){
      Alert.alert('Please fill in all the fields.')
    }else if(this.state.password.length < 6){
      Alert.alert('Please enter a longer password.')
    }else if(this.state.overallxp > 100){
      Alert.alert('Please enter your correct total experience.')
    }else if(this.state.age > 500){
      Alert.alert('Please enter the correct age.')
    }else{
      firebase.database().ref('students/'+this.state.username).once('value', (snapshot)=>{
        var exists = snapshot.val();
        if(exists === ' ' || exists === '' || exists === null){
          firebase.database().ref('students/'+this.state.username).set({
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password,
            age: this.state.age,
            jobtitle: this.state.title,
            overallxp: this.state.overallxp,
            qualification: this.state.highestq,
          });
          this.props.navigation.navigate('Login');
      }else{
        Alert.alert('Student username already exists.');
        this.props.navigation.navigate('Signup');
      }
      });
    }
  }

  onFbLoginPress=()=>{
   this.props.navigation.navigate('CSignup')
  }
}

export default function(props) {
  const navigation = useNavigation();

  return <Signup {...props} navigation={navigation} />;
}