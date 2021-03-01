import React from 'react';
import {Text, Button, StyleSheet, View, Image, TextInput, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

class StudentHome extends React.Component{

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
        <TextInput placeholder=" Search Company... (Press enter to search)" onSubmitEditing={this.search} onChangeText={(text)=>{this.setState({search: text})}} style={{borderBottomWidth: 2,}} returnKeyType="search" />
        <Text style={styles.welcomeback}>Welcome Back,</Text>
        <Text style={styles.welcomebackname}>{username}</Text>
        <Image source={require('../assets/laptopcartoon.png')} style={styles.imagelaptop} />
        </View>
        <Button title="Go to my Profile" onPress={()=>this.props.navigation.navigate('Profile', {username: username})} />
        </>);
    }

    search=()=>{
        firebase.database().ref('company/'+this.state.search).once('value', (snapshot)=>{
        var exists = snapshot.val();
        if(exists === ' ' || exists === '' || exists === null){
            Alert.alert("This company does not exist.")
        }else{
            const {username} = this.props.route.params;
            var cname = snapshot.val().fullname;
            this.props.navigation.navigate('ApplyCompany', {cname: cname, username: username})
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
  
    return <StudentHome {...props} navigation={navigation} />;
  }