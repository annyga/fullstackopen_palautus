const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let newGood = state.good + 1
      return {...state, good: newGood}
    case 'OK':
      let newOk = state.ok +1
      return {...state, ok: newOk}
    case 'BAD':
      let newBad = state.bad + 1
      return {...state, bad: newBad}
    case 'ZERO':
      return {good: 0, ok: 0, bad: 0}
    default: return state
  }
  
}

export default counterReducer