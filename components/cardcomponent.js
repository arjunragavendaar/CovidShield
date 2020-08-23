import * as React from 'react';
import { Text, View,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Card(props) {
  return (
   
     <View style={{height:290,width:170,elevation:10,marginLeft:18,borderWidth:0,borderColor:'#ffffff',borderRadius:20,backgroundColor:props.bcolor}}>
     <View style={{flex:2}}>
     <Text style={{flex:1,paddingLeft:20,paddingTop:20,color:props.tcolor,fontWeight: "bold"}}>{props.name}</Text>
      <MaterialCommunityIcons style={{fontSize:35,marginRight:120,marginBottom:-25}} name="arrow-up-circle" color={props.tcolor} />
      <View>
      <Text style={{fontSize:15,marginLeft:60,marginBottom:25,fontWeight:"bold",color:props.tcolor}}>{props.recovered}</Text>
      </View>
      <View>
      <View>
      <MaterialCommunityIcons style={{fontSize:35,marginRight:120,marginBottom:-28}} name="arrow-down-circle" color={props.tcolor} />
      </View>
      <View>
      <Text style={{fontSize:15,marginLeft:60,marginBottom:25,fontWeight:"bold",color:props.tcolor}}>{props.confirmed}</Text>
      </View>
      </View>
     </View>
     <View style={{alignItems: 'center',height:70,width:70,marginBottom:20,marginLeft:80,backgroundColor:props.tcolor,borderRadius:40,elevation:10}}>
     <View><Text style={{marginTop:15,fontSize:30,fontWeight: "bold",color:props.bcolor}}>{props.name[0]}{props.name[props.name.length-1]}</Text></View>
     </View>
     </View>
  );
}