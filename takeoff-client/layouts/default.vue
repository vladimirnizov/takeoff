<template lang="pug">
  v-app(dark)
    v-navigation-drawer(v-model="drawer" app)
      v-list
        v-list-item(v-for="(item, i) in items" :key="i" :to="item.to")
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text="item.title")
    v-app-bar(app)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title(v-text="title")
      v-spacer
    v-content
      v-container.d-flex(style="min-height: 100%;")
        nuxt
    v-footer
      span &copy; {{ new Date().getFullYear() }}
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-contacts',
          title: 'Contacts',
          to: '/contacts'
        }
      ],
      title: 'Takeoff'
    }
  }
}
</script>
