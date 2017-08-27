const searchUrl = (query) =>
  `http://api.cliqz.com/api/v2/results?country=de&q=${query}`;

export default function (query) {
  const url = searchUrl(query);

  return async dispatch => {
    dispatch({
      type: 'QUERY',
      payload: query,
    });

    const response = await fetch(url);
    const results = await response.json();

    dispatch({
      type: 'RESULTS',
      payload: results.results,
    });
  };
}
