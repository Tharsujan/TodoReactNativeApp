import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useGetTodoByIdQuery, useUpdateTodoMutation} from '../Services/TodoApi';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditTodoScreen = ({route, navigation}) => {
  const {todoId} = route.params;
  const {data: todo, isLoading, refetch} = useGetTodoByIdQuery(todoId);
  const [updateTodo] = useUpdateTodoMutation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch(); // Re-fetch data when the screen is focused
    });

    return unsubscribe; // Cleanup the listener
  }, [navigation]);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  }, [todo]);

  const handleUpdate = async () => {
    try {
      await updateTodo({
        id: todoId,
        updatedTodo: {title, isCompleted: todo.isCompleted},
      }).unwrap();
      navigation.goBack(); // Navigate back on successful update
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  if (isLoading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Edit Todo</Text>

      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f4f4f9',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
});

export default EditTodoScreen;
