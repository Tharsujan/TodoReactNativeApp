import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
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
    <View>
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

export default AddTodoScreen;
