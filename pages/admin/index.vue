<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <!-- mini statistic start -->
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cnt10.toLocaleString()"
          sub-title="ข้าราชการครูและบุคลากรทางการศึกษา"
          color="indigo"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cnt11.toLocaleString()"
          sub-title="ข้าราชการพลเรือนสามัญ"
          color="red"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cnt23.toLocaleString()"
          sub-title="พนักงานราชการ"
          color="light-blue"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cnt15.toLocaleString()"
          sub-title="ลูกจ้างประจำ"
          color="purple"
        >
        </mini-statistic>
      </v-flex>

      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cnt17.toLocaleString()"
          sub-title="ลูกจ้างชั่วคราว"
          color="pink"
        >
        </mini-statistic>
      </v-flex>

      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cnt38.toLocaleString()"
          sub-title="บุคลากรทางการศึกษา 38 ค.(2)"
          color="teal"
        >
        </mini-statistic>
      </v-flex>

       <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntArea.toLocaleString()"
          sub-title="สำนักงานเขตพื้นที่การศึกษา"
          color="cyan"
        >
        </mini-statistic>
      </v-flex>

       <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-bar-chart"
          :title="cntSchool.toLocaleString()"
          sub-title="จำนวนโรงเรียน"
          color="green"
        >
        </mini-statistic>
      </v-flex>

      <v-flex sm12 lg12>
        <v-card class="mb-4">
          <v-toolbar color="primary darken-1" dark flat dense cad>
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
import MiniStatistic from "@/components/widgets/statistic/MiniStatistic";

export default {
  layout: "admin",
  middleware: "authorize-admin",

  components: {
    MiniStatistic
  },

  data() {
    return {
      title: "ผู้ดูแลระบบ",
      cntArea: 0,
      cntSchool: 0,
      cnt10: 0,
      cnt11: 0,
      cnt23: 0,
      cnt15: 0,
      cnt17: 0,
      cnt38: 0,
      cntTotal: 0,
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
    this.count10();
    this.count11();
    this.count23();
    this.count15();
    this.count17();
    this.count38();
  },

  mounted() {
    this.cntTotal = this.cnt10 + this.cnt11 + this.cnt23 + this.cnt15 + this.cnt17 + this.cnt38;
  },

  methods: {
    async countArea() {
      let orgType = "Area"
      let { count } = await areaService.countArea(orgType);
      this.cntArea = count;
    },

    async countSchool() {
      let { count } = await schoolService.countSchool();
      this.cntSchool = count;
    },

    // async countTeacherAll() {
    //   let { count } = await teacherService.countTeacher();
    //   this.cntTeacherAll = count;
    // },
    async count10() {
      let { count } = await teacherService.countTeacher(
        "",
        10
      );
      this.cnt10 = count;
    },
    async count11() {
      let { count } = await teacherService.countTeacher(
        "",
        11
      );
      this.cnt11 = count;
    },
    async count23() {
      let { count } = await teacherService.countTeacher(
        "",
        23
      );
      this.cnt23 = count;
    },
    async count15() {
      let { count } = await teacherService.countTeacher(
        "",
        15
      );
      this.cnt15 = count;
    },
    async count17() {
      let { count } = await teacherService.countTeacher(
        "",
        17
      );
      this.cnt17 = count;
    },
    async count38() {
      let { count } = await teacherService.countTeacher(
        "",
        38
      );
      this.cnt38 = count;
    },
  }
};
</script>

<style scoped></style>
