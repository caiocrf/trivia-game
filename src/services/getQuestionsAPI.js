const getQuestionsAPI = async (token) => {
  const api = await fetch(`https://opentdb.com/api.php?amount=5&encode=url3986&token=${token}`);
  const data = await api.json();

  return data;
};

export default getQuestionsAPI;
