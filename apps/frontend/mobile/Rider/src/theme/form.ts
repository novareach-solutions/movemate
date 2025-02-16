import {StyleSheet, TextStyle} from 'react-native';
import {colors} from './colors';
import {typography} from './typography';

export const formStyles = StyleSheet.create({
  inputLabel: {
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primaryGrey,
    marginBottom: 7,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 12,
    padding: 14,
    fontSize: typography.fontSize.medium,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    backgroundColor:'#FDFDFD'
  },
  focusedInput: {
    borderColor: colors.purple,
  },
  errorInput: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.small,
    marginTop: 5,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
    flexDirection:"row",
    justifyContent: 'center',
    gap:10
  },
  buttonEnabled: {
    backgroundColor: colors.purple,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  buttonSuccess: {
    backgroundColor: colors.green,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.semiBold as TextStyle['fontWeight'],
  },
  buttonTextEnabled: {
    color: colors.white,
  },
  buttonTextDisabled: {
    color: colors.purple,
  },
  buttonDisabled: {
    backgroundColor: 'transparent',
    borderColor: colors.purple,
    borderWidth: 1,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSize.small,
    color: colors.text.primaryGrey,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.regular as TextStyle['fontWeight'],
    textAlign: 'center',
    marginHorizontal: 25,
    marginTop: 10,
  },
  link: {
    color: colors.purple,
    textDecorationLine: 'underline',
  },
  suggestionBox: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});
