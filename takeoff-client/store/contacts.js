export default 
{
    namespaced: true,
    state: () => ({
        contacts: [],
    }),
    actions: {
        async delete_contact({ commit }, id) {
            const query = `
                mutation contacts {
                    deliteContact(_id: "${id}"){
                        _id
                    }
                }
            `;

            let error = null;
            const response = await this.$graphql.request(query).catch(er => {
                error = er.response.errors[0].message
                console.error(error);
            });
        
            if(!error) {
                commit('delete', id)
            }
        },

        async edit_contact({ commit }, object) {
            const query = `
                mutation contacts {
                    editContact(_id: "${object._id}", name: "${object.name}", phone: "${object.phone}", mail: "${object.mail}"){
                        _id
                        name
                        phone
                        mail
                    }
                }
            `;

            let error = null;
            const response = await this.$graphql.request(query).catch(er => {
                error = er.response.errors[0].message
                console.error(error);
            });
          
            if(!error) {
                commit('edit', response.editContact ); 
            }
        },

        async add_contact({ commit }, object) {
            const query = `
                mutation contacts {
                    addContact(name: "${object.name}", phone: "${object.phone}", mail: "${object.mail}", creatorId: "${object.createdBy}"){
                        _id
                        name
                        phone
                        mail
                    }
                }
            `;


            let error = null;
            const response = await this.$graphql.request(query).catch(er => {
                error = er.response.errors[0].message
                console.error(error);
            });
          
            if(!error) {
                commit('add', response.addContact ); 
            }
        },
        get_contacts_data: async ({commit, state}, context = $nuxt) => {            
            const store   = (context.store || context.$store);
            const graphql = (context.graphql || context.$graphql);
            const user    = store.state.user.user;
            const query = `
                query contacts {
                    getContacts{
                        _id
                        name
                        phone
                        mail
                    }
                }
            `;

            if(user) {
                const response = await graphql.request(query).catch(er => {
                    console.error(er.response.errors[0].message);
                });
            
                if(response) {
                    commit('contacts', response.getContacts);
                }
            }
            
        }
    },
    mutations: 
    {
        /**
         * Set contacts
         * 
         * @return {void}
         */
        contacts( state, value ) {
            state.contacts = value;
        },

        delete( state, id ) {
            state.contacts = state.contacts.filter(item => item._id !== id)
        },

        add( state, value) {
            state.contacts.push(value)
        },
        
        edit( state, value ) {
            state.contacts = state.contacts.filter(item => item._id !== value._id)
            state.contacts.push(value)
        }
    }
}