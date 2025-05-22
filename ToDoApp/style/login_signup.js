import { StyleSheet } from "react-native";
import ForgotPassword from "../screens/ForgotPasswor";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfa5',
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    color: '#f5f5f5',
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'HelveticaNeue', // If you want to use custom fonts, load them accordingly
    letterSpacing: 2,
  },
  inputContainer: {
    backgroundColor: '#1f1f1f',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#fd7815',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    color: '#fd7815',
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#fd7815',
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#fd7815',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 15,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonDisabled: {
    backgroundColor: '#00bfa5',
  },
  buttonText: {
    color: '#121212',
    fontWeight: '800',
    fontSize: 20,
    letterSpacing: 1.5,
  },
  bottomtext:{
    color:'blue',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    margin: 40,   
    fontFamily: 'HelveticaNeue', // If you want to use custom fonts, load them accordingly
    letterSpacing: 1,
  },
  ForgotPasswordtext:{
 color:'blue',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'left',
    marginLeft:10,
    fontFamily: 'HelveticaNeue', // If you want to use custom fonts, load them accordingly
    letterSpacing: 1,
  },
});


export default styles;