import  React,{ useEffect, useState }  from 'react';
import { Text, View,ScrollView,Dimensions,StyleSheet,ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import Card from './cardcomponent.js';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import ProgressCircle from 'react-native-progress-circle'

export default function DetailsScreen() {
 const [isLoading, setLoading] = useState(false);
 const[isTestloading,setTestloading]=useState(false);
  const [data, setData] = useState([]);
  const [data1,setData1]=useState([]);
  const [data2,setData2]=useState([]);
  let newdata=[];let obj={};let carddata=[],st=[];
	useEffect( () => {
	 	async function fetchdropdowndata(){
     const res=await fetch('https://api.covid19india.org/state_district_wise.json');
      res
      .json()
      .then((res)=>setData(res))
      .catch((error)=>console.log(error))
      .finally(() => setLoading(true));
  }
  fetchdropdowndata();
  });
	function display(item){
		let summary=[];
		let totconfirm=0;
		let totrecovered=0;
		let maxaffected=0;
		let minaffected=99999999;
		let maxrecovered=0;
		let minrecovered=9999999;
		let totobj={};
		let confirm=0;
		let recovered=0;
		let maxaffectarea="";
		let minaffectarea="";
		let maxrecoverarea="";
		let minrecoverarea="";
          (Object.keys(data[item.name].districtData)).filter(function(value,index){
          	 confirm=data[item.name].districtData[value].confirmed;
          	 recovered=data[item.name].districtData[value].recovered;
          	totconfirm=totconfirm+confirm;
          	totrecovered=totrecovered+recovered;
          	if(confirm>maxaffected){
          		maxaffected=confirm;
          		maxaffectarea=value;
          	}
          	if(confirm<minaffected){
          		minaffected=confirm;
          		minaffectarea=value
          	}
          	if(recovered>maxrecovered){
          		maxrecovered=recovered;
          		maxrecoverarea=value;
          	}
          	if(recovered<minrecovered){
          		minrecovered=recovered;
          		minrecoverarea=value;
          	}
                if(index%2==0){
               carddata.push(<Card name={value} confirmed ={confirm}  recovered ={recovered} tcolor="#ffffff" bcolor="#3f7afb"/>);
                }else{
                carddata.push(<Card name={value}  confirmed ={confirm} recovered ={recovered} tcolor="#3f7afb" bcolor="#ffffff"/>);
                }
          })
          summary.push(totconfirm);summary.push(totrecovered);summary.push(maxaffected);summary.push(maxaffectarea);summary.push(minaffected);summary.push(minaffectarea);summary.push(maxrecovered);summary.push(maxrecoverarea);summary.push(minrecovered);summary.push(minrecoverarea);
          setData2(summary);
         return carddata;
	}
	function gcd(n1,n2){
 	while(n1!=n2)
    	{
        if(n1 > n2)
            n1 -= n2;
        else
            n2 -= n1;
    	}
	return n1;
	}
	const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#3f7afb',height:6,borderRadius:20,width:190 }}
    style={{ backgroundColor: '#ffffff',elevation:0}}
    renderLabel={({ route, focused, color }) => (
    <Text style={{ color:'#000000',fontWeight: "bold" }}>
      {route.title}
    </Text>
  )}
  />
);
	const FirstRoute = () => (
   <View style={[styles.scene, { backgroundColor: '#f5f6fa' }]} >
   <View style={{alignItems: 'center',height:70,width:330,marginLeft:32,marginTop:20,backgroundColor:'#ffffff',borderRadius:10,elevation:10, borderLeftColor:"#3f7afb",borderLeftWidth:5}}>
    <Text style={{marginLeft:-160,marginTop:10,fontWeight:'bold',color:'#3f7afb'}}>Confirm/Recover Ratio</Text>
    <Text style={{marginLeft:220,marginTop:-20,fontWeight:'bold',color:'#b4b4c1',fontSize:18}}>{(data2[0]&&data2[1])?(Math.round(data2[0]/gcd(data2[0],data2[1]))+':'+Math.round(data2[1]/gcd(data2[0],data2[1]))):'0:0'}</Text>
   </View>
   <View style={{alignItems: 'center',height:70,width:330,marginLeft:32,marginTop:20,backgroundColor:'#ffffff',borderRadius:10,elevation:10, borderLeftColor:"#3f7afb",borderLeftWidth:5}}>
  <Text style={{marginLeft:-170,marginTop:10,fontWeight:'bold',color:'#3f7afb'}}>Max Affected Percent</Text>
  <View style={{marginLeft:250,marginTop:-30}}>
    <ProgressCircle
            percent={(data2[2]&&data2[0])?Math.round((data2[2]/data2[0])*100):0}
            radius={34}
            borderWidth={8}
            color="#ffa726"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{(data2[2]&&data2[0])?Math.round((data2[2]/data2[0])*100):0}%</Text>
        </ProgressCircle>
         <Text style={{marginTop:-20,marginLeft:-245,color:'#b4b4c1',fontWeight:'bold'}}>{data2[3]?data2[3]:'Unknown'} | {data2[2]?data2[2]:0}</Text>
        </View>

   </View>
   <View style={{flexDirection:'row', flexWrap:'wrap',alignItems: 'center',height:70,width:330,marginLeft:32,marginTop:20,backgroundColor:'#ffffff',borderRadius:10,elevation:10,
    borderLeftColor:"#3f7afb",borderLeftWidth:5}}>
   <Text style={{marginLeft:10,marginTop:10,fontWeight:'bold',color:'#3f7afb'}}>Max Recovered Percent</Text>
   <View style={{marginLeft:255,marginTop:-60}}>
    <ProgressCircle
            percent={(data2[6]&&data2[1])?Math.round((data2[6]/data2[1])*100):0}
            radius={34}
            borderWidth={8}
            color="#86cd96"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{(data2[6]&&data2[1])?Math.round((data2[6]/data2[1])*100):0}%</Text>
        </ProgressCircle>
         <Text style={{marginTop:-20,marginLeft:-245,color:'#b4b4c1',fontWeight:'bold'}}>{data2[7]?data2[7]:'Unknown'} | {data2[6]?data2[6]:0}</Text>
        </View>
   </View>
   
   </View>
);
 
const SecondRoute = () => (
 <View style={[styles.scene, { backgroundColor: '#f5f6fa' }]} >
  <View style={{alignItems: 'center',height:220,width:330,marginLeft:32,marginTop:30,backgroundColor:'#ffffff',borderRadius:10,elevation:10}}>
  <StackedBarChart
    data={{
      labels: ['Affected', 'Recovered'],
                legend: ['TotAff/Recover..', 'MaxAff/Recov..'],
                data: [[data2[0]?data2[0]:10, data2[2]?data2[2]:10],[data2[1]?data2[1]:10, data2[6]?data2[6]:10] ],
                barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
    }}
    width={320} // from react-native
    height={200}
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
   </View>
  </View>
);
 
const initialLayout = { width: Dimensions.get('window').width };
const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Insights' },
    { key: 'second', title: 'Summary' },
  ]);
 
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  if(!isLoading){
	return(
		<View style={{flex:1,padding:20,justifyContent: "center"}}>
		<ActivityIndicator size="large" color="#0000ff"/>
		</View>
		);
}		
  return isLoading  && (
    <View style={{ flex: 1,backgroundColor:"#ffffff"}}>
    <View style={{height:360,marginTop:60,backgroundColor:"#ffffff"}}>
    { (Object.keys(data)).filter(function(value,index){
                      obj={};
                      obj.id=index;
                      obj.name=value;
                      newdata.push(obj);
                      })
      }
     <SearchableDropdown
          onTextChange={text => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={item => setData1(display(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#ffffff',
            borderRadius:12,
            width:360,
            marginLeft:14
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
           backgroundColor: '#ffffff',
            borderRadius:12,
            width:360,
            marginLeft:14,
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //single dropdown item's text style
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={newdata}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="Try Searching Here ....."
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />

    { data1.length>0 ?<ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false}>
     {data1}
     </ScrollView>:<View style={{flex:1,paddingLeft:170,justifyContent: "center",backgroundColor:'#ffffff',paddingTop:130}}>
    <AntDesign name="clockcircleo" size={68} color="#dddd" />
    <Text style={{color:'#dddd',paddingRight:115}}>No Preview Available</Text>
    </View> }
     </View>
     <View style={{flex:1}}>
      {data1.length>0?<TabView renderTabBar={renderTabBar} 
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />:null}
     </View>
    </View>
  );
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
