// TaskManagerStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  taskCard: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#333',
  },
  taskDesc: {
    fontSize: 15,
    color: '#555',
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 20,
  },
  editText: {
    color: '#007bff',
    fontWeight: '500',
  },
  deleteText: {
    color: '#d11a2a',
    fontWeight: '500',
  },
});

export default styles;
