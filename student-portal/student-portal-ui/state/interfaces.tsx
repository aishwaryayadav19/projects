import { NextPageContext } from 'next'

export interface IContext extends NextPageContext {
  store: any
}
