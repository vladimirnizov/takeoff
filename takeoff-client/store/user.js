export default 
{
    namespaced: true,
    state: () => ({
        user: null,
        error_message: null
    }),
    actions: 
    {
        /**
         * Fetch user
         * 
         * @return {void}
         */
        async user({ state, commit }, user) 
        {            
            const name     = user.name;
            const password = user.password;

            const query = `
                query user {
                    getUser(username:"${name}", password:"${password}"){
                        _id
                        username
                    }
                }
            `;
         
            let error = null;
            const response = await this.$graphql.request(query).catch(er => {
                error = er.response.errors[0].message;
                commit('error_message', error );   
            });
          
            if(!error) {
                commit('user', response.getUser ); 
            }
        },
    },
    mutations: 
    {
        /**
         * Set user
         * 
         * @return {void}
         */
        user( state, value ) {
            state.user = value;
            state.error_message = null
        },

        /**
         * Set error message
         * 
         * @return {void}
         */
        error_message( state, value ) {
            state.error_message = value
        }
    }
}