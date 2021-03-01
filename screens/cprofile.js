import React from 'react';
import {Text, View, Button, ScrollView} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

class ApplyCompany extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list: [],
        }
    }

    componentDidMount(){
        this.work()
    }

    work=()=>{
        const {username} = this.props.route.params;
        firebase.database().ref("messages/"+username).on('child_added', (childSnapshot)=>{  
        var snap = childSnapshot.val();
        var newStateArray = this.state.list.slice();
        newStateArray.push({id: this.state.list.length + 1, message: snap.message});
        this.setState({list: newStateArray,});
        });
    }

    render(){
        const { username, cname } = this.props.route.params;
        return(<><ScrollView>
             <Text style={{textAlign: 'center', fontSize: 22, marginBottom: 30}}>Applications You have Recieved...</Text>
             {this.state.list.map((item) => {
          return(
            <View key={item.id}  style={{borderBottomColor: 'black',borderBottomWidth: 5, marginBottom: 20}}>
              <Text style={{fontSize: 20, marginLeft: 20}}>{item.message}</Text>
            </View>
          )})}
        </ScrollView>
                <View style={{position: 'absolute', bottom: 1, left: 1, right: 1}}>
                <Button title="Go back..." onPress={()=>this.props.navigation.goBack()}/>
            </View></>)
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <ApplyCompany {...props} navigation={navigation} />;
  }