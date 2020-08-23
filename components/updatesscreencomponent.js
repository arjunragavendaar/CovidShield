import * as React from 'react';
import { Text, View,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function UpdatesScreen() {
  return (
  	
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#e8e8e8' }}>
      <View style={{alignItems: 'center',height:340,width:390,marginLeft:1,marginTop:-410,backgroundColor:'#3f7afb',borderRadius:20,elevation:10,borderBottomLeftRadius:40,borderBottomRightRadius:40}}>
    <View style={{alignItems: 'center',height:290,width:370,marginTop:140,backgroundColor:'#ffffff',borderRadius:20,elevation:20,overflow: 'visible'}}>
    </View>
    </View>
    </View>

  );
}


 		// <Tab.Screen
      //   name="UpdatesScreen"
      //   component={UpdatesScreen}
      //   options={{
      //     tabBarLabel: 'Updates',
      //     tabBarIcon: ({ color, size }) => (
      //       <MaterialCommunityIcons name="update" color={color} size={size} />
      //     ),
      //   }}
      // />