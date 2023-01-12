// CREATE REDUX STORE
const redux = require('redux')
import { configureStore } from '@reduxjs/toolkit';
const  configureStore = redux.configureStore
// ACTION
//define the string constant that indicate the type of the action

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED' 
 
// Action creator(funtion that create an action, and returns the action(object))
function orderCake() {
    
// Defining the action(an object that has the type property)
 return{
    type: CAKE_ORDERED ,
    quantity: 1,
 }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        quantity:qty,
    }
}

// REDUCER
// (previousState,action)=>newState
const initialState = {
    numberOfCakes: 10
}

const reducer = (state = initialState, action) => {
    // body to return the new state of the app based on the current state and the action
    switch(action.type){
        case CAKE_ORDERED:
            return {
            ...state,  //makes a copy of the state property and takes just the numberOfCakes.
            numberOfCakes: state.numberOfCakes - 1,
            } 
        case CAKE_RESTOCKED:
            return {
                ...state,
                numberOfCakes:state.numberOfCakes + action.quantity,
            }
        default:
            return state
    }
}

//Making use of the methods connfigstore
const store =configureStore(reducer)
console.log('Initial state', store.getState()) // getstate gives the current state of the app, in this case it is the initial state

// Setup a listener for the store, subscribe to the store, allow the app to subscribe the changes in the app store
const unsubscribe = store.subscribe(() => console.log('updated state', store.getState())) //4th responsibility

store.dispatch(orderCake())  //update the changes
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))

unsubscribe() //finally unsubscribe