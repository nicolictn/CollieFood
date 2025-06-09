import React, { createContext, useState } from 'react';

export const ReceitasContext = createContext();

/*api local -> mas armazena na memória enquanto o aplicativo está em uso*/ 
/*para nao utilizar props (codigo fica mto cheio) */
/*serve para compartilhar o estado para multiplas telas/componentes */
export const ReceitasProvider = ({ children }) => {
  const [receitas, setReceitas] = useState([
    {
      id: '1',
      nome: 'Torta de Maçã',
      descricao: 'Torta de maçã deliciosa',
      tempo: '40 min',
      ingredientes: ['Maçã', 'Farinha', 'Leite', 'Ovo'],
      imagem:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT90PMR57MOgorc0y9-uOj-bJ3MP3E8LgHxJBkSYhUFL4Crq8QWA9oENFrQJR2Yo54eC1IHGU_LHDBeRETwTKVZcdsZnGwssv7NlZrXOc8',
    },
    {
      id: '2',
      nome: 'Brownie',
      descricao: 'Brownie de chocolate',
      tempo: '30min',
      ingredientes: ['Manteiga', 'Açúcar', 'Ovos', 'Achocolatado'],
      imagem:
        'https://static.itdg.com.br/images/1200-630/0191a4f23349e54e618a65f2051d68a8/shutterstock-1915577575-2-.jpg',
    },
  ]);

  //id da receita sendo editada
  const [editaId, setEditaId] = useState(null);

  //objeto da receita sendo editada
  const [receitaEditando, setReceitaEditando] = useState(null);

  //adiciona nova receita ou atualiza se estiver editando
  const adicionarReceita = (novaReceita) => {
    if (editaId) {
      setReceitas((prev) =>
        prev.map((r) => (r.id === editaId ? { ...novaReceita, id: editaId } : r))
      );
      setEditaId(null);
      setReceitaEditando(null);
    } else {
      setReceitas((prev) => [...prev, { ...novaReceita, id: Date.now().toString() }]);
    }
  };

  //define qual receita será editada
  const editarReceita = (receita) => {
    setEditaId(receita.id);
    setReceitaEditando(receita);
  };

  //exclui uma receita pelo ID
  const excluirReceita = (id) => {
    setReceitas((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <ReceitasContext.Provider
      value={{
        receitas,
        adicionarReceita,
        editarReceita,
        excluirReceita,
        editaId,
        receitaEditando,
      }}
    >
      {children}
    </ReceitasContext.Provider>
  );
};
