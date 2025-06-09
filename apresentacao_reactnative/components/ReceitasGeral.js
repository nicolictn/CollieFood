import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { ReceitasContext } from './ReceitasContext';

/*estilizar o grid*/
const numColumns = 2;
const width = Dimensions.get('window').width / numColumns - 20;

export default function ReceitasGeral({ navigation }) {
  /*usa o contexto dentro do componente*/
  const { receitas, excluirReceita, editarReceita } = useContext(ReceitasContext);
  /*item = um elemento na lista de dados 
  render -> é desestruturação de objeto */
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={styles.tempo}>Tempo: {item.tempo}</Text>
      <Text style={styles.ingredientes}>
        Ingredientes: {(item.ingredientes || []).join(', ')}
      </Text>

      {/*botões de editar e excluir */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
        <Button
          title="Editar"
          onPress={() => {
            editarReceita(item);
            navigation.navigate('Registro');
          }}
        />
        <Button
          title="Excluir"
          color="#FF4C4C"
          onPress={() => excluirReceita(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#FFA559', height: 80 }}>
        <Appbar.Content
          title="Collie Food"
          titleStyle={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 28,
          }}
          style={{ top: 8 }}
        />
      </Appbar.Header>

      <View>
        {/*texto inicial */}
        <Text style={styles.titulo}>
          Anote suas receitas preferidas ou crie suas receitas.{' '}
          <Text style={styles.titulo2}>Tudo em um só lugar.</Text>
        </Text>
      </View>

      {/*pesquisa */}
      <View style={styles.pesquisar}>
        <TextInput style={styles.input} placeholder="Pesquisar receitas" />
      </View>

      {/*botão */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.buttonText}>Adicionar!</Text>
      </TouchableOpacity>

      {/*lista de receitas*/}

      /*chave única para cada item = keyextractor*/
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        numColumns={2}
        contentContainerStyle={styles.lista}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Texto inicial
  titulo: {
    fontSize: 25,
    color: '#808080',
    fontWeight: '600',
    margin: 40,
  },
  titulo2: {
    color: '#FFA559',
  },

  // Pesquisa
  pesquisar: {
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    height: 50,
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  input: {
    marginLeft: 20,
    fontSize: 18,
  },

  // Botão
  button: {
    backgroundColor: '#FFA559',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginBottom: 30,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },

  // Lista
  lista: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },

  // Cards
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    width: width,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingBottom: 10,
  },
  imagem: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  nome: {
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  descricao: {
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tempo: {
    paddingHorizontal: 10,
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
  },
  ingredientes: {
    paddingHorizontal: 10,
    fontSize: 13,
    color: '#444',
  },
});
