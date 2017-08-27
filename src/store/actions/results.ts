export function selectResult(result) {
  return {
    type: 'SELECT_RESULT',
    payload: result,
  };
}

export function nextResult() {
  return {
    type: 'NEXT_RESULT'
  };
}

export function prevResult() {
  return {
    type: 'PREV_RESULT'
  };
}
