// services/todoApi.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.1.27:7183/api/'}), // Replace with your backend URL
  endpoints: builder => ({
    getTodos: builder.query({
      query: () => 'Todos', // Get all todos
    }),
    getTodoById: builder.query({
      query: id => `Todos/${id}`, // Get todo by ID
    }),
    addTodo: builder.mutation({
      query: newTodo => ({
        url: 'Todos',
        method: 'POST',
        body: newTodo,
      }), // Add new todo
    }),
    updateTodo: builder.mutation({
      query: ({id, updatedTodo}) => ({
        url: `Todos/${id}`,
        method: 'PUT',
        body: {...updatedTodo, id},
      }), // Update todo by ID
    }),
    deleteTodo: builder.mutation({
      query: id => ({
        url: `Todos/${id}`,
        method: 'DELETE',
      }), // Delete todo by ID
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
