// TaskManager.js
import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTaskManagerLogic from '../firebase/TaskManagerLogic';
import styles from '../style/TaskManagerStyles';

export default function TaskManager() {
  const {
    tasks,
    title,
    setTitle,
    desc,
    setDesc,
    editingTaskId,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
  } = useTaskManagerLogic();

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDesc}>{item.description}</Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>
          Alert.alert('Delete?', 'Are you sure?', [
            { text: 'Cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => handleDelete(item.id),
            },
          ])
        }>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
          source={require('../assets/leftarrow.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={styles.header}>Task Manager</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleAddOrUpdate} style={styles.button}>
        <Text style={styles.buttonText}>
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
