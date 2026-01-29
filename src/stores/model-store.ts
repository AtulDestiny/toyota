
import { createStore } from 'zustand/vanilla'

export type ModelState = {
  currentModelState: string
}

export type ModelActions = {
  setCurrentModelState: (value: string) => void
}

export type ModelStore = ModelState & ModelActions


export const initModelStore = (): ModelState => {
  return { currentModelState: '' }
}

export const defaultInitState: ModelState = {
  currentModelState: '',
}

export const createModelStore = (
  initState: ModelState = defaultInitState,
) => {
  return createStore<ModelStore>()((set) => ({
    ...initState,
    setCurrentModelState: (value: string) => set({ currentModelState: value }),
  }))
}