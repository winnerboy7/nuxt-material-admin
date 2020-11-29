<template>
  <v-container
    grid-list-xl
    fluid
  >
    <v-layout
      row
      wrap
    >
      <!-- mini statistic start -->
      <v-flex
        lg3
        sm6
        xs12
      >
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntTeacher.toLocaleString()"
          sub-title="ข้าราชการครู"
          color="indigo"
        >
        </mini-statistic>
      </v-flex>
      <v-flex
        lg3
        sm6
        xs12
      >
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntTeacherAll.toLocaleString()"
          sub-title="ครูและบุคลากรทั้งหมด"
          color="red"
        >
        </mini-statistic>
      </v-flex>
      <v-flex
        lg3
        sm6
        xs12
      >
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntPersonel.toLocaleString()"
          sub-title="จำนวน บุคลากรใน สพท."
          color="light-blue"
        >
        </mini-statistic>
      </v-flex>
      <v-flex
        lg3
        sm6
        xs12
      >
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntSchool.toLocaleString()"
          sub-title="จำนวนโรงเรียน"
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
import { schoolService } from "@/_services/school.service";
import { teacherService } from "@/_services/teacher.service";
import { personelService } from "@/_services/personel.service";
import MiniStatistic from "@/components/widgets/statistic/MiniStatistic";

export default {
  layout: "area",
  middleware: ['auth', 'authorize-area'],

  components: {
    MiniStatistic,
  },

  data() {
    return {
      title: "ผู้ดูแลระบบสำนักงานเขตพื้นที่การศึกษา",
      cntSchool: 0,
      cntTeacher: 0,
      cntTeacherAll: 0,
      cntPersonel: 0,
    };
  },

  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },

  created() {
    this.countSchool();
    this.countTeacher();
    this.countTeacherAll();
    this.countPersonel();
  },

  methods: {
    async countSchool() {
      let { count } = await schoolService.countSchool(
        this.account.user.areaCode
      );
      this.cntSchool = count;
    },

    async countTeacher() {
      let { count } = await teacherService.countTeacherArea(
        this.account.user.areaCode,
        10
      );
      this.cntTeacher = count;
    },
    async countTeacherAll() {
      let { count } = await teacherService.countTeacherArea(
        this.account.user.areaCode
      );
      this.cntTeacherAll = count;
    },

    async countPersonel() {
      let { count } = await personelService.countPersonel(
        this.account.user.areaCode
      );
      this.cntPersonel = count;
    },
  },
};
</script>

<style scoped>
</style>
