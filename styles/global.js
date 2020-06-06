import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 5,
        textAlign: 'center',
    },
    circleButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 15,
    marginBottom: 15,
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 15,
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 50,
  },
})