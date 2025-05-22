import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  //  backgroundColor: '#f5f5f5',
      //  backgroundColor: '#00bfa5',
    backgroundColor: '#121212',

offlineTask: {
  borderLeftWidth: 4,
  borderLeftColor: '#FFA500', // Orange border for offline tasks
  opacity: 0.9,
},
offlineBadge: {
  color: '#FFA500',
  fontSize: 12,
  marginBottom: 5,
},
offlineWarning: {
  color: 'red',
  marginLeft: 10,
},
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  nameSection: {
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  profileButton: {
    padding: 8,
  },
  profileIcon: {
    width: 30,
    height: 30,
  
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    marginTop: 10,
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  completedContainer: {
    backgroundColor: '#f0fff0',
    padding: 10,
    borderRadius: 6,
  },
  completedText: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
  },
  completedTime: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  manageButton: {
    backgroundColor: '#fd7815',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  manageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});