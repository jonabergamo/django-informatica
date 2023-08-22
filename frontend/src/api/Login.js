import axios from 'axios';

const login = async (email, password) => {
  try {
    const response = await axios.post('/api/login', {
      email: email,
      password: password,
    });

    // Aqui você pode salvar o token JWT no local storage ou em cookies, por exemplo
    localStorage.setItem('token', response.data.access);

    return response.data; // Retorna os dados de resposta (token, user_id, etc.)
  } catch (error) {
    // Trate o erro conforme necessário
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export default login;
