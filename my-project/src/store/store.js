import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
    showArticleId:'',
    listArticleType:'',
    searchKeyword:''
  },
  mutations:{
    setShowArticleId(state,idValue){
      state.showArticleId = idValue
    },
    setListArticleType(state,typeValue){
      state.listArticleType = typeValue
    },
    setSearchKeyword(state,keywordValue){
      state.searchKeyword = keywordValue
    }
  },
  getters:{
    getShowArticleId:state=>state.showArticleId,
    getListArticleType:state=>state.listArticleType,
    getSearchKeyword:state=>state.searchKeyword,
  },
  actions:{

  },
  modules:{

  }
})
