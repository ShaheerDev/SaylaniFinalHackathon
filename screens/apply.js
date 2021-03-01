import React from 'react';
import {View, Text, TextInput, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

class Apply extends React.Component {

    constructor(props){
        super(props);
        this.state = { jobmessage: ' ', }
    }

    render(){
        const {cname, username} = this.props.route.params;
        return(
            <View style={{backgroundColor: '#564d4d', flex: 1}}>
             <Text style={{fontSize: 38, textAlign: 'center', color: 'white'}}>Apply to</Text>
             <Text style={{fontSize: 38, textAlign: 'center', color: 'white'}}>{cname}</Text>
             <TextInput placeholder='Your message...' style={{marginTop: 50}} onChangeText={(text)=>{this.setState({jobmessage: text,})}} multiline={true}/>
             <Button title="Apply" onPress={this.applyjob}/>
            </View>
        )
    }

    applyjob=()=>{
       if(this.state.jobmessage === null || this.state.jobmessage === ' ' || this.state.jobmessage === ''){
           Alert.alert("Please enter a message...")
       }else{
        const {cname, username} = this.props.route.params;
           firebase.database().ref('messages/'+ cname + '/' + username).set({
               message: this.state.jobmessage + ' - ' + username,
           })
           this.props.navigation.navigate('Home', {username: username,})
       }
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <Apply {...props} navigation={navigation} />;
}