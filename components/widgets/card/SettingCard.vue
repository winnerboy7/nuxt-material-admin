<template>
  <v-card>
    <v-toolbar color="teal" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>
    <v-list two-line subheader>
      <v-subheader>General</v-subheader>
      <v-list-item avatar>
        <v-list-item-content>
          <v-list-item-title>Profile photo</v-list-item-title>
          <v-list-item-sub-title>Change your Google+ profile photo</v-list-item-sub-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item avatar>
        <v-list-item-content>
          <v-list-item-title>Show your status</v-list-item-title>
          <v-list-item-sub-title>Your status is visible to everyone</v-list-item-sub-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list two-line subheader>
      <v-subheader>Hangout notifications</v-subheader>
      <v-list-item avatar>
        <v-list-item-action>
          <v-checkbox v-model="notifications"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Notifications</v-list-item-title>
          <v-list-item-sub-title>Allow notifications</v-list-item-sub-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item avatar>
        <v-list-item-action>
          <v-checkbox v-model="sound"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Sound</v-list-item-title>
          <v-list-item-sub-title>Hangouts message</v-list-item-sub-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item avatar>
        <v-list-item-action>
          <v-checkbox v-model="video"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Video sounds</v-list-item-title>
          <v-list-item-sub-title>Hangouts video call</v-list-item-sub-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item avatar>
        <v-list-item-action>
          <v-checkbox v-model="invites"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Invites</v-list-item-title>
          <v-list-item-sub-title>Notify when receiving invites</v-list-item-sub-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      notifications: false,
      sound: false,
      video: false,
      invites: false
    };
  }
};
</script>