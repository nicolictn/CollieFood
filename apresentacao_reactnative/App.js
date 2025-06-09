import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/HomeScreen'; // Tela de início
import Registro from './components/Registro'; // tela de cadastro
import ReceitasGeral from './components/ReceitasGeral' //receitas gerais
import { ReceitasProvider } from './components/ReceitasContext'; //api para conseguir trabalhar com a atualizaçao de dados

const Stack = createNativeStackNavigator(); //Cria uma instância do navegador de pilha

export default function App() {
  return (
    <ReceitasProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Inicio" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Registro" 
            component={Registro} 
            options={{ headerShown: false }} //tira a barra q estava dando erro de compatibilidade
          />
          <Stack.Screen 
            name="Receitas Geral" 
            component={ReceitasGeral} 
            options={{ headerShown: false }} //tira a barra q estava dando erro de compatibilidade
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReceitasProvider>
  );
}