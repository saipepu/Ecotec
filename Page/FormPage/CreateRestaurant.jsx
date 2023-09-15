import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderNav from '../../components/HeaderNav'
import * as ImagePicker from 'expo-image-picker'
import color from '../../theme/colors';
import { API } from '../../api/api'
import SelectDropdown from 'react-native-select-dropdown';
import AppStateContext from '../../hook/AppStateContext';
import { CreateRestauant as CreateRestaurantAPI } from '../../api/Restaurants/CreateRestaurant';

const CreateRestaurant = ({ navigation }) => {

  const Form = () => {

      const [image, setImage] = useState()
      const [serverImage, setServerImage] = useState()
      const context = useContext(AppStateContext)
      const { contextCurrentUser } = context

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

      let initialValue = {
          name: '',
          location: '',
          schedule: '',
          image_name: '1',
          chef_id: contextCurrentUser?.id,
      }
        
      const [formValue, setFormValue] = useState(initialValue)
      const setName = (value) => {
        setFormValue({...formValue, name: value})
      }

      const setLocation = (value) => {
        setFormValue({...formValue, location: value})
      }

      const setSchedule = (value) => {
        setFormValue({...formValue, schedule: value})
      }

      const handleChoosePhoto = () => {
        pickImage()
      }
      
      const uploadImage = async () => {
        try {
          const formData = new FormData();
          formData.append('image', {
            uri: image,
            name: 'vegan_burger.jpg',
            type: 'image/jpeg'
          })
          const response = await fetch(`${API}/upload`, {
            method: "POST",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            body: formData
          })
          .then(data => data.json())
          .then(result => {
            setServerImage(API+"/"+result?.message)
            return API+"/"+result?.message
          })

          return response
        } catch (err) {
          console.log('Err uploading image: ', err)
        }
      }

      const handleSubmit = () => {
        console.log(formValue, image, 106)
        if(Object.values(formValue).includes("") || image == "") {
          alert("All fields are required!")
        } else {
          console.log('Ready to go')
          uploadImage()
          .then(data => {
            console.log(data, 107)
              formValue.image_name = data
              CreateRestaurantAPI(formValue)
              .then(data => {
                if(data.success) {
                  console.log('Create New Restaurant Successfully!')
                  alert('You have created a New Restaurant.')
                  navigation.navigate('ChefProfile')
                }
              })
              .catch(err => console.log(err, 'here'))
            }
          )
          .catch(err => console.log(err))
        }
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
            <Text style={{ fontSize: 16 }}>Location</Text>
            <TextInput
              style={{ width: '100%', fontSize: 16, padding: 12, backgroundColor: '#cbcbcb80', borderRadius: 12 }}
              onChangeText={newValue => setLocation(newValue)}
              value={formValue.price}
              placeholder='Bangkok, Siam Center'
            />
          </View>
          <View style={{ width: '100%', display: 'flex', gap: 4 }}>
            <Text style={{ fontSize: 16 }}>Schedule</Text>
            <TextInput
              style={{ width: '100%', fontSize: 16, padding: 12, backgroundColor: '#cbcbcb80', borderRadius: 12 }}
              onChangeText={newValue => setSchedule(newValue)}
              value={formValue.points}
              placeholder='10AM - 10PM'
            />
          </View>
          <View style={{ width: '100%', display: 'flex', gap: 4 }}>
            <Text style={{ fontSize: 16 }}>Upload Image</Text>
            <View style={{ width: '100%', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: "#cbcbcb", borderRadius: 20, padding: 12, paddingBottom: 4 }}>
              {image && <Image source={{ uri: image }} style={{ flex: 1, width: '100%', borderRadius: 15 }} resizeMode="cover"/>}
              <Button title={'Choose'} onPress={() => handleChoosePhoto()} />
            </View>
          </View>
          <TouchableOpacity
            style={ styles.button }
            onPress={() => handleSubmit()}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '500' }}>Create</Text>
          </TouchableOpacity>
        </View>
      )
  }

  return (
    <View style={styles.container}>
      <HeaderNav backTo={'ChefProfile'} navigation={navigation} right={false}/>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Create a Restaurant</Text>
          <Form />
      </ScrollView>
    </View>
  )
}

export default CreateRestaurant

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: 56,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: color.primary,
    shadowOffset: {width: 0, height: 5},  
    shadowColor: color.shadowGreen,  
    shadowOpacity: 1,
    shadowRadius: 0,
  }
})