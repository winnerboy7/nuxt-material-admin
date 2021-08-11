<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>
        <!-- {{ selectedIndex }} -->

        <v-card class="mb-4">
          <v-toolbar color="primary darken-1" dark flat dense cad>
            <v-toolbar-title class="subheading"
              ><v-icon>mdi-tag</v-icon>{{ title }}</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn text icon @click="addTeacher(schId)">เพิ่ม</v-btn>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-toolbar dark color="error">
                  <v-icon large left>mdi-delete</v-icon>
                  <v-toolbar-title>คำเตือน! ยืนยันการลบข้อมูล</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <!-- <v-card-title>
                  <v-icon large left>mdi-delete</v-icon>
                  <span class="title font-weight-light">ยืนยันการลบข้อมูล</span>
                </v-card-title> -->
                <v-card-text class="headline font-weight-bold mt-3">
                  {{ formTitle }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >ยกเลิก</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >ลบข้อมูล</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="dialogInfo"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title
                    ><v-icon>mdi-tag</v-icon> {{ formTitle }}</v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon text @click="dialogInfo = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>

                <v-card-text>
                  <teacher-view
                    :title="formTitle"
                    :form.sync="form"
                  ></teacher-view>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions> </v-card-actions>
              </v-card>
            </v-dialog>

            <v-chip class="ma-2" color="pink" text-color="white">
              {{ teachers.length }}
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>

          <v-data-table
            v-model="selected"
            :headers="fields"
            :items="teachers"
            :search="search"
            :items-per-page="10"
            :footer-props="{
              'items-per-page-options': [10, 20, 50, 100, -1],
              showFirstLastPage: true,
              firstIcon: 'mdi-arrow-collapse-left',
              lastIcon: 'mdi-arrow-collapse-right',
              prevIcon: 'mdi-minus',
              nextIcon: 'mdi-plus'
            }"
            item-key="id"
            sort-by="id"
            class="elevation-1"
            show-select
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="ค้นหา"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:[`item.personId`]="{ item }">
              <div @click="showItem(item)">{{ item.personId }}</div>
            </template>
            <template v-slot:[`item.fullname`]="{ item }">
              <div @click="showItem(item)">{{ item.fullname }}</div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="editTeacher(item)"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>แก้ไขข้อมูล</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span>ลบข้อมูล</span>
              </v-tooltip>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">
                Reset
              </v-btn>
            </template>
          </v-data-table>

          <Dialog
            :title="dialogMsg.title"
            :message="dialogMsg.message"
            :type="dialogMsg.type"
            :show="dialogMsg.show"
            @onOk="onOk"
          ></Dialog>

          <pre>{{ selected }}</pre>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { equal } from "assert";
import { schoolService } from "@/_services/school.service";
import { teacherService } from "@/_services/teacher.service";
import TeacherView from "@/forms/teacherView";

import moment from "moment";
import Dialog from "@/components/Dialog";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import th from "vee-validate/dist/locale/th.json";
import * as rules from "vee-validate/dist/rules";

