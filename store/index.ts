import { getAccessorType } from 'typed-vuex'
import * as departament from './departament'

export const state = () => ({
  counter: 0,
})

export const getters = {}

export const mutations = {}

export const actions = {}

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    departament,
  },
})
