import React, { useEffect, useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import HeaderNav from '../../components/HeaderNav'
import PrimaryButton from '../../components/PrimaryButton'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker'

const CreateMenu = ({ navigation }) => {

  const Form = () => {

      const [image, setImage] = useState()

      useEffect(() => {
        (async () => {
          const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        })();
      }, [])

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1
        })
        if(!result?.canceled) {
          setImage(result.assets[0].uri)
        }
      }
      console.log("Image", image)


      let initialValue = {
          name: '',
          price: 0,
          points: 0,
          description: '',
          coverPhoto: ''
      }
        
      const [formValue, setFormValue] = useState(initialValue)

      const setName = (value) => {
        setFormValue({...formValue, name: value})
      }
      const setPrice = (value) => {
        setFormValue({...formValue, price: value})
      }
      const setPoints = (value) => {
        setFormValue({...formValue, points: value})
      }
      const setDescription = (value) => {
        setFormValue({...formValue, description: value})
      }

      const handleChoosePhoto = () => {
        pickImage()
      }

      const setCoverPhoto = (value) => {
        setFormValue({...formValue, coverPhoto: value})
      }
      
      return (
        <View style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12}}>
          <View style={{ width: '100%', display: 'flex', gap: 4 }}>
            <Text style={{ fontSize: 16 }}>Name</Text>
            <TextInput
              style={{ width: '100%', fontSize: 16, padding: 12, backgroundColor: '#cbcbcb80', borderRadius: 12 }}
              onChangeText={newValue => setName(newValue)}
              value={formValue.name}
              placeholder='name'
            />
          </View>
          <View style={{ width: '100%', display: 'flex', gap: 4 }}>
            <Text style={{ fontSize: 16 }}>Price</Text>
            <TextInput
              style={{ width: '100%', fontSize: 16, padding: 12, backgroundColor: '#cbcbcb80', borderRadius: 12 }}
              onChangeText={newValue => setPrice(newValue)}
              value={formValue.price}
              placeholder='6.99'
              keyboardType="numeric"
            />
          </View>
          <View style={{ width: '100%', display: 'flex', gap: 4 }}>
            <Text style={{ fontSize: 16 }}>Points</Text>
            <TextInput
              style={{ width: '100%', fontSize: 16, padding: 12, backgroundColor: '#cbcbcb80', borderRadius: 12 }}
              onChangeText={newValue => setPoints(newValue)}
              value={formValue.points}
              placeholder='25'
              keyboardType='numeric'
            />
          </View>
          <View style={{ width: '100%', display: 'flex', gap: 4 }}>
            <Text style={{ fontSize: 16 }}>Description</Text>
            <TextInput
              style={{ width: '100%', fontSize: 16, padding: 12, backgroundColor: '#cbcbcb80', borderRadius: 12 }}
              onChangeText={newValue => setDescription(newValue)}
              value={formValue.price}
              placeholder='description'
            />
          </View>
          <View style={{ width: '100%', display: 'flex', gap: 4 }}>
            <Text style={{ fontSize: 16 }}>Upload Image</Text>
            <View style={{ width: '100%', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: "#cbcbcb", borderRadius: 20, padding: 12, paddingBottom: 4 }}>
              {image && <Image source={{ uri: image }} style={{ flex: 1, width: '100%', borderRadius: 15 }} resizeMode="cover"/>}
              <Button title={'Choose'} onPress={() => handleChoosePhoto()} />
            </View>
          </View>
          <PrimaryButton text={'Create'} styleConfig={{ width: '100%', marginTop: 'auto' }} />
        </View>
      )
  }

  return (
    <View style={styles.container}>
      <HeaderNav backTo={'ChiefProfile'} navigation={navigation} right={false}/>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20, paddingHorizontal: 20, paddingBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Create a Menu</Text>
          <Form />
      </ScrollView>
    </View>
  )
}

export default CreateMenu

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: 56,
    gap: 24,
  },
})