export default {
  layout: "area",
  middleware: "authorize-area",
  name: "ListSchoolTeachers",
  components: {
    ValidationObserver,
    ValidationProvider,
    Dialog,
    TeacherView
  },

  asyncData({ params }) {
    // called every time before loading the component
    return {
      schId: params.schId
    };
  },

  data() {
    return {
      title: "รายชื่อครูและบุคลากรในสถานศึกษา",
      formTitle: "",
      teachers: [],
      school: [],
      schName: "",

      dialog: false,
      dialogInfo: false,
      dialogDelete: false,

      item: "",
      selected: [],
      search: "",
      items_per_page: [10, 20, 50, 100, -1],

      selectedIndex: -1,
      selectedItem: [],

      fields: [
        {
          value: "personId",
          text: "เลขบัตรประชาชน",
          sortable: true
        },
        {
          value: "fullname",
          text: "ชื่อและนามสกุล"
        },
        {
          value: "personType.title",
          text: "ประเภท",
          sortable: true
        },
        {
          value: "positionName.title",
          text: "ตำแหน่ง",
          sortable: true
        },
        {
          value: "academicStandingName.title",
          text: "วิทยฐานะ"
        },
        { value: "actions", text: "ตัวเลือก" }
      ],
      yyyy: "",
      dd: "",
      mm: "",

      form: {
        areaName: "",
        areaCode: "",
        schName: "",
        schId: "",

        firstName: "",
        lastName: "",
        fullname: "",

        prefixCodeEn: "",
        firstNameEn: "",
        middleNameEn: "",
        lastNameEn: "",

        personId: "",
        birthdate: "",

        startDate: "",
        beginDate: "",
        retireDate: "",
        proCurrentDate: "",
        currentDepartmentDate: "",

        telNumber: "",
        emailAddress: "",
        marryStatus: "",
        marry: "",

        personBlood: "",
        personStatus: "",
        addPosition: "",
        department: "",
        dateAcademics: "",
        academicsSubject: "",

        schoolName2: "",
        assistanceDateStart: "",
        assistanceCommand: "",
        achoolName3: "",
        assistanceDateEnd: "",

        nationalityCode: "",
        personTypeCode: "",
        positionCode: "",
        academicStandingCode: "",
        teachAcademicLevelCode: "",
        teachSubjectCode: "",
        teacherQualificationCode: "",
        teacherCertificateCode: "",
        licenseNumber: "",
        licenseExpiredDate: "",

        licenseRenew: "",
        licenseStartDate: "",
        licenseExpiredDate: "",
        licenseCancel: "",

        addHouseId: "",
        addHouseNumber: "",
        addVillageNumber: "",
        addStreet: "",
        addSoi: "",
        addTrok: "",
        addSubdistrictCode: "",
        // addDistrict: "",
        // addProvince: "",

        currentHouseId: "",
        currentHouseNumber: "",
        currentVillageNumber: "",
        currentTrok: "",
        currentSoi: "",
        currentStreet: "",
        currentSubdistrictCode: "",

        // currentDistrict: "",
        // currentProvince: "",

        academicYear: "",
        semester: "",
        schoolId: "",
        passportNumber: "",
        passportStartDate: "",
        passportEndDate: "",

        prefixName: {
          title: ""
        },
        genderName: {
          title: ""
        },
        nationalityName: {
          title: ""
        },
        personType: {
          title: ""
        },
        teachSubjectName: {
          title: ""
        },
        academicStandingName: {
          title: ""
        },
        positionName: {
          title: ""
        }
      },

      action: "",
      actionConfirm: "",
      state: "readonly",
      // readonly: true,
      // disabled: false,
      dialogMsg: {
        title: "",
        message: "",
        type: "",
        show: false
      },
    };
  },

  computed: {
    rows() {
      return this.teachers.length;
    },
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    }
  },

  mounted() {},

  async created() {
    console.log("TEACHER");
    this.getSchools();
    this.getTeacherBySchoolId();
  },

  methods: {
    async getSchools() {
      try {
        [this.school] = await schoolService.getById(this.schId);
        this.schName = this.school.schName;
        this.title = `รายชื่อบุคลากรในสังกัดโรงเรียน${this.school.schName} : (${this.school.schId})`;
      } catch (error) {
        console.log(error);
      }
    },

    async getTeacherBySchoolId() {
      try {
        this.teachers = await teacherService.getBySchoolId(this.schId);
        // console.log(this.teachers);
        /*
        var temp = this.teachers;
        var autoNumber = 1;
        for (var x in temp) {
            temp[x]["id"] = autoNumber;
            autoNumber = autoNumber + 1;
        }
        this.teachers = temp;
        */
      } catch (error) {
        console.log(error);
      }
    },

    initialize() {},

    showItem(item) {
      this.formTitle = `รายชื่อบุคลากรในสังกัดโรงเรียน${item.schName} : (${item.schId})`;
      this.selectedIndex = this.teachers.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      //this.selectedItem = JSON.stringify(item, null, 2);
      for (let key in this.form) {
        this.form[key] = item[key];
      }

      this.dialogInfo = true;
    },

    deleteItem(item) {
      this.formTitle = `ยืนยันการลบข้อมูล: ${item.fullname} หรือไม่?`;
      this.selectedIndex = this.teachers.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      this.dialogDelete = true;

      this.deleteConfirm = "";
      this.action = "delete";
    },

    deleteItemConfirm() {
      this.teachers.splice(this.selectedIndex, 1);

      console.log("Delete : " + this.selectedItem.fullname);
      teacherService.delete(this.selectedItem.schId);

      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "";

      this.closeDelete();
    },

    closeInfo() {
      this.dialogInfo = false;
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem);
        this.selectedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem);
        this.selectedIndex = -1;
      });
    },

    onOk(value) {
      this.dialogMsg = {
        title: "",
        message: "",
        type: "primary",
        show: false
      };
    },

    //ส่งลิ้งค์ไปหน้าเพิ่มข้อมูลครู
    addTeacher(schId) {
      this.$router.push(`/area/teachers/${schId}/add`);
    },

    //ลิ้งค์ไปหน้าแก้ไขข้อมูล
    editTeacher(teacher) {
      this.$router.push(`/area/teachers/${this.schId}/${teacher.personId}`);
    },

    //คำนวณวันที่แสดงใน Modals จากรูปแบบ 19900918 (YYYYMMDD)
    fotmatDateThai(datehbd) {
      this.yyyy = datehbd.substring(0, 4);
      this.mm = datehbd.substr(4, 2);
      this.dd = datehbd.substr(6, 2);

      var datehbdRe =
        this.dd + "/" + this.mm + "/" + (parseInt(this.yyyy) + 543);
      var diffAge = this.yyyy + "-" + this.mm;

      var a = moment();
      var b = moment(diffAge, "YYYY-MM");
      var age = moment.duration(a.diff(b));
      var years = age.years();
      var months = age.months();

      return (
        datehbdRe + " (ปัจจุบันอายุ " + years + " ปี " + months + " เดือน)"
      );
    },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    }
  },

  watch: {
    actionConfirm: function() {
      this.getTeacherBySchoolId();
    }
  }
};
</script>

<style scoped>
.card-title {
  margin-bottom: 0rem;
}
.text-header {
  margin-top: 40px;
}
span .page-link {
  line-height: normal;
}
.btn-prev {
  margin-bottom: -6px;
  margin-top: -4px;
}
.text-detail-teacher p {
  margin-bottom: 0px;
}
.btn-addPer {
  margin-top: -32px;
}
</style>
