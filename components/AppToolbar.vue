<template>
  <v-app-bar
    color="primary"
    fixed
    dark
    app
  >
    <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
    
    <v-toolbar-title class="ml-0 pl-3">
      สำนักพัฒนาระบบบริหารงานบุคคลและนิติการ
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon href="https://github.com/winnerboy7/nuxt-material-admin">
      <v-icon>fa-2x fa-github</v-icon>
    </v-btn>
    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <v-menu offset-y origin="center center" class="elelvation-1" :nudge-right="140" :nudge-bottom="14" transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon 
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon medium>notifications</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <notification-list></notification-list>
    </v-menu>
    <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          large
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar size="30px">
            <img src="../static/avatar/man_4.jpg" alt="Michael Wang"/>
          </v-avatar>
        </v-btn>
      </template>
      <v-list class="pa-0">
        <v-toolbar dense color="transparent">
          <v-toolbar-title><h4>{{ account.user.role }}</h4></v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-action>
            <v-icon>perm_identity</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span class="user-name" v-if="account.user.role === 'Area'">{{ account.user.name }} ({{ account.user.areaName }} )</span>
              <span class="user-name" v-else >{{ account.user.name }}({{ account.user.username }} )</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href"
                     @click="item.click" ripple :disabled="item.disabled" :target="item.target" rel="noopener"
                     :key="index">
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
  import NotificationList from '@/components/widgets/list/NotificationList';
  import Util from '@/util';
  import { mapState, mapActions } from "vuex";

  export default {
    name: 'app-toolbar',
    components: {
      NotificationList
    },
    data:  function () {
      return {
        items: [
          {
            icon: 'account_circle',
            href: '#',
            title: 'ข้อมูลส่วนตัว',
            click: this.handleProfile
            // click: (e) => {
            //   console.log(e);
            // }
          },
          {
            icon: 'settings',
            href: '#',
            title: 'ตั้งค่าระบบ',            
            click: (e) => {
              console.log(e);
            }
          },
          {
            icon: 'no_meeting_room',
            href: '/login',
            title: 'ออกจากระบบ',
            click: this.handleLogout
          }
        ],
      }
    },
    computed: {
      ...mapState({
        account: state => state.account
      }),

      toolbarColor() {
        return this.$vuetify.options.extra.mainNav;
      }
    },
    methods: {
      toggleDrawer() {
        this.$store.commit('toggleDrawer')
      },
      handleFullScreen() {
        Util.toggleFullScreen();
      },
      ...mapActions("account", ["login", "logout"]),
      ...mapActions("alert", ["success", "error", "clear"]),
      async handleLogout() {
        this.$router.push('/login');
        await this.$auth.logout();
      },
      handleProfile() {
        if (this.account.user.role === 'Area') {
          this.$router.push('/area/profile');
        }
        else if (this.account.user.role === 'Admin') {
          this.$router.push('/admin/profile');
        }
        else if (this.account.user.role === 'School') {
          this.$router.push('/school/profile');
        }        
      }
    }
  };
</script>
