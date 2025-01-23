import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextStyle,
} from 'react-native';
import {colors} from '../../../theme/colors';
import {typography} from '../../../theme/typography';
import {images} from '../../../assets/images/images';

const DocumentsScreen: React.FC = () => {
  const [expandedDocument, setExpandedDocument] = useState<number | null>(null);

  // Array for icons
  const iconsArray = [
    images.document1,
    images.document1,
    images.document1,
    images.document1,
  ];

  // Array for documents
  const documents = [
    {
      id: 1,
      title: "Driver's License",
      status: 'Approved',
      reUpload: true,
    },
    {
      id: 2,
      title: 'Police Check',
      status: 'Pending',
      reUpload: true,
    },
    {
      id: 3,
      title: 'Vehicle Rego',
      status: 'Rejected',
      reUpload: true,
    },
  ];

  // Assign icons to documents randomly
  const documentsWithIcons = documents.map((doc, index) => ({
    ...doc,
    icon: iconsArray[index % iconsArray.length],
  }));

  const toggleDocumentExpansion = (id: number) => {
    setExpandedDocument(prev => (prev === id ? null : id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return colors.green;
      case 'Pending':
        return colors.orange;
      case 'Rejected':
        return colors.error;
      default:
        return colors.text.primary;
    }
  };

  const renderDocumentItem = (document: (typeof documentsWithIcons)[0]) => (
    <TouchableOpacity
      key={document.id}
      style={styles.documentItem}
      onPress={() => toggleDocumentExpansion(document.id)}>
      <View style={styles.documentContent}>
        <View style={styles.leftContainer}>
          <View style={styles.documentIconContainer}>
            <Image source={document.icon} style={styles.documentIcon} />
          </View>
          <Text style={styles.documentTitle}>{document.title}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text
            style={[
              styles.documentStatus,
              {color: getStatusColor(document.status)},
            ]}>
            {document.status}
          </Text>
        </View>
      </View>
      {expandedDocument === document.id && document.reUpload && (
        <TouchableOpacity style={styles.reUploadButton}>
          <Image source={images.reuploadIcon} style={styles.reUploadIcon} />
          <Text style={styles.reUploadText}>Re-Upload</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.documentList}>
        {documentsWithIcons.map(renderDocumentItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
    padding: 20,
  },
  header: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 20,
  },
  documentList: {
    flex: 1,
  },
  documentItem: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  documentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  documentIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  documentIcon: {
    width: 40,
    height: 40,
  },
  documentTitle: {
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
    color: colors.text.primary,
    textAlign: 'center',
    marginVertical: 15,
  },
  rightContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  documentStatus: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
  },
  reUploadButton: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: colors.border.lightGray,
  },
  reUploadIcon: {
    tintColor: colors.primary,
    marginRight: 8,
  },
  reUploadText: {
    fontSize: typography.fontSize.medium,
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
});

export default DocumentsScreen;
