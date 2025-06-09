import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoInicio}
        source={require('../assets/img-inicio.png')}
      />
      <Image style={styles.logo} source={require('../assets/CollieFood.png')} />
      <Text style={styles.txt}>O seu aliado para a sua</Text>
      <Text style={styles.txtInicio}>melhor experiência culinária!</Text>
      <TouchableOpacity style={styles.button } onPress={() => navigation.navigate('Receitas Geral')}> //no lugar no button, para poder personalizar
        <Text style={styles.buttonText}>Bora!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20,
  },
  logo: {
    height: 100,
    width: 400,
    transform: [{ scale: 0.5 }],
    marginVertical: 100,
  },
  txt: {
    fontSize: 20,
  },
  txtInicio: {
    fontSize: 20,
    color: '#FFA559',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFA559',
    paddingVertical: 10,     
    paddingHorizontal: 60,  
    borderRadius: 25,        
    marginTop: 20,
  },
  buttonText:{
    fontSize: 20
  }
});