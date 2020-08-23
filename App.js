import React, { useEffect, useState }  from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import HomeScreen from './components/homescreencomponent.js';
import UpdatesScreen from './components/updatesscreencomponent.js';
import DetailsScreen from './components/detailsscreencomponent.js';
import StatsScreen from './components/statsscreencomponent.js';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
     <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          tabBarLabel: 'Deep Dive',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="database-refresh" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="StatsScreen"
        component={StatsScreen}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="barcode" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setLoading] = useState(false);
  setTimeout(() => {setLoading(true)}, 1000)
  if(!isLoading){
  return(
    <View style={{flex:1,paddingLeft:160,justifyContent: "center",backgroundColor:'#3f7afb',paddingTop:-20}}>
    <AntDesign name="Safety" size={78} color="#ffffff" />
    </View>
    );
} 
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}