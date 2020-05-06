<template lang="pug">
	v-card
		v-data-table.elevation-1(:headers='headers' :items='contacts' :search="search")
			template(v-slot:top)
				v-toolbar(flat)
					v-toolbar-title Contacts
					v-divider.mx-4(inset vertical)
					v-text-field(v-model="search" label="Search" single-line hide-details)
					v-spacer
					v-dialog(v-model='dialog' max-width='500px')
						template(v-slot:activator='{ on }')
							v-btn.mb-2(outlined dark v-on='on') New Contact
						v-card
							v-card-title
								span.headline {{ formTitle }}
							v-card-text
								v-container
									v-row
										v-col(cols='12' sm='6' md='4')
											v-text-field(v-model='editedItem.name' label='Name')
										v-col(cols='12' sm='6' md='4')
											v-text-field(v-model='editedItem.phone' label='Phone')
										v-col(cols='12' sm='6' md='4')
											v-text-field(v-model='editedItem.mail' label='E-mail')
							v-card-actions
								v-spacer
								v-btn(color='blue darken-1' text @click='close') Cancel
								v-btn(color='blue darken-1' text @click='save') Save
			template(v-slot:item.actions='{ item }')
				v-icon.mr-2(small @click='editItem(item)') mdi-pencil
				v-icon(small @click='deleteItem(item)') mdi-delete
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default 
{
    data: () => ({
		search: '',
		dialog: false,
		headers: [
			{ text: 'Name', value: 'name' },
			{ text: 'Phone', value: 'phone' },
			{ text: 'E-mail', value: 'mail' },
			{ text: 'Actions', value: 'actions', sortable: false },
		],
		editedIndex: -1,
		editedItem: {
			name: '',
			phone: '',
			mail: ''
		},
		defaultItem: {
			name: '',
			phone: '',
			mail: ''
		},
    }),
    computed: {
		...mapState('user', { user: 'user'}),
		...mapState('contacts', { contacts: 'contacts'}),

		formTitle () {
			return this.editedIndex === -1 ? 'New contact' : 'Edit contact'
		},
    },
    watch: {
		dialog (val) {
			val || this.close()
		},
    },
    methods: {
		...mapActions('contacts', {
			deleteContact: 'delete_contact',
			editContact  : 'edit_contact',
			addContact	 : 'add_contact'
		}),
		editItem(item) {			
			this.editedIndex = this.contacts.indexOf(item)
			this.editedItem  = Object.assign({}, item)
			this.dialog 	 = true
		},

		deleteItem(item) {
			confirm('Are you sure you want to delete this contact?') && this.deleteContact(item._id)
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
			})
		},

		save() {
			if(this.editedIndex > -1) {
				this.editContact(this.editedItem)
			} 
			else {
				this.editedItem.createdBy = this.user._id
				this.addContact(this.editedItem)
			}
			
			this.close()
		}
    }
  }
</script>