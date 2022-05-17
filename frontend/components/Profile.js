import React from 'react';
import { Text, View, Alert } from 'react-native';
import styles from '../screens/styles/profileStyles';

const Profile = (props) => {
const { speialization, address, workingHours, phone } = props;
return (
    <View>
        <View style={styles.doctorInfo}>
            <View style={styles.infoCell}>
                <Text style={styles.infoTitle}>الاختصاص</Text>
                <Text style={styles.infoText}>{speialization}</Text>
            </View>
            <View style={styles.infoCell}>
                <Text style={styles.infoTitle}>العنوان</Text>
                <Text style={styles.infoText}>{address}</Text>
            </View>
            <View style={styles.infoCell}>
                <Text style={styles.infoTitle}>ساعات العمل</Text>
                <Text style={styles.infoText}>{workingHours}</Text>
            </View>
            <View style={styles.lastCell}>
                <Text style={styles.infoTitle}>رقم الهاتف</Text>
                <Text style={styles.infoText}>{phone}</Text>
            </View>
        </View>
    </View>
)}


export default Profile;