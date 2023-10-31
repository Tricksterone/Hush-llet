import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Chore, mockChores } from '../../data/mockedChores';
import { ProjectTheme } from '../../theme/theme';
import Intervals from '../Component/Interval';
import { RootStackParamList } from '../Navigation/RootNavigator';
type Props = NativeStackScreenProps<RootStackParamList, 'CreateTask'>;

export default function CreateTaskScreen({ navigation }: Props) {
  const slectedHomeId = React.useRef<string>('1'); // Ref to store the selected home id
  const [titel, setTitel] = React.useState('');
  const [Discription, setDiscription] = React.useState('');
  const [Interval, setInterval] = React.useState(0);
  const [Rating, setRating] = React.useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handelAddTask = async () => {
    try {
      const newChore: Chore = {
        id: mockChores.length + 1,
        home_id: parseInt(slectedHomeId.current, 10), // Convert to integer (radix)
        name: titel,
        description: Discription,
        task_rating: parseInt(Rating, 10),
        interval: Interval,
      };

      // push the chore to mockChores array
      mockChores.push(newChore);
      navigation.navigate('Household');
    } catch (error) {
      console.log(error);
    }
    setTitel('');
    setDiscription('');
    setInterval(parseInt('', 10));
    setRating('');
    setImage(null);
    navigation.navigate('Household');
    //Loggar ut alla chores för att se att den nya Chore/Task är skapad
    console.log(mockChores);
  };
  const nameStyle = {
    width: '100%',
    height: 40,
    backgroundColor: ProjectTheme.inputBackground,
    borderRadius: ProjectTheme.borderRadius.medium,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 20,
    color: ProjectTheme.colors.textcolor,
    elevation: ProjectTheme.elevation.small,
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'F2F2F2' }}>
      <View
        style={{
          backgroundColor: ProjectTheme.inputBackground,
          borderRadius: ProjectTheme.borderRadius.medium,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          marginBottom: 20,
          elevation: ProjectTheme.elevation.small,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            paddingTop: 14,
            justifyContent: 'center',
            alignContent: 'center',
            height: 66,
          }}
        >
          Skapa en ny syssla
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'F2F2F2',
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Titel:
          </Text>
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 40,

              elevation: ProjectTheme.elevation.small,
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={titel}
            onChangeText={(text) => setTitel(text)}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Beskrivning:
          </Text>
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 100,
              elevation: ProjectTheme.elevation.small,
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={Discription}
            onChangeText={(text) => setDiscription(text)}
            multiline
            numberOfLines={4}
          />
          {/* <Text>Återkommer:</Text> */}
          <Intervals
            selectedInterval={parseInt(Interval, 10)}
            onIntervalChange={(value) => setInterval(value.toString())}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Värde:
          </Text>
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 50,

              backgroundColor: '#FFFFFF',
              elevation: ProjectTheme.elevation.small,
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={Rating.toString()}
            onChangeText={(text) => setRating(text)}
            keyboardType="numeric"
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Bild:
          </Text>
          <Button
            style={{
              marginBottom: 10,
              height: 50,
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="image"
            mode="contained"
            onPress={pickImage}
            labelStyle={{ color: ProjectTheme.colors.secondary, fontSize: 40 }}
            rippleColor={ProjectTheme.colors.background}
            children={undefined}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 400,
                height: 225,
                alignSelf: 'center',
                marginBottom: 10,
              }}
            />
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <Button
            style={{
              marginBottom: 5,
              height: 50,
              width: '48%',
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="content-save-outline"
            mode="contained"
            onPress={handelAddTask}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Spara
          </Button>
          <Button
            style={{
              elevation: ProjectTheme.elevation.large,
              marginBottom: 5,
              height: 50,
              width: '48%', // Make sure there is enough space for both buttons
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="close"
            mode="contained"
            onPress={() => navigation.navigate('Household')}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Stäng
          </Button>
        </View>
      </View>
    </View>
  );
}
