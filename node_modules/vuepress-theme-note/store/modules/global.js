const state = {
    sidebar: true
}


const getters = {
    isSidebarOpen: (state, getters, rootState) => {
        return state.sidebar
    }
}

const mutations = {
    SetSidebarState(state, status) {
        state.sidebar = status
    }
}

const actions = {
    toggleSidebar({ commit, state }) {
        commit('SetSidebarState', !state.sidebar)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}