<template lang="pug">
	v-layout(column justify-center align-center)
		v-flex(xs12 sm8 md6 style="min-width:50%;")
			welcome(v-if="user")
			login(v-else)
</template>

<script>
import { mapState } from 'vuex'
import Login 		from '../components/home/login'
import Welcome 		from '../components/home/welcome'


export default {
	components: {
		Login,
		Welcome
	},
	computed: {
	...mapState('user', {
			user: 'user'
		})
	}
}
</script>