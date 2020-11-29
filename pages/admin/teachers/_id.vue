<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>
        <!-- {{ selectedIndex }} -->

        <v-card class="mb-4">
          <v-toolbar color="primary darken-1" dark flat dense cad>
            <v-toolbar-title class="subheading"><v-icon>mdi-tag</v-icon>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text icon  @click="handleExport">ส่งออก</v-btn>
            
            <v-dialog
              v-model="dialogInfo"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title><v-icon>mdi-tag</v-icon> {{ formTitle }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon text @click="dialogInfo = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>

                <v-card-text>
                  <v-card class="mt-3">
                    <v-toolbar flat color="info" dark dense>
                      <v-toolbar-title><v-icon>mdi-tag</v-icon> ข้อมูลบุคลากร</v-toolbar-title>
                    </v-toolbar>
                    <v-tabs vertical>
                      <v-tab>
                        <v-icon left>
                          mdi-format-list-bulleted-type
                        </v-icon>
                        ข้อมูลประวัติส่วนตัว
                      </v-tab>
                      <v-tab>
                        <v-icon left>
                          mdi-account-star
                        </v-icon>
                        ข้อมูลการทำงาน
                      </v-tab>

                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ชื่อ-สกุล</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.fullname }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>หมายเลขบัตรประชาชน</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.personId }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>เพศ</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.genderName.title }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>สัญชาติ</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.nationalityName.title }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>วันเกิด</v-list-item-title>
                                  <v-list-item-subtitle>{{ formatFullDateThai(form.birthdate) }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ที่อยู่</v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{
                                      form.currentHouseNumber +
                                        " หมู่ " +
                                        form.currentVillageNumber +
                                        " " +
                                        form.currentSubdistrictCode
                                    }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                            </v-list>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>

                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>สังกัด</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.areaName }} ({{ form.areaId }})</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ประเภทบุคลากร</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.personType.title }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ตำแหน่ง</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.positionName.title }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>วิทยฐานะ</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.academicStandingName.title }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                            </v-list>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs>
                  </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <Dialog
              :title="dialogMsg.title"
              :message="dialogMsg.message"
              :type="dialogMsg.type"
              :show="dialogMsg.show"
              @onOk="onOk"
            ></Dialog>

            <v-chip
              class="ma-2"
              color="pink"
              text-color="white"
            >
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
            <template v-slot:[`item.fullname`]="{ item }">
              <div @click="showItem(item)">{{item.fullname}}</div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="showItem(item)"
                  >
                    mdi-cloud-print
                  </v-icon>
                </template>
                <span>รายละเอียด</span>
              </v-tooltip>
            </template>
            <template v-slot:no-data>
              <v-btn
                color="primary"
                @click="initialize"
              >
                Reset
              </v-btn>
            </template>
          </v-data-table>

          <!-- <pre>{{ selected }}</pre> -->
        </v-card>
       </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { areaService } from "@/_services/area.service";
import { teacherService } from "@/_services/teacher.service";
import { standardcodeService } from "@/_services/standardcode.service";
import { schoolService } from "@/_services/school.service";
import moment from "moment";
import XLSX from 'xlsx'
import Dialog from "@/components/Dialog";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import th from "vee-validate/dist/locale/th.json";
import * as rules from "vee-validate/dist/rules";

