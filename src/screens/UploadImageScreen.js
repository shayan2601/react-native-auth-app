import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const UploadImageScreen = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);

    const selectImage = () => {
        console.log("IMAGE PICKER START");
        if (Platform.OS === 'web') {
        // Handle web image selection
        console.log('Image picker is not available on the web');
        return;
        }

        if (!ImagePicker || !ImagePicker.launchImageLibrary) {
            console.log('ImagePicker is not initialized correctly');
            return;
        }

        const options = {
            mediaType: 'photo',
        };
        console.log("OPTIONSL::: ", options)
        console.log("ImagePicker::: ", ImagePicker)
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log("RESPONSE::: ", response)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                setImageUri(uri);
            }
        });
    };

    const onNextPressed = async () => {
        if (imageUri) {
            console.log("imageUri: ", imageUri);
            try {
                
                let userData = await AsyncStorage.getItem('userData');
                let parsedUserData = JSON.parse(userData);
                console.log("parsedUserData: ", parsedUserData);

                const requestBody = {
                    email: parsedUserData.email,
                    ...parsedUserData,
                    profileImage: imageUri, 
                };

                const response = await axios.post('http://13.60.56.191:3001/api/user/register', requestBody);
                console.log('Registration response:', response.data);
            } catch (error) {
                console.error('Failed to register user:', error);
            }
        } else {
        console.log('No image selected');
        }
    };

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={selectImage}>
            {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
            <View style={styles.imagePlaceholder}>
                <Text>Select an Image</Text>
            </View>
            )}
        </TouchableOpacity>
        <Button title="Next" onPress={onNextPressed} style={styles.button}>
            Next
        </Button>
        </View>
    );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: 'blue',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 100,
  },
  button: {
    marginTop: 20,
  },
};

export default UploadImageScreen;
