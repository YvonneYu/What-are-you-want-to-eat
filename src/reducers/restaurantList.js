import * as actionTypes from '../constants/ActionTypes';
import uuid from "uuid/v4";

// use fake one now
const initialState = [
  {
    id: uuid(),
    name: '麥當勞',
    tel: '',
    choices: ['便宜', '速食', '垃圾食物', '全天', '有外帶']
  },
  {
    id: uuid(),
    name: 'test2 餐廳',
    address: '測試的地址要很長測試的地址要很長',
    choices: []
  },
  {
    id: uuid(),
    name: 'test333333333333 餐廳',
    choices: []
  }
];

const getRestObj = (rest) => {
  return {
    id: rest.id,
    name: rest.name,
    tel: rest.tel,
    address: rest.address,
    choices: rest.choices
  }
};

let restaurantList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REST:
      return [
        ...state, getRestObj(action.rest)
      ];
    case actionTypes.EDIT_REST:
      return state.map((tempRest)=> {
        return (action.rest.id === tempRest.id ? getRestObj(action.rest) : tempRest);
      });
    case actionTypes.DELETE_REST:
      return state.filter(res =>
        res.id !== action.id
      );
    case actionTypes.GET_REST_LIST:
      return state;
    case actionTypes.SAVE_REST_LIST:
      return state;
    case actionTypes.FILTER_REST_LIST:
      let targetChoices = action.choices;
      return state.filter(res => {
        // if res choice is empty, default in the list
        if (res.choices.length === 0) return true;
        // return list if this res match one of choices
        res.choices.forEach( choice => {
           return targetChoices.has(choice);
        });
      });
    default:
      return state;
  }
};

export default restaurantList;