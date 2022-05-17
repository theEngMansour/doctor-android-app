import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROFILE_URL } from '../config/urls';
import axios from '../config/axios';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { transformName } from '../config/helpers';
import styles from './styles/profileStyles';
import Profile from '../components/Profile'

const ProfileScreen = (props) => {
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        _getProfile();
    }, []);

    const _getProfile = () => {
        (async() => {
            setLoading(true);

            try {
              const token = await AsyncStorage.getItem('accessToken');
              axios.defaults.headers.common.Authorization = `${token}`;
              const response = await axios.get(PROFILE_URL);
              setUser(response.data);
              setLoading(false);
            } catch(e) {
              setLoading(false);
            }
        })();
    };

    const signOut = () => {
        Alert.alert(
          '', /* title */
          'هل أنت متأكد أنك تريد تسجيل الخروج؟',
          [
            {
              text: 'إغلاق',
              style: 'cancel',
            },
            {
              text: 'موافق',
              onPress: async () => {
                await AsyncStorage.clear();
                props.navigation.navigate('Home');
              },
            },
          ],
          { cancelable: false }
        );
    };

    // Profiles Doctor
    const profiles = () => {
      if(user.userType == 'normal'){ return }
      const profile = user.profiles.map(item => {
        return (
          <View key={item._id}>
              <Profile  
                speialization={item.speialization}
                address={item.address}
                workingHours={item.address}
                phone={item.phone}
              />
          </View>

        )
      })
      return profile;
    }


    return (
      <View style={styles.container}>
      <Loader title="إحضار بيانات الملف الشخصي" loading={isLoading} />
        <View>
          <View style={styles.userMetaContainer}>
            <View style={styles.userAvtar}>
              <Text style={styles.userAvtarText}>
                {transformName(user.name)}
              </Text>
            </View>
            <View style={styles.userMeta}>
              <Text>{user.name}</Text>
              <Text>{user.email}</Text>
            </View>
          </View>
          {user.userType == "doctor" && (
            profiles()
          )}
          <Button
            buttonStyles={styles.logoutButton}
            textStyles={styles.buttonText}
            text="تسجيل خروج"
            onPress={signOut}
          />
        </View>
    </View>
  );

}
export default ProfileScreen;