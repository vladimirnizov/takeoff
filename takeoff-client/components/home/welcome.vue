<template lang="pug">
    v-card
        v-card-title.headline Hi {{ user.username }} !!
        v-card-text
            p Welcome to my App
            v-btn.mr-4(outlined @click="logout(null)") Logout
            v-btn(outlined to="/contacts") Check contacts
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
	computed: {
	...mapState('user', {
			user: 'user'
		})
    },
    methods: {
        ...mapMutations('user', {
            logout: 'user'
        })
    }
}
</script>