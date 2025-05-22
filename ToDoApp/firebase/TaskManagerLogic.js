import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'TASKIFY_TASKS';

export default function useTaskManagerLogic() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const uid = auth().currentUser?.uid;

  // Load tasks from local storage first
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const localData = await AsyncStorage.getItem(TASKS_KEY + uid);
        if (localData) {
          setTasks(JSON.parse(localData));
        }
      } catch (e) { }
    };
    loadTasks();
  }, [uid]);

  // Sync with firebase and update local storage
  useEffect(() => {
    if (!uid) return;
    const ref = database().ref(`/tasks/${uid}`);

    const onValue = snapshot => {
      const val = snapshot.val() || {};
      const arr = Object.entries(val).map(([id, value]) => ({ id, ...value }));
      setTasks(arr);
      // Save to local
      AsyncStorage.setItem(TASKS_KEY + uid, JSON.stringify(arr));
    };

    ref.on('value', onValue);

    return () => ref.off('value', onValue);
  }, [uid]);

  const handleAddOrUpdate = async () => {
    if (!title || !desc) {
      alert('Please enter title and description');
      return;
    }
    const ref = database().ref(`/tasks/${uid}`);
    if (editingTaskId) {
      await ref.child(editingTaskId).update({ title, description: desc });
    } else {
      const newRef = ref.push();
      await newRef.set({ title, description: desc, completed: false });
    }
    setTitle('');
    setDesc('');
    setEditingTaskId(null);
    // Data firebase se sync hote hi local storage update ho jayega
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDesc(task.description);
    setEditingTaskId(task.id);
  };

  const handleDelete = async (taskId) => {
    await database().ref(`/tasks/${uid}/${taskId}`).remove();
    // Data firebase se sync hote hi local storage update ho jayega
  };

  return {
    tasks,
    title,
    setTitle,
    desc,
    setDesc,
    editingTaskId,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
  };
}