import  React, { useEffect, useState }  from 'react';
import { Text, View,  Dimensions,ActivityIndicator,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function StatsScreen() {
	const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const month= ["Jan", "Feb", "Mar", "Apr", "May", "June","july","aug","sep","oct","nov","dec"];
  const label=[];
  const confirmed=[];
  const recovered=[];
  const deaths=[];
	 useEffect( () => {
	 	async function fetchdata(){
     const res=await fetch('https://api.covid19api.com/dayone/country/india');
      res
      .json()
      .then((res)=>setData(res))
      .catch((error)=>console.log(error))
      .finally(() => setLoading(true));
  }
  fetchdata();
  });
	
if(!isLoading){
	return(
		<View style={{flex:1,padding:20,justifyContent: "center"}}>
		<ActivityIndicator size="large" color="#0000ff"/>
		</View>
		);
}		
   
  return isLoading && (
    <ScrollView scrollEventThrottle={16}>
    <View>
    <View>{data.filter(function(value,index){
 if(index>=data.length-7){
   var datelabel=new Date(data[index].Date);
	 	var newdate= datelabel.getDate()+'-'+ month[datelabel.getMonth()];
	  	label.push(newdate);
  	confirmed.push(data[index].Confirmed);
	 	recovered.push(data[index].Recovered);
		deaths.push(data[index].Deaths);
 }
})}
    </View>

      <LineChart
    data={{
      labels:label,
      datasets: [
        {
          data:confirmed,
        }
      ]
    }}
    width={Dimensions.get("window").width} 
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
   <BarChart
    data={{
      labels:label,
      datasets: [
        {
          data:recovered
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#66b0ff",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
        elevation:10
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
   <LineChart
    data={{
      labels:label,
      datasets: [
        {
          data:deaths,
           strokeWidth: 2,
        }
      ]
    }}
    width={Dimensions.get("window").width} 
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#a7acb1",
      backgroundGradientTo: "#a7acb1",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  <PieChart
  data={[{
    name: "Confirmed",
    population: confirmed[confirmed.length-1],
    color: "#ffa726",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Recovered",
    population:recovered[recovered.length-1],
    color: "#66b0ff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Deaths",
    population: deaths[deaths.length-1],
    color: "#a7acb1",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }]}
  width={Dimensions.get("window").width}
  height={220}
  chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute
/>
    </View>
 </ScrollView>
 );

}