import React from 'react';
import { Modal, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Button from '../components/Button';
import { transformName } from '../config/helpers';
import styles from './styles/profileStyles';
import Profile from '../components/Profile'

const DoctorDetails = ({ selectedDoctor, closeModal }) => {
    if (!selectedDoctor) return null;
    // Profiles Doctor
    const profiles = () => {
        const profile = selectedDoctor.profiles.map(item => {
          return (
            <View key={item._id}>
                <Profile  
                  speialization={item.speialization}
                  address={item.address}
                  workingHours={item.workingHours}
                  phone={item.phone}
                />
            </View>
  
          )
        })
        return profile;
    }
    return (
        <Modal
            visible={selectedDoctor !== null}
            animationType="slide"
            onRequestClose={closeModal}
        >
             
            <View style={styles.container}>
                <View style={styles.userMetaContainer}>
                    <View style={styles.userAvtar}>
                        <Text style={styles.userAvtarText}>
                        {transformName(selectedDoctor.name)}
                        </Text>
                    </View>
                    <View style={styles.userMeta}>
                        <Text>{selectedDoctor.name}</Text>
                        <Text>{selectedDoctor.email}</Text>
                    </View>
                </View>
                {profiles()}
                {selectedDoctor.latitude && (
                    <View style={styles.mapContainer}>
                        <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: selectedDoctor.latitude,
                            longitude: selectedDoctor.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        >
                        <Marker
                            coordinate={{
                            latitude: selectedDoctor.latitude,
                            longitude: selectedDoctor.longitude,
                            }}
                        />
                        </MapView>
                    </View>
                )}
                <Button
                    text="عودة"
                    buttonStyles={styles.backButton}
                    onPress={closeModal}
                />
            </View>
            
        </Modal>
    );
}

export default DoctorDetails;