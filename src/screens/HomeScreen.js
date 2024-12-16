import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
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
                  <Icon name="edit" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => handleDelete(item.id)}>
                  <Icon name="delete" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddTodo')}>
        <Text style={styles.addBtnText}>Add Todo</Text>
        <Icon name="add" size={24} style={styles.addIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
  },
  btn1: {
    width: 50,
    height: 50,
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
  },
  btnText: {
    color: '#FFFFFF',
  },
  addBtn: {
    flexDirection: 'row',
    paddingLeft: 30,
    justifyContent: 'space-between',
    marginBottom: 15, // Space at the bottom
    alignSelf: 'center',
    backgroundColor: 'green',
    width: 150,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
  },
  addIcon: {
    paddingRight: 20,
    color: '#FFFFFF',
  },
});

export default HomeScreen;
