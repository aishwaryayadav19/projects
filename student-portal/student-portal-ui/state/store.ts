import { AnyAction, combineReducers } from 'redux'

import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { Action, configureStore } from '@reduxjs/toolkit'

import { createWrapper, Context } from 'next-redux-wrapper'

import students from './students'
import admin from './admin'
import user from './user'

const rootReducer = combineReducers({
  students,
  admin,
  user
})

const makeStore = (context: Context = {}) =>
  configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production'
  })

const dispatch = makeStore().dispatch
const state = makeStore().getState

export type RootState = ReturnType<typeof rootReducer>
export type Dispatch = typeof dispatch
export type State = typeof state
export type Thunk = ThunkAction<void, RootState, null, Action<string>>
export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

export const wrapper = createWrapper(makeStore, { debug: false })

export default makeStore()
