import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 25,
    color: '#333',
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 25,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageText: {
    color: '#666',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
 backgroundColor: '#fd7815',
     paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    margin: 100,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});
