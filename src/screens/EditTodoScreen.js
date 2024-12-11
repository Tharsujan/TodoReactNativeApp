import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useGetTodoByIdQuery, useUpdateTodoMutation} from '../Services/TodoApi';

const EditTodoScreen = ({route, navigation}) => {
  const {todoId} = route.params;
  const {data: todo, isLoading} = useGetTodoByIdQuery(todoId);
  const [updateTodo] = useUpdateTodoMutation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  }, [todo]);

  const handleUpdate = () => {
    updateTodo({
      id: todoId,
      updatedTodo: {title, isCompleted: todo.isCompleted},
    }).then(() => navigation.goBack());
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View>
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

export default EditTodoScreen;
