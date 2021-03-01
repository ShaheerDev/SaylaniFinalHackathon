import React from 'react';
import {Text, View, Button, Alert, NativeModules, BackHandler} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fullname: ' ',
            age: ' ',
            xp: ' ',
            title: ' ',
            highestq: ' ',
        }
    }

    render(){
        const { username } = this.props.route.params;
        firebase.database().ref('students/'+username).once('value', (snapshot)=>{
        this.setState({age: snapshot.val().age, fullname: snapshot.val().fullname, xp: snapshot.val().overallxp, title: snapshot.val().jobtitle, highestq: snapshot.val().qualification})
        });
        return(<>
            <Text style={{position: 'relative', top: 70, left: 15,fontSize: 26}}>My Profile:</Text>
            <View style={{position: 'relative', top: 100, left: 15}}>
            <Text><Text style={{fontWeight: 'bold'}}>Username:</Text> <Text>{username}</Text></Text>
            <Text><Text style={{fontWeight: 'bold'}}>Full name:</Text> <Text>{this.state.fullname}</Text></Text>
            <Text><Text style={{fontWeight: 'bold'}}>Job title:</Text><Text>{this.state.title}</Text></Text>
            <Text><Text style={{fontWeight: 'bold'}}>Overall Experience:</Text> <Text>{this.state.xp}</Text></Text>
            <Text><Text style={{fontWeight: 'bold'}}>Highest Qualification:</Text> <Text>{this.state.highestq}</Text></Text>
            </View>
            <View style={{position: 'absolute', bottom: 1, left: 1, right: 1,}}>
            <Button title="Go to Home" onPress={()=>{this.props.navigation.navigate('Home', {username: username})}} />
            </View>
        </>)
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <Profile {...props} navigation={navigation} />;
  }