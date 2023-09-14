import React, { useContext } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import avatar from '../assets/avatar.png'
import bellActive from '../assets/bell-active.png'
import star from '../assets/star.png'
import task from '../assets/task.png'
import gp_act_1 from '../assets/group_activities_1.png'
import gp_act_2 from '../assets/group_activities_2.png'
import color from '../theme/colors'
import FooterNav from '../components/FooterNav'
import Icon from 'react-native-vector-icons/MaterialIcons'
import energy from '../assets/ActivityCategories/energy.png'
import office from '../assets/ActivityCategories/office.png'
import foodDrinks from '../assets/ActivityCategories/foodDrinks.png'
import outdoors from '../assets/ActivityCategories/outdoors.png'
import shopping from '../assets/ActivityCategories/shopping.png'
import transportation from '../assets/ActivityCategories/transportation.png'
import water from '../assets/ActivityCategories/water.png'
import AppStateContext from '../hook/AppStateContext'


const Home = ({ navigation }) => {

  const context = useContext(AppStateContext)
  const { contextCurrentUser, contextRole } = context
  console.log(contextRole, 26)

  const Header = () => {
    return (
      <View style={{
         width: '100%',
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center'
         }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{ width: 60, height: 60, overflow: 'hidden', borderRadius: 1000}}>
              <Image source={avatar} style={{ width: '100%', height: '100%' }}/>
            </View>
            <View style={{ display: 'flex' }}>
              {contextCurrentUser?.level ? (
                <Text style={{ fontSize: 14 }}>Rank: {contextCurrentUser?.level}</Text>
              ) : (<></>)}
              <Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 30}}>{contextCurrentUser?.name}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ fontSize: 18, fontWeight: '200' }}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>
      </View>
    )
  }

  const Progress = () => {
    return (
      // container
      <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 12, }}>
        {/* upper part */}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderRadius: 12, backgroundColor: 'white', paddingHorizontal: 18, paddingVertical: 12 }}>
          {/* left */}
          <View style={{ display: 'flex', alignItems: 'flex-start', gap: 8}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your Weekly Progress</Text>
            <Text style={{ fontSize: 14, color: color.black }}>Carbon Footprint{'\n'}Reducing</Text>
          </View>
          {/* right */}
          <View style={{ width: 80, height: 80, padding: 2}}>
            <View style={{ position: 'absolute', top: 0, left: 0, width: '90%', height: '90%', borderRadius: 100, borderWidth: 12, borderColor: color.primary, transform: [{
              translateX: 50}, {translateY: 50}
            ], left: -46, top: -46 }}>
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 100, borderWidth: 18, borderColor: color.primary, opacity: 0.3 }}>
            </View>
            <View style={{ width: '100%', height: '100%', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold'}}>76%</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const Categories = () => {

    const Items = ({ image, caption, icon}) => {
      return (
        <TouchableOpacity style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        onPress={() => caption == 'Food & Drinks' ? navigation.navigate('Restaurants') : ""}
        >
          <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80, backgroundColor: 'white', marginBottom: 8, borderRadius: 15}}>
            {icon ? <Image source={icon} resizeMode="contain" style={{ width: 45, height: 45 }} />: ""}
          </View>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: color.dark}}>{caption}</Text>
        </TouchableOpacity>
      )
    }

    return(
      <View style={{ width: '100%', display: 'flex', gap: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categories</Text>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8}}>
          <Items caption={'Food & Drinks'} icon={foodDrinks}/>
          <Items caption={'Outdoors'} icon={outdoors}/>
          <Items caption={'Transportation'} icon={transportation}/>
          <Items caption={'Water'} icon={water}/>
        </View>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8}}>
          <Items caption={'Office'} icon={office}/>
          <Items caption={'Energy'} icon={energy}/>
          <Items caption={'Shopping'} icon={shopping}/>
          <Items caption={'Go Greener'} icon={''}/>
        </View>
      </View>
    )
  }
  
  const GroupActivities = () => {
    return (
      <View style={{ width: '100%', display: 'flex', gap: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Group Activities</Text>
        <ScrollView horizontal={true} persistentScrollbar={false} style={{ overflow: 'visible'}} showsHorizontalScrollIndicator={false}>
            <View style={{ width: 200, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 15, overflow: 'hidden', backgroundColor: 'white', marginRight: 12}}>
              <View style={{ width: '100%', height: 100, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                <Image source={gp_act_1} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
              </View>
              <View style={{ width: '100%', paddingHorizontal: 12, paddingVertical: 12}}>
                <Text style={{ fontSize: 16, fontWeight: 'normal', width: '100%', flexWrap: 'wrap' }}>Discussion with Family Members</Text>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{ fontSize: 10, color: color.black}}>2 members</Text>
                  <Text style={{ fontSize: 10, color: color.black}}>+35 Points</Text>
                </View>
              </View>
            </View>
            <View style={{ width: 200, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 15, overflow: 'hidden', backgroundColor: 'white'}}>
              <View style={{ width: '100%', height: 100, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                <Image source={gp_act_2} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
              </View>
              <View style={{ width: '100%', paddingHorizontal: 12, paddingVertical: 12}}>
                <Text style={{ fontSize: 16, fontWeight: 'normal', width: '100%', flexWrap: 'wrap' }}>Discussion with Family Members</Text>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{ fontSize: 10, color: color.black}}>2 members</Text>
                  <Text style={{ fontSize: 10, color: color.black}}>+35 Points</Text>
                </View>
              </View>
            </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={{ width: '100%', height: '100%'}}>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

        <Header />
        <Progress />
        <Categories />
        <GroupActivities />

        <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.navigate('Welcome')}>
          <Text>Back to Welcome</Text>
        </TouchableOpacity>
      </ScrollView>
      <FooterNav navigation={navigation}/>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    paddingTop: 56,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 24,
  },
})