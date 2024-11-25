import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaDeDestinos from './Pages/ListaDeDestinos';
import AgregarDestino from './Pages/AgregarDestino';


const Stack = createStackNavigator();





export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListaDeDestinos" component={ListaDeDestinos} options={{ title: 'Destinos' }} />
        <Stack.Screen name="Agregar Destino" component={AgregarDestino} options={{ title: 'Agregar Destino' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


