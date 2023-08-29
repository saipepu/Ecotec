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

const Home = ({ navigation }) => {

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
              <Text style={{ fontSize: 14 }}>Care Giver</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 30}}>Joe Merlin</Text>
            </View>
          </View>
         <View style={{ width: 32, height: 32}}>
          <Image source={bellActive} style={{ width: '100%', height: '100%' }} />
         </View>
      </View>
    )
  }

  const Progress = () => {
    return (
      // container
      <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 12, }}>
        {/* upper part */}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderRadius: 12, backgroundColor: color.secondary, paddingHorizontal: 18, paddingVertical: 12 }}>
          {/* left */}
          <View style={{ display: 'flex', alignItems: 'flex-start', gap: 8}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Weekly Progress</Text>
            <Text style={{ fontSize: 14, color: color.black }}>Carbon Footprint Reducing</Text>
          </View>
          {/* right */}
          <View style={{ width: 80, height: 80, padding: 2}}>
            <View style={{ position: 'absolute', top: 0, left: 0, width: '90%', height: '90%', borderRadius: 100, borderWidth: 8, borderColor: color.primary, transform: [{
              translateX: 50}, {translateY: 50}
            ], left: -47, top: -47 }}>
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 100, borderWidth: 10, borderColor: color.primary, opacity: 0.3 }}>
            </View>
            <View style={{ width: '100%', height: '100%', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold'}}>76%</Text>
            </View>
          </View>
        </View>
        {/* lower part */}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12}}>
          {/* left */}
          <View style={{ flex: 1, display: 'flex' , flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  backgroundColor: color.themeOrange, borderRadius: 12, padding: 12, gap: 12 }}>
            {/* icon */}
            <View style={{ width: 32, height: 32, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: 'white', opacity: 0.5 }}>
              <Image source={star} style={{ width: '60%', height: '60%' , resizeMode: 'contain'}} />
            </View>
            {/* point */}
            <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold'}}>2756</Text>
              <Text style={{ fontSize: 14, color: color.dark }}>Total Points</Text>
            </View>
          </View>
          {/* left */}
          <View style={{ flex: 1, display: 'flex' , flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  backgroundColor: color.themePurple, borderRadius: 12, padding: 12, gap: 12 }}>
            {/* icon */}
            <View style={{ width: 32, height: 32, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: 'white', opacity: 0.5 }}>
              <Image source={task} style={{ width: '60%', height: '60%' , resizeMode: 'contain'}} />
            </View>
            {/* point */}
            <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold'}}>3/6</Text>
              <Text style={{ fontSize: 14, color: color.dark }}>Daily Tasks</Text>
            </View>
          </View>

        </View>
      </View>
    )
  }

  const QuickTasks = () => {

    const Items = ({ image, caption }) => {
      return (
        <TouchableOpacity style={{ width: 90, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        onPress={() => caption == 'Food & Drinks' ? navigation.navigate('Restaurants') : ""}
        >
          <View style={{ width: '100%', height: 80, backgroundColor: color.secondary, marginBottom: 8, borderRadius: 15}}></View>
          <Text style={{ fontSize: 10, color: color.dark}}>{caption}</Text>
        </TouchableOpacity>
      )
    }

    return(
      <View style={{ width: '100%', display: 'flex', gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Categories</Text>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Items caption={'Food & Drinks'}/>
          <Items caption={'Outdoors'}/>
          <Items caption={'Transportation'}/>
          <Items caption={'Water'}/>
        </View>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Items caption={'Office'}/>
          <Items caption={'Energy'}/>
          <Items caption={'Shopping'}/>
          <Items caption={'Go Greener'}/>
        </View>
      </View>
    )
  }
  
  const GroupActivities = () => {
    return (
      <View style={{ width: '100%', display: 'flex', gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Group Activities</Text>
        <ScrollView horizontal={true} persistentScrollbar={false} style={{ overflow: 'visible'}} showsHorizontalScrollIndicator={false}>
            <View style={{ width: 200, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 15, overflow: 'hidden', backgroundColor: 'white', marginRight: 12}}>
              <View style={{ width: '100%', height: 100, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                <Image source={gp_act_1} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
              </View>
              <View style={{ width: '100%', paddingHorizontal: 12, paddingVertical: 12}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', width: '100%', flexWrap: 'wrap' }}>Discussion with Family Members</Text>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{ fontSize: 8, color: color.black}}>2 members</Text>
                  <Text style={{ fontSize: 8, color: color.black}}>2 members</Text>
                </View>
              </View>
            </View>
            <View style={{ width: 200, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 15, overflow: 'hidden', backgroundColor: 'white'}}>
              <View style={{ width: '100%', height: 100, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                <Image source={gp_act_2} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
              </View>
              <View style={{ width: '100%', paddingHorizontal: 12, paddingVertical: 12}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', width: '100%', flexWrap: 'wrap' }}>Discussion with Family Members</Text>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{ fontSize: 8, color: color.black}}>2 members</Text>
                  <Text style={{ fontSize: 8, color: color.black}}>2 members</Text>
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
        <QuickTasks />
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