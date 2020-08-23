import React, { useEffect, useState } from 'react';
import { Text, View,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import AnimateNumber from '@bankify/react-native-animate-number';

export default function HomeScreen() {
const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
	 useEffect(() => {
     fetch('https://api.covid19api.com/summary')
      .then((response) => response.json())
      .then((json) => {setData(json["Global"])})
      .catch((error) => console.log(error))
      .finally(() => setLoading(true));
  });

if(!isLoading){
	return(
		<View style={{flex:1,padding:20,justifyContent: "center"}}>
		<ActivityIndicator size="large" color="#0000ff"/>
		</View>
		);
}		
  return isLoading &&(
   <View style={{flex:1,justifyContent:"center",backgroundColor:"#fff", alignItems:"stretch"}}>
<View style={{flex:1,backgroundColor:"#ffe3e9",borderRadius:10,elevation:10}}>
<Text style={{fontSize:25, color:"#ff6a89",marginTop:18}}>Confirmed</Text>
<Text style={{fontSize:35, color:"#ff6a89",marginTop:18}}><AnimateNumber value={data["TotalConfirmed"]} countBy={110950}
  timing={(interval, progress) => {
    return interval * (1 - Math.sin(Math.PI*progress) )*10
  }}/></Text>
<MaterialCommunityIcons style={{marginLeft:318,fontSize:75,marginTop:-50}} name="check-circle"color="#ff6a89" />
</View>
<View style={{flex:1,backgroundColor:"#ecf5ff",borderRadius:10,elevation:10,marginTop:10}}>
<Text style={{fontSize:25, color:"#66b0ff"}}>NewActive</Text>
<Text style={{fontSize:35, color:"#66b0ff"}}><AnimateNumber value={data["NewConfirmed"]} countBy={10950}
  timing={(interval, progress) => {
    return interval * (1 - Math.sin(Math.PI*progress) )*10
  }}/></Text>
<MaterialCommunityIcons style={{marginLeft:318,fontSize:75,marginTop:-50}} name="arrow-right-circle"color="#66b0ff" />
</View>
<View style={{flex:1,backgroundColor:"#ddf1e1",borderRadius:10,elevation:10,marginTop:10}}>
<Text style={{fontSize:25, color:"#86cd96"}}>Recovered</Text>
<Text style={{fontSize:35, color:"#86cd96"}}><AnimateNumber value={data["TotalRecovered"]} countBy={10950}
  timing={(interval, progress) => {
    return interval * (1 - Math.sin(Math.PI*progress) )*10
  }}/></Text>
<MaterialCommunityIcons style={{marginLeft:318,fontSize:75,marginTop:-50}} name="autorenew"color="#86cd96" />
</View>
<View style={{flex:1,backgroundColor:"#c8cbce",borderRadius:10,elevation:10,marginTop:10,height:130}}>
<Text style={{fontSize:25, color:"#a7acb1"}}>Deceased</Text>
<Text style={{fontSize:35, color:"#a7acb1"}}><AnimateNumber value={data["TotalDeaths"]} countBy={10950}
  timing={(interval, progress) => {
    return interval * (1 - Math.sin(Math.PI*progress) )*10
  }}/></Text>
<MaterialCommunityIcons style={{marginLeft:318,fontSize:75,marginTop:-50}} name="arrow-down-circle"color="#a7acb1" />
</View>
</View>
  );
}