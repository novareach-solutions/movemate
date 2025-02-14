import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import SuccessMessage from '../../../components/Modals/SuccessMessage';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreens } from '../../../navigation/ScreenNames';
import { cancelOrder } from '../../../redux/slices/deliverAPackageSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { colors } from '../../../theme/colors';

const CancelOrderScreen: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const orderId = useAppSelector(state => state.deliverAPackage.id);
  const [otherReason, setOtherReason] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
const navigation=useNavigation();
const dispatch = useAppDispatch();
  const reasons = [
    'No longer needed',
    'Found another option',
    'Changed my mind',
    'Changed plans',
    'Others, please specify',
  ];

  const handleCancel = async(selectedReason:string, otherReason:string)=>{
    console.log('cancel order',selectedReason,otherReason)
    try {
    //   await dispatch(cancelOrder({
    //     reason:otherReason ? otherReason : selectedReason,orderId:orderId ?? ""
    //  }));
setIsSuccess(true);
navigation.navigate(CustomerScreens.CancelSuccessScreen)  
            } catch (error) {
                console.log('Error cancelling order:', error);
            }
    
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardAvoid}
      >
        <Header isBack bgColor={colors.lightGrey}/>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.header}>Cancellation Reason</Text>
          <Text style={styles.subHeader}>Why are you canceling this service?</Text>

          {reasons.map(reason => (
            <TouchableOpacity 
              key={reason} 
              style={[styles.radioContainer, selectedReason === reason && styles.selectedRadio]} 
              onPress={() => setSelectedReason(reason)}
            >
              <View style={[styles.radioButton, selectedReason === reason && styles.radioButtonSelected]} />
              <Text style={styles.radioLabel}>{reason}</Text>
            </TouchableOpacity>
          ))}

          {selectedReason === 'Others, please specify' && (
            <TextInput
              style={styles.textArea}
              placeholder="Please specify your reason"
              value={otherReason}
              onChangeText={setOtherReason}
              multiline
              placeholderTextColor={colors.grey}
              numberOfLines={5}
              textAlignVertical="top"
            />
          )}
          <View style={styles.footer}>
          <Button 
          mode="contained" 
          style={[styles.cancelButton, !selectedReason && styles.disabledButton]}
          onPress={() => handleCancel(selectedReason, otherReason)}
          buttonColor="#D32F2F" 
          textColor="#FFF"
          disabled={!selectedReason}
        >
          Cancel Service
        </Button>
          </View>
         
        </ScrollView>

        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  keyboardAvoid: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  selectedRadio: {
    borderColor: '#333',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderWidth: 2,
    padding:5,
    // borderColor: '#333', 
    borderRadius: 4,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#333',
  },
  radioLabel: {
    fontSize: 16,
  },
  textArea: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 16,
    height: 100,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  cancelButton: {
    borderRadius: 10,
  },
  footer:{
    flex:1,
    justifyContent:'flex-end',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
});

export default CancelOrderScreen;
