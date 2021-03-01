import React from 'react';
import styles from "./loginstyle";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase'

class AdminLogin extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: ' ',
            password: ' ', 
        }
    }
    
    render(){
        return(

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                <Text style={styles.logoText}>Admin Login</Text>
                  <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text)=>{this.setState({username: text})}} />
                  <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={(text)=>{this.setState({password: text})}} />
                  <Button
                    buttonStyle={styles.loginButton}
                    onPress={() => this.onLoginPress()}
                    title="Login"
                  />
                  <Text onPress={()=> {this.props.navigation.navigate('Login')}} style={{marginTop: 15, marginLeft: 10, color: 'blue'}}>Go to student login</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
        )
    }

    onLoginPress=()=>{
        firebase.database().ref('admin').once('value', (snapshot)=>{
            var username = (snapshot.val() && snapshot.val().username);
            var password = (snapshot.val() && snapshot.val().password);
            if(username === this.state.username && password === this.state.password){
              this.props.navigation.navigate('AdminPanel')
            }else{
              Alert.alert("Username or password is incorrect.")
            }
          });
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <AdminLogin {...props} navigation={navigation} />;
  }