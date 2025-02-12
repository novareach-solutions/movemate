import React from 'react';
import DocumentList from '../../components/DocumentList';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  DeliverAPackage,
  DeliverAPackageParamList,
} from '../../navigation/ScreenNames';

const DAPUploadDocumentsScreen = () => {
  const navigation = useNavigation<NavigationProp<DeliverAPackageParamList>>();

  const documents = [
    {id: '1', title: 'Police Verification', value: 'POLICE_VERIFICATION'},
    {id: '2', title: 'Driver License (Front)', value: 'DRIVER_LICENSE_FRONT'},
    {id: '3', title: 'Driver License (Back)', value: 'DRIVER_LICENSE_BACK'},
    {id: '4', title: 'Australian ID', value: 'AUSTRALIAN_ID'},
    {id: '5', title: 'Vehicle Registration', value: 'VEHICLE_REGISTRATION'},
  ];

  const handleCardPress = (title: string) => {
    navigation.navigate(DeliverAPackage.UploadDocumentDetails, {title});
  };

  return (
    <DocumentList
      stepIndicator={{current: 5, total: 5}}
      title="Upload your Official Documents"
      description="Add your details to get started"
      documents={documents}
      onCardPress={handleCardPress}
    />
  );
};

export default DAPUploadDocumentsScreen;