export default {
  layout: "admin",
  middleware: "authorize-admin",

  components: {
    ValidationObserver,
    ValidationProvider,
    Dialog,
  },

  asyncData({ params }) {
    // called every time before loading the component
    return {
      areaId: params.id
    };
  },

  data() {
    return {
      title: "บุคลากรครูในสังกัด",
      formTitle: "",

      area: [],
      teachers: [],
      teacher: [],

      optionsSchools: [],
      optionsPrefix: [],
      optionsGender: [],
      optionsNationality: [],
      optionsSubdistrict: [],
      optionsProvince: [],
      optionsDistrict: [],
      optionsPersonTypeCode: [],
      optionsPositionCode: [],
      optionsTeachAcademicLevelCode: [],
      optionsTeachSubjectCode: [],
      optionsAcademicStandingCode: [],
      teachLevel:[],
      teachSubject: [],
      academicStanding: [],

      district_id: "",
      province_id: "",
      idCardStatus: null,

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
          value: "_id",
          text: "ที่",
          sortable: true,
        },
        // {
        //   value: "schoolId",
        //   text: "รหัสโรงเรียน",
        //   sortable: true
        // },
        // {
        //   value: "personId",
        //   text: "เลขประจำตัวประชาชน",
        //   sortable: true
        // },
        {
          value: "fullname",
          text: "ชื่อ - สกุล",
          sortable: true
        },
        {
          value: "teachLevel",
          text: "ระดับที่สอน",
          sortable: true
        },
        {
          value: "teachSubject",
          text: "สาระวิชาที่สอน",
          sortable: true
        },
        {
          value: "academicStanding",
          text: "วิทยฐานะ",
          sortable: true
        },
        {
          value: "birthdate",
          text: "วันเกิด",
          sortable: true
        },
        {
          value: "age",
          text: "อายุ",
          sortable: true
        },
        {
          value: "actions",
          text: "ดำเนินการ"
        }
      ],

      form: {
        areaId: "",
        areaName: "",
        schoolId: "",
        schoolName: "",

        fullname: "",
        prefixName: {},

        personId: "",
        prefixCode: "",
        firstName: "",
        middleName: "",
        lastName: "",
        birthdate: "",
        genderCode: "",
        nationalityCode: "",
        currentHouseId: "",
        currentHouseNumber: "",
        currentVillageNumber: "",
        currentTrok: "",
        currentSoi: "",
        currentStreet: "",
        currentSubdistrictCode: "",

        academicYear: "",
        semester: "",
        schoolId: "",
        passportNumber: "",
        passportStartDate: "",
        passportEndDate: "",
        personTypeCode: "",
        positionCode: "",
        academicStandingCode: "",
        teachAcademicLevelCode: "",
        teachSubjectCode: "",
        teacherQualificationCode: "",
        teacherCertificateCode: "",
        licenseNumber: "",
        licenseExpiredDate: "",
        updateDate: "",
        foreignCode: "",
        statusIdcard: "",
        id: "",

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
        teachcademicLevelName: {
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
        show: false,
      },
    };
  },

  async created() {
    console.log("GET TEACHER BY AREA");
    this.getArea();    

    this.getSchools();
    this.getPrefix();
    this.getGender();
    this.getNationality();
    this.getPersonTypeCode();
    this.getPositionCode();
    this.getTeachAcademicLevelCode();
    this.getTeachSubjectCode();
    this.getAcademicStandingCode();
    // this.getProvince();
    // this.getDistrict();
    // this.getSubdistrict();

    this.getTeachers();
  },

  computed: {
    loggedIn() {
      return this.$store.state.authentication.status.loggedIn;
    },
    user() {
      return this.$store.state.authentication.user;
    },
    birthdate () {
      moment.locale('th');
      return this.form.birthdate ? moment(this.form.birthdate).add(543, 'year').format('LLLL') : ''
    },
  },

  methods: {
    async getArea() {
      [this.area] = await areaService.getById(this.areaId);
      this.title = `รายชื่อครูและบุคลากรทางการศึกษาในสังกัด ${this.area.areaName} (${this.area.areaId})`;
    },

    async getTeachers() {
      try {
        this.teachers = await teacherService.getByArea(this.areaId);
        this.totalRows = this.teachers.length;

        var temp = this.teachers;
        var autoNumber = 1;

        for (var x in temp) {
          temp[x]["_id"] = autoNumber;
          autoNumber = autoNumber + 1;

          temp[x]["teachLevel"] = this.teachLevel[temp[x]['teachAcademicLevelCode']];
          temp[x]["teachSubject"] = this.teachSubject[temp[x]['teachSubjectCode']];
          temp[x]["academicStanding"] = this.academicStanding[temp[x]['academicStandingCode']];

          // temp[x]["birthdate"] =  temp[x]["birthdate"].substring(4,6)+"/"+ temp[x]["birthdate"].substring(6,8)+"/"+ temp[x]["birthdate"].substring(0,4);
          temp[x]["age"] = this.calAge(temp[x]["birthdate"])
          temp[x]["birthdate"] = this.formatFullDateThai(temp[x]["birthdate"])
          
          // if (x==3) {
          //   console.log(temp[x])
          // }
        }
        this.teachers = temp;

        // for (var index in this.teachers) {
        //   if (this.teachers[index]["prefixCode"].length !== 3) {
        //     this.teachers[index]["prefixCode"] = String(
        //       this.teachers[index]["prefixCode"]
        //     ).padStart(3, "0");

        //     var formTeacher = {
        //       personId: this.teachers[index]["personId"],
        //       prefixCode: this.teachers[index]["prefixCode"]
        //     };
        //     console.log(formTeacher);

        //     await teacher.Service.update(formTeacher);
        //   }
        // }
      } catch (error) {
        console.log(error);
      }
    },

    // ตรวจสอบสถานะ Validate
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    initialize () {},

    async showItem(item) {
      this.formTitle = `ข้อมูล: ${item.fullname}`;
      this.selectedIndex = this.teachers.indexOf(item);
      this.selectedItem = Object.assign({}, item);      
      //this.selectedItem = JSON.stringify(item, null, 2);
      await teacherService.getById(item.personId).then(response => {
        [this.teacher] = response;  
        
        for (let key in this.form) {
          this.form[key] = this.teacher[key];
        }
      });
      
      this.dialogInfo = true;
      console.log(this.form);
    },
    closeInfo () {
      this.dialogInfo = false
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem)
        this.selectedIndex = -1
      })
    },

    onOk(value) {
      this.dialogMsg = {
        title: "",
        message: "",
        type: "primary",
        show: false,
      };
    },

    handleExport() {
      let temp = this.teachers;
      for (var index in this.teachers) {
        delete temp[index]['areaCode']
        delete temp[index]['areaName']
        delete temp[index]['teachAcademicLevelCode']
        delete temp[index]['teachSubjectCode']        
        delete temp[index]['academicStandingCode']
      }
      // Object.keys(myjsonobj).forEach(function(key){
      //   if(myjsonobj[key]==value)
      //     delete myjsonobj[key];
      // });
      const dataWS = XLSX.utils.json_to_sheet(temp)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb, 'ข้อมูลครู '+ this.areaId +'.xlsx')
    },
    
    //คำนวณวันที่แสดงใน Modals จากรูปแบบ 19900918 (YYYYMMDD)
    formatDateThai(datehbd) {
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
        // datehbdRe + " (ปัจจุบันอายุ " + years + " ปี " + months + " เดือน)"
        datehbdRe
      );
    },
    formatFullDateThai(dateValue) {
      moment.locale('th');
      return dateValue ? moment(dateValue).add(543, 'year').format('LL') : ''
    },

    //คำนวณอายุแสดงใน Modals จากรูปแบบ 19900918 (YYYYMMDD)
    calAge(datehbd) {
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
        // datehbdRe + " (ปัจจุบันอายุ " + years + " ปี " + months + " เดือน)"
        years + " ปี " + months + " เดือน"
      );
    },

    //ดึงโรงเรียน
    getSchools() {
      schoolService.getByArea(this.areaId).then(response => {
        this.optionsSchools = response;
      });
    },

    //ดึงคำนำหน้า
    getPrefix() {
      standardcodeService.getPrefix().then(response => {
        this.optionsPrefix = response;
      });
    },

    //ดึงเพศ
    getGender() {
      standardcodeService.getGender().then(response => {
        this.optionsGender = response;
      });
    },

    //ดึงสัญชาติ
    getNationality() {
      standardcodeService.getNationality().then(response => {
        this.optionsNationality = response;
      });
    },

    //ดึงข้อมูลประเภทบุคลากร
    getPersonTypeCode() {
      standardcodeService.getPersonTypeCode().then(response => {
        this.optionsPersonTypeCode = response;
      });
    },

    //ดึงข้อมูลตำแหน่งบุคลากร
    getPositionCode() {
      standardcodeService.getPositionCode().then(response => {
        this.optionsPositionCode = response;
      });
    },

    //ดึงข้อมูลระดับที่สอน
    getTeachAcademicLevelCode() {
      standardcodeService.getTeachAcademicLevelCode().then(response => {
        this.optionsTeachAcademicLevelCode = response;
        
        for (var index in response) {      
          this.teachLevel[response[index]["id"]] =  response[index]["title"];
        }
      });
    },

    //ดึงข้อมูลกลุ่มสาระฯ
    getTeachSubjectCode() {
      standardcodeService.getTeachSubjectCode().then(response => {
        this.optionsTeachSubjectCode = response;

        for (var index in response) {      
          this.teachSubject[response[index]["id"]] =  response[index]["title"];
        }
      });
    },

    //ดึงข้อมูลวิทยฐานะ
    getAcademicStandingCode() {
      standardcodeService.getAcademicStandingCode().then(response => {
        this.optionsAcademicStandingCode = response;

        for (var index in response) {      
          this.academicStanding[response[index]["id"]] =  response[index]["title"];
        }
      });
    },

    //ดึงข้อมูลอำเภอ
    getDistrict() {
      standardcodeService.getDistrict(this.province_id).then(response => {
        this.optionsDistrict = response;
      });
    },

    //ดึงข้อมูลตำบล
    getSubdistrict() {
      standardcodeService.getSubdistrict(this.district_id).then(response => {
        this.optionsSubdistrict = response;
      });
    },

    //ดึงข้อมูลจังหวัด
    getProvince() {
      standardcodeService.getProvince().then(response => {
        this.optionsProvince = response;
      });
    },
  },

  computed: {
    rows() {
      return this.teachers.length;
    }
  }
};
</script>

<style>
.styleId {
  max-width: 50px;
}
.styleFirstName {
  max-width: 100px;
}
</style>
