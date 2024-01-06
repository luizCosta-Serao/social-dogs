import React from 'react'

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if(!response.ok) throw new Error('Email ou Usuário já cadastrado');
    } catch(err) {
      json = null;
      setError('Email ou Usuário já cadastrado');
    } finally {
      setData(json);
      setLoading(false);
      return {response, json}
    }
  }, [])

  return {
    data,
    error,
    loading,
    request,
  }
}

export default useFetch