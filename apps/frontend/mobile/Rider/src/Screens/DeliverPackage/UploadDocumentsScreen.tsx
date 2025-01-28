import React, {useState} from 'react';
import DocumentList from '../../components/DocumentList';
import {useNavigation} from '@react-navigation/native';
import {DeliverAPackage} from '../../navigation/ScreenNames';

const DAPUploadDocumentsScreen = () => {
  const navigation = useNavigation();

  // Track the uploaded status dynamically
  const [documents, setDocuments] = useState([
    {
      id: '1',
      title: 'Police Verification',
      value: 'POLICE_VERIFICATION',
      isUploaded: false,
    },
    {
      id: '2',
      title: 'Driver License',
      value: 'DRIVER_LICENSE',
      isUploaded: false,
    },
    {
      id: '3',
      title: 'Australian ID Proof',
      value: 'AUSTRALIAN_ID_PROOF',
      isUploaded: false,
    },
  ]);

  const handleCardPress = (title: string) => {
    navigation.navigate(DeliverAPackage.UploadDocumentDetails, {
      title,
      onUploadSuccess: () => handleUploadSuccess(title),
    });
  };

  const handleUploadSuccess = (title: string) => {
    // Update the `isUploaded` status for the corresponding document
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.title === title ? {...doc, isUploaded: true} : doc,
      ),
    );
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
