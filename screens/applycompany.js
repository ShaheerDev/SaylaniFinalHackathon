import React from 'react';
import {Text, View, Button, Alert, NativeModules, BackHandler} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

class ApplyCompany extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            companyname: ' ',
        }
    }

    render(){
        const { cname, username } = this.props.route.params;
        return(<>
            <Text style={{position: 'relative', top: 70, left: 15,fontSize: 26}}>My Profile:</Text>
            <View style={{position: 'relative', top: 100, left: 15}}>
            <Text style={{marginBottom: 20}}><Text style={{fontWeight: 'bold'}}>Company Name:</Text> <Text>{cname}</Text></Text>
            <Button title="Apply." onPress={()=>{this.props.navigation.navigate('Apply', {cname: cname, username: username})}}/>
            </View>
            <View style={{position: 'absolute', bottom: 1, left: 1, right: 1,}}>
            <Button title="Go to Home" onPress={()=>{this.props.navigation.navigate('Home', {username: username})}} />
            </View>
        </>)
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <ApplyCompany {...props} navigation={navigation} />;
  }