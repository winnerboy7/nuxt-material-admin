<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <!-- mini statistic start -->
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntTeacher.toLocaleString()"
          sub-title="ครู"
          color="indigo"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntTeacherAll.toLocaleString()"
          sub-title="ข้าราชการครู"
          color="red"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntSchool.toLocaleString()"
          sub-title="โรงเรียน"
          color="light-blue"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntArea.toLocaleString()"
          sub-title="สพท."
          color="purple"
        >
        </mini-statistic>
      </v-flex>

      <v-flex
        sm12
        lg12
      >
        <v-card class="mb-4">
          <v-toolbar
            color="primary darken-1"
            dark
            flat
            dense
            cad
          >
            <v-toolbar-title class="subheading">{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="">
            <div v-if="account.status.loggedIn">
              <h1>สวัสดี {{ account.user.name }}!</h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import { areaService } from "@/_services/area.service";
  import { schoolService } from "@/_services/school.service";
  import { teacherService } from "@/_services/teacher.service";
  import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';

  export default {
    layout: "admin",
    middleware: "authorize-admin",

    components: {
      MiniStatistic,
    },

    data() {
      return {
        title: "ผู้ดูแลระบบ",
        cntArea: 0,
        cntSchool: 0,
        cntTeacher: 0,
        cntTeacherAll: 0,
      };
    },

    computed: {
      ...mapState({
        account: state => state.account
      })
    },

    created() {
      this.countArea();
      this.countSchool();
      this.countTeacher();
      this.countTeacherAll();
    },
    
    methods: {
      async countArea() {
        let { count } = await areaService.countArea();
        this.cntArea = count;
      },

      async countSchool() {
        let { count } = await schoolService.countSchool();
        this.cntSchool = count;
      },

      async countTeacher() {
        let { count } = await teacherService.countTeacher("", 10);
        this.cntTeacher = count;
      },
      async countTeacherAll() {
        let { count } = await teacherService.countTeacher();
        this.cntTeacherAll = count;
      }
    }
  }
</script>

<style scoped>

</style>
