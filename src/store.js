import Vuex from 'vuex'; 
import Vue from 'vue'; 

Vue.use(Vuex);

export default  new Vuex.Store({
    state:{
      loggedIn: false
    },
    mutations:{
        loggedIn (state) {
            state.loggedIn = true
        },
        loggedOut (state) {
            state.loggedIn = false
        }
    },
    actions:{
        inLogin (context) {
       
                context.commit ('loggedIn')
            
          },
          outLogin (context) {
         
                context.commit ('loggedOut')
         
          }
        },
        
  });