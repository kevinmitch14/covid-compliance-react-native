import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'
import Results from './screens/Results'

export default function App() {
  return (
    <>
      <HomeScreen />
      <Results />
    </>
  );
}

const styles = StyleSheet.create({
});
