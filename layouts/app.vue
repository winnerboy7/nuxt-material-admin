<template>
  <div id="appRoot">
    <template>
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-main>
          <!-- Page Header -->
          <page-header></page-header>
          <div class="page-wrapper">
            <nuxt/>
          </div>
          <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">&copy; Copy right : {{ new Date().getFullYear() }} สำนักพัฒนาระบบบริหารงานบุคคลและนิติการ - สพฐ. All rights reserved.</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"> Chaimongkol studio. API Version : {{version}}</span>
            <v-icon color="pink" small>favorite</v-icon>
          </v-footer>
        </v-main>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <v-btn small fab dark text fixed top="top" right="right" class="setting-fab" color="red"
               @click="openThemeSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
        >
          <theme-settings></theme-settings>
        </v-navigation-drawer>
      </v-app>
    </template>


    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark text @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import AppDrawer from '@/components/AppDrawerHome'
  import AppToolbar from '@/components/AppToolbar'
  import AppFab from '@/components/AppFab'
  import PageHeader from '@/components/PageHeader'
  import ThemeSettings from '@/components/ThemeSettings'
  import npmPackage from "@/package.json"

  export default {
    components: {
      AppDrawer,
      AppToolbar,
      AppFab,
      PageHeader,
      ThemeSettings
    },
    data: () => ({
      expanded: true,
      rightDrawer: false,
      snackbar: {
        show: false,
        text: '',
        color: '',
      },
      version: npmPackage.version
    }),

    methods: {
      openThemeSettings() {
        this.$vuetify.goTo(0)
        this.rightDrawer = (!this.rightDrawer)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
