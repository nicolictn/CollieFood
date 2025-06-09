// mporta todos os componentes do React Native
import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

//Importa componentes específicos do React Native Paper
import {
  Appbar,
  TextInput,
  Button,
  Provider as PaperProvider,
} from 'react-native-paper';

//Importa o contexto de receitas
import { ReceitasContext } from './ReceitasContext';

//Define o componente principal da tela de registro de receitas
export default function Registro({ navigation }) {
  // Acessa funções e dados do contexto
  const {
    adicionarReceita,
    receitaEditando,
  } = useContext(ReceitasContext);

  // guarda os valores
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [instrucoes, setInstrucoes] = useState('');
  const [tempo, setTempo] = useState('');
  const [imagem, setImagem] = useState('');

  // Preenche os campos automaticamente quando for edição
  useEffect(() => {
    if (receitaEditando) {
      setTitulo(receitaEditando.nome || '');
      setIngredientes((receitaEditando.ingredientes || []).join(', '));
      setInstrucoes(receitaEditando.descricao || '');
      setTempo(receitaEditando.tempo || '');
      setImagem(receitaEditando.imagem || '');
    }
  }, [receitaEditando]);

  // Função para limpar o formulário após adicionar ou editar
  const clearForm = () => {
    setTitulo('');
    setIngredientes('');
    setInstrucoes('');
    setTempo('');
    setImagem('');
  };

  // Adiciona ou atualiza uma receita
  const handleAddOrUpdateReceitas = () => {
    if (!titulo || !ingredientes || !instrucoes || !tempo || !imagem) {
      alert('Preencha todos os campos!');
      return;
    }

    const novaReceita = {
      nome: titulo,
      ingredientes: ingredientes.split(',').map((i) => i.trim()),
      descricao: instrucoes,
      tempo: tempo,
      imagem: imagem,
    };

    // Adiciona ou atualiza conforme a lógica do contexto
    adicionarReceita(novaReceita);

    clearForm(); // Limpa os campos
    navigation.navigate('Receitas Geral'); // Retorna à tela geral
  };

  // Renderiza a interface de registro
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: '#FFA559', height: 80 }}>
          <Appbar.Content title=" " style={{ top: 15 }} />
        </Appbar.Header>

        <ScrollView style={styles.scroll}>
          <Text style={styles.title}> Registrar Novas Receitas </Text>

          {/* Campos de entrada para os dados da receita */}
          <TextInput
            label="Título"
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
          />

          <TextInput
            label="Ingredientes"
            value={ingredientes}
            onChangeText={setIngredientes}
            style={styles.input}
            multiline
          />

          <TextInput
            label="Modo de Preparo"
            value={instrucoes}
            onChangeText={setInstrucoes}
            style={styles.input}
            multiline
          />

          <TextInput
            label="Tempo"
            value={tempo}
            onChangeText={setTempo}
            style={styles.input}
          />

          <TextInput
            label="URL da imagem"
            value={imagem}
            onChangeText={setImagem}
            style={styles.input}
          />

          {/* Botão que registra a receita */}
          <Button
            mode="contained"
            onPress={handleAddOrUpdateReceitas}
            style={styles.button}>
            Registrar Receita
          </Button>

          {/* Botão que retorna à tela principal */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Receitas Geral')}
            style={styles.button}>
            Voltar
          </Button>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

// Estilos para os componentes da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    backgroundColor: '#FFF2D8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#FFA559',
  },
});
