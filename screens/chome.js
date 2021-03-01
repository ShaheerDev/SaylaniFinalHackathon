import React from 'react';
import {Text, Button, StyleSheet, View, Image, TextInput, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

class CompanyHome extends React.Component{

    constructor(props){
    super(props);
    this.state = {
        search: '',
    }    
    }

    render(){
        const {username} = this.props.route.params;
        const { search } = this.state;
        return(<>
        <View style={styles.background}>
        <TextInput placeholder=" Search Student Username... (Press enter to search)" onSubmitEditing={this.search} onChangeText={(text)=>{this.setState({search: text})}} style={{borderBottomWidth: 2,}} returnKeyType="search" />
        <Text style={styles.welcomeback}>Welcome Back,</Text>
        <Text style={styles.welcomebackname}>Let's Find Students!</Text>
        <Image source={require('../assets/laptopcartoon.png')} style={styles.imagelaptop} />
        </View>
        <Button title="See new Applications" onPress={()=>this.props.navigation.navigate('CProfile', {username: username})} />
        </>);
    }

    search=()=>{
        firebase.database().ref('students/'+this.state.search).once('value', (snapshot)=>{
        var exists = snapshot.val();
        if(exists === ' ' || exists === '' || exists === null){
            Alert.alert("This student does not exist. Please enter the username.")
        }else{
            const {username} = this.props.route.params;
            const idusername = snapshot.val().username;
            this.props.navigation.navigate('CviewProfile', {username: idusername, compname: username});
        }
        });
    }
}

var styles = StyleSheet.create({
   background: {
      flex: 1,
      backgroundColor: '#564d4d'
   },
   welcomeback: {
       marginTop: 8,
       textAlign: 'center',
       fontSize: 34,
       color: 'white',
   },
   welcomebackname: {
    position: 'relative',
    fontSize: 34,
    textAlign: 'center',
    color: 'white',
    textShadowColor:'#585858',
    textShadowOffset:{width: 5, height: 5}, 
},
imagelaptop: {
  width: 350,
  height: 350
},
})

export default function(props) {
    const navigation = useNavigation();
  
    return <CompanyHome {...props} navigation={navigation} />;
  }