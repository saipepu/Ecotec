import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderNav from '../../components/HeaderNav'
import PrimaryButton from '../../components/PrimaryButton'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker'
// import RNFS from 'react-native-fs'
import * as FileSystem from 'expo-file-system'
import color from '../../theme/colors';
import { API } from '../../api/api'
import SelectDropdown from 'react-native-select-dropdown';
import { getAllCategory } from '../../api/Category/getAllCategory'
import AppStateContext from '../../hook/AppStateContext';
import { getRestaurantByChefId } from '../../api/Restaurants/getRestaurantByChefID'
import { CreateMenu as CreateMenuAPI } from '../../api/Menu/CreateMenu';

const CreateMenu = ({ navigation }) => {

  const Form = () => {

      const [image, setImage] = useState()
      const [serverImage, setServerImage] = useState()
      const context = useContext(AppStateContext)
      const { contextCurrentUser } = context
      const [categoryList, setCategoryList] = useState()
      const [restaurant, setRestaurant] = useState()

      useEffect(() => {
        (async () => {
          const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        })();
        getAllCategory()
        .then(data => {
          if(data.success) {
            setCategoryList(data.message)
          }
        })
      }, [])

      useEffect(() => {
        getRestaurantByChefId(contextCurrentUser.id)
        .then(data => {
          if(data.success) {
            console.log(data.message)
            setRestaurant(data.message[0])
          }
        })
        .catch(err => console.log(err))
      }, [contextCurrentUser])
      console.log(restaurant, 50)

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
          price: '',
          points: '',
          image_name: '1',
          category_id: '',
          restaurant_id: restaurant?.id,
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
      const setCategory = (value) => {
        setFormValue({...formValue, category_id: value})
      }
      const setImageName = (value) => {
        console.log(value)
        setFormValue({...formValue, image_name: value})
      }

      const handleChoosePhoto = () => {
        pickImage()
      }

      const setCoverPhoto = (value) => {
        setFormValue({...formValue, coverPhoto: value})
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
            console.log(data, serverImage)
              formValue.image_name = data
              formValue.restaurant_id = restaurant?.id
              console.log(formValue)
              CreateMenuAPI(formValue)
              .then(data => {
                if(data.success) {
                  console.log('Create New Menu Successfully!')
                  alert('You have created a New Menu.')
                  navigation.navigate('ChefProfile')
                }
              })
              .catch(err => console.log(err))
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
            <Text style={{ fontSize: 16 }}>Category</Text>
            <SelectDropdown data={categoryList}
              buttonStyle={{ width: '100%', padding: 12, backgroundColor: '#cbcbcb80', borderRadius: 12, borderWidth: 1, borderColor: color.gray, borderRadius: 10 }}
              buttonTextStyle={{ fontSize: 16, textAlign: 'left' }}
              rowTextStyle={{ fontSize: 16, textAlign: 'left'}}
              onSelect={(selectedItem, i) => {
                setCategory(selectedItem.id)
              }}
              buttonTextAfterSelection={(selectedItem, i) => {
                return selectedItem.icon + selectedItem.name
              }}
              rowTextForSelection={(item, index) => {
                return item.icon + item.name
              }}
              defaultButtonText='Select a Category'
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
          <View style={{ display: 'flex', width: 300, height: 300, backgroundColor: color.black }}>
            <Image source={{ uri: serverImage }} style={{ width: 50, height: 50 }} />
          </View>
        </View>
      )
  }

  return (
    <View style={styles.container}>
      <HeaderNav backTo={'ChefProfile'} navigation={navigation} right={false}/>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}>
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