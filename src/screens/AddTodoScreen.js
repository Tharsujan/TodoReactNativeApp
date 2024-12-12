import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useAddTodoMutation} from '../Services/TodoApi';

const AddTodoScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [addTodo] = useAddTodoMutation();

  const handleAdd = () => {
    const newTodo = {title, isCompleted};
    addTodo(newTodo).then(() => navigation.goBack());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add New Todo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Todo Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#aaa"
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTodoScreen;
