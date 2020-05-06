<template lang="pug">
	v-layout(column)
		v-flex(xs12 sm8 md6)
			h2(v-if="!user" style="color: red") Only authorized users have access to this page
			contacts-list(v-else)
</template>

<script>
import { mapState } from 'vuex'
import ContactsList from '../components/contacts/list'

export default {
	components: {
		ContactsList
	},
	async fetch(context) {
        await context.store.dispatch('contacts/get_contacts_data', context);
    },
	computed: {
	...mapState('user', {
			user: 'user'
		})
	}
}
</script>