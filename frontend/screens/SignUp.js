import React, {useState, useEffect} from 'react';
import styles from './styles/authStyles';
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import axios from '../config/axios';
import { Checkbox } from 'react-native-paper';
import { SIGNUP_URL } from '../config/urls';
import * as Location from 'expo-location';
import { 
    View, 
    Text, 
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

/* 
 Sign Up Screens
*/
const SignUpScreens = (props) => {
    const { navigation } = props;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: false,
        speialization: '',
        phone: '',
        address: '',
        workingHours: '',
        location: null,
    });

    const [location, setLocation] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ messages: null, type: '' });


    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
    
    useEffect(() => {
        const timer = setTimeout(() => {
          setAlert({ messages: null });
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [alert.messages]);
    
    const changeFormValue = (key, value) => {
        setFormData({ ...formData, [key]: value });
        /*
            ...formData Update Data
            setName({any : value})
            setFormData({ ...formData, [email]: value }); 
        */
    };

    const validate = () => {
        const {
          name,
          email,
          password,
          userType,
          speialization,
          address,
          phone,
          workingHours,
        } = formData;
        let validationErrors = [];
        let passed = true;
        if (!name) {
          validationErrors.push('???????????? ?????????? ?????? ????????????????');
          passed = false;
        }
    
        if (!email) {
          validationErrors.push('???????????? ?????????? ???????????? ????????????????????');
          passed = false;
        }
    
        if (!password) {
          validationErrors.push('???????????? ?????????? ???????? ????????????');
          passed = false;
        }
    
        if (userType) {
          if (!speialization) {
            validationErrors.push('???????????? ?????????? ???????????? ');
            passed = false;
          }
    
          if (!address) {
            validationErrors.push('???????????? ?????????? ??????????????');
            passed = false;
          }
    
          if (!workingHours) {
            validationErrors.push('???????????? ?????????? ?????????? ??????????');
            passed = false;
          }
    
          if (!phone) {
            validationErrors.push('???????????? ?????????? ?????? ????????????');
            passed = false;
          }
        }
    
        if (validationErrors.length > 0) {
          setAlert({ messages: validationErrors, type: 'danger' });
        }
        return passed;
    };

    const _signUp = () => {
        (async () => {
          if (!validate()) return;
          setLoading(true);
          const { name, email, password, speialization, address, phone, workingHours, userType } = formData;
          const body = {
            name,
            email,
            password,
            userType: userType ? 'doctor' : 'normal',
            speialization,
            address,
            phone,
            workingHours,
            latitude: location ? location.coords.latitude : null,
            longitude: location ? location.coords.longitude : null,
          };
          try {
            const response = await axios.post(SIGNUP_URL, body);
            setFormData({
                name: '',
                email: '',
                password: '',
                userType: false,
                speialization: '',
                address: '',
                phone: '',
                workingHours: '',
                latitude: null,
                longitude: null,
            });
            setLoading(false);
            navigation.navigate('SignIn');
          } catch (e) { setAlert({ messages: e.response.data.message, type: 'danger' }); }
        })();
    };


    const {
        name,
        email,
        password,
        userType,
        speialization,
        address,
        phone,
        workingHours,
    } = formData;

    /* 
     Example :
     setFormData({ {name, email, password ..etc}, [name]: 'Mansour' });
    */
    return (
        <ScrollView contentContainerStyle={{ paddingVertical: 40 }}>
            <Loader title="???????? ?????????? ???????? ????????" loading={isLoading} />
            <Alert messages={alert.messages} type={alert.type} />
            <View style={styles.container}>
                <ScreenTitle title="?????????? ???????? ????????" icon="md-person-add" />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input
                        onChangeText={(text) => changeFormValue('name', text)}
                        value={name}
                        placeholder="??????????"
                    />
                    <Input
                        onChangeText={(text) => changeFormValue('email', text)}
                        value={email}
                        placeholder="???????????? ????????????????????"
                    />
                    <Input
                        onChangeText={(text) => changeFormValue('password', text)}
                        value={password}
                        secureTextEntry
                        placeholder="???????? ????????????"
                    />
                    <View style={styles.checkbox}>
                        <Checkbox
                            color={'red'}
                            status={userType ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setFormData({ ...formData, userType: !userType });
                            }}
                        />
                        <Text style={styles.checkboxLabel}>????????</Text>
                    </View>
                    {userType &&                     
                        <React.Fragment>
                            <Input
                                onChangeText={(text) => changeFormValue('speialization', text)}
                                value={speialization}
                                placeholder="????????????"
                            />
                            <Input
                                onChangeText={(text) => changeFormValue('workingHours', text)}
                                value={workingHours}    
                                placeholder="?????????? ??????????"
                            />
                            <Input
                                onChangeText={(text) => changeFormValue('address', text)}
                                value={address}
                                placeholder="??????????????"
                            />
                            <Input
                                onChangeText={(text) => changeFormValue('phone', text)}
                                value={phone}
                                placeholder="????????????"
                            />
                        </React.Fragment>
                    }
                     <Button text="??????????" onPress={_signUp} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

export default SignUpScreens;