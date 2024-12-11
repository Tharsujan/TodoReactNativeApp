import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Button, Alert, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {useGetTodosQuery, useDeleteTodoMutation} from '../Services/TodoApi';

const HomeScreen = ({navigation}) => {
  const {data: todos, isLoading, isError, refetch} = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();

  useFocusEffect(
    useCallback(() => {
      refetch(); // Fetch students when the screen is focused
    }, []),
  );
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error loading todos!</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  const handleDelete = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this todo?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => deleteTodo(id).then(refetch()),

          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View>
      <Text>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('EditTodo', {todoId: item.id})}
            />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
      <Button title="Add Todo" onPress={() => navigation.navigate('AddTodo')} />
    </View>
  );
};

export default HomeScreen;
