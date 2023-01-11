import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskNewTitle: string;
  taskId: number;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks((prevState) => [...prevState, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }])
  }
  
  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find((task) => task.id === id)

    if (!foundItem) {
      return;
    }
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "Sim", onPress: () => setTasks(tasks.filter((task) => task.id !== id)) }
      ]
    );
  }

  function handleEditTask({ taskNewTitle, taskId }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToBeUpdated = updatedTasks.find((task) => task.id === taskId)

    if (!taskToBeUpdated) {
      return;
    }

    taskToBeUpdated.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput
        addTask={handleAddTask}
        tasks={tasks}
      />

      <TasksList 
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})