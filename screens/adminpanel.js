import React from 'react';
import {Text, View, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

class AdminPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = { list: [], }
    }

    componentDidMount(){
        this.work()
    }

    work=()=>{
        firebase.database().ref('students').on('child_added', (childSnapshot)=>{  
        var snap = childSnapshot.val();
        var newStateArray = this.state.list.slice();
        newStateArray.push({id: this.state.list.length + 1, username: snap.username});
        this.setState({list: newStateArray,});
        });
    }

    render(){
        return(<>
            <View style={{flex: 1, backgroundColor: '#564d4d'}}>
            <Text style={{fontSize: 22, textAlign: 'center', marginBottom: 10}}>USERS:</Text>
            {this.state.list.map((item) => {
          return(
            <View key={item.id}  style={{borderBottomColor: 'black',borderBottomWidth: 5, marginBottom: 20}}>
              <Text style={{fontSize: 20, marginLeft: 20}}>{item.username}</Text>
            </View>
          )})}
            </View>
            <View style={{position: 'absolute', bottom: 1, left: 1, right: 1,}}>
            <Button title="Go back" onPress={()=>{this.props.navigation.goBack();}} />
            </View>
        </>)
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <AdminPanel {...props} navigation={navigation} />;
  }