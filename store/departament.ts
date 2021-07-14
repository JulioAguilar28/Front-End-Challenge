import { actionTree, getterTree, mutationTree } from 'typed-vuex'

export const state = () => ({
  departament: [],
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {})

export const actions = actionTree({ state, getters, mutations }, {})
