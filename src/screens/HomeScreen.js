import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
          onPress: () =>
            deleteTodo(id)
              .unwrap() // Unwrap to handle potential errors
              .then(() => refetch())
              .catch(error => console.error('Delete failed', error)),

          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.listTitleText}>Todo List</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
          renderItem={({item}) => (
            <View style={styles.subContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    navigation.navigate('EditTodo', {todoId: item.id})
                  }>
                  <Text style={styles.btnText}> Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => handleDelete(item.id)}>
                  <Text style={styles.btnText}> Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddTodo')}>
        <Text>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listTitleText: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flatListContent: {
    paddingBottom: 20, // Adds spacing for the "Add Todo" button
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    width: '50%',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  btn: {
    width: 70,
    height: 40,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
  },
  btn1: {
    width: 70,
    height: 40,
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
  },
  btnText: {
    color: '#FFFFFF',
  },
  addBtn: {
    marginBottom: 15, // Space at the bottom
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    width: 150,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
