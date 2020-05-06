<template lang="pug">
	v-card
		v-card-title.headline Welcome to my App
		v-card-text
			p Please enter your username and password
			p(style="color: red;") {{ error_message }}

			v-form(ref="form" v-model="valid" lazy-validation)
				v-text-field(v-model="name" :counter="10" :rules="nameRules" label="Name" required)
				v-text-field(v-model="password" :rules="passwordRules" label="Password" required)
				.d-flex.justify-end
					v-btn.mr-4(:disabled="!valid" outlined @click="login") Continue
					v-btn(outlined @click="reset") Reset Form
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
	data: () => ({
		valid: true,
		name: '',
		nameRules: [
			v => !!v || 'Name is required',
			v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		],
		password: '',
		passwordRules: [
			v => !!v || 'Password is required',
		]
	}),
	computed: {
		...mapState('user', {
			error_message: "error_message"
		})
	},
	methods: {
		...mapActions('user', {
			setUser: 'user'
		}),
		login() {
			this.validate();

			if(this.valid) {
				this.setUser({ name: this.name, password: this.password})
			}
		},

		validate () {
			this.$refs.form.validate();
		},

		reset () {
			this.$refs.form.reset();
		}
	}
}
</script>