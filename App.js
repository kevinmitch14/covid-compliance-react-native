import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'
import Results from './screens/Results'
import { Provider } from 'react-redux'
import store from './store.js'

export default function App() {
  return (
    <>
      <Provider store={store}>
        <HomeScreen />
        <Results />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
});
