import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableNativeFeedback } from 'react-native';
import { StyleSheet, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from "@expo/vector-icons";

const SliderScreen = (props) => {
    const [showRealApp, setShowRealApp] = useState(false)
    const { navigation } = props;
    const slides = [
        {
        key: 1,
        title: 'أهلًا بك في طبيبي',
        text: 'Welcome to my doctor',
        icon: 'md-person-add',
        backgroundColor: '#59b2ab',
        //image: require('../assets/a.png'),
        },
        {
        key: 2,
        title: 'التطبيق الأول للربط بين الأطباء والمرضى',
        text: 'Thhe first application to link doctors and patients',
        icon: 'link',
        backgroundColor: '#febe29',
        //image: require('../assets/2.svg'),
        },
        {
        key: 3,
        title: 'تواصل مع طبيبك بسهولة ويسر',
        text: 'Connect with your doctor easily and pleased',
        icon: 'map',
        backgroundColor: '#22bcb5',
        //image: require('../assets/3.svg'),
        }
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={styles.content}>
                <View style={styles.userAvtar}>
                    <Text style={styles.userAvtarText}>
                        <Ionicons
                            name={item.icon}
                            size={75}
                            style={styles.icon}
                        />
                        {/* <Image source={item.image} style={styles.image} /> */}
                    </Text>
                </View>
                <Text style={styles.title}>{item.title}</Text> 
                <Text style={styles.text}>{item.text}</Text>
            </View>
            
        );
    }

    const onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        setShowRealApp(true)
    }
    
    const renderDoneButton = () => {
        // Done Button
        return (                
            <TouchableNativeFeedback
             onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.button}>تم</Text>
            </TouchableNativeFeedback>
        );
    };

    const renderNextButton = () => {
        // Next Button
        return ( <Text style={styles.button}>التالي</Text> );
    };

    return (
        <SafeAreaView style={styles.container}> 
            {!showRealApp && (
                <View style={styles.container}>
                    <AppIntroSlider 
                        renderItem={renderItem} 
                        data={slides} 
                        onDone={onDone} 
                        renderDoneButton={renderDoneButton} 
                        renderNextButton={renderNextButton}
                    />
                </View>
            )}
        </SafeAreaView> 
    )   

}
const relation = {
    width: 48,
    height: 48,
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 10,
    justifyContent: 'center',
    fontFamily: 'SSTFonts',
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#281cd8'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'SSTFonts',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'SSTFonts',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
        fontSize: 18,
        color: '#281cd8',
        textAlign: 'center',
        alignSelf: 'center',
        lineHeight: 20,
        fontFamily: 'SSTFonts',
    },
    image: {    
        width: 100,
        height: 100,
    },
    userAvtar: {
        width: 200,
        height: 200,
        borderRadius: 150,
        backgroundColor: '#fff',
    },
    userAvtarText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff",
        lineHeight: 200,
        textAlign: 'center'
    },
    icon: {
        color:'#281cd8',
        marginBottom: 10,
        fontSize: 125,
    },
});

export default SliderScreen;