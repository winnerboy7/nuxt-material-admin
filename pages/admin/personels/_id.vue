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
                                  <v-list-item-subtitle>{{ area.areaName }} ({{ area.areaId }})</v-list-item-subtitle>
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
              {{ personels.length }}
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>
          
          <v-data-table
            v-model="selected"
            :headers="fields"
            :items="personels"
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
import { personelService } from "@/_services/personel.service";
import axios from "axios";
import { equal } from "assert";
import XLSX from 'xlsx'
import moment from "moment";
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

  name: "ListSchools",

  asyncData({ params }) {
    // called every time before loading the component
    return {
      areaId: params.id
    };
  },

  data() {
    return {
      title: `รายชื่อบุคลากรในสังกัด `,
      formTitle: "",

      area: [],
      personels: [],
      personel: [],

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
          value: "id",
          text: "ที่",
          sortable: true
        },
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
          value: "positionName.title",
          text: "ตำแหน่ง",
          sortable: true
        },
        {
          value: "personType.title",
          text: "ประเภท",
          sortable: true
        },
        
        { value: "actions", text: "ตัวเลือก" }
      ],

      form: {
        areaId: "",
        areaName: "",
        areaCode: "",
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
        areaCode: "",
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

      yyyy: "",
      dd: "",
      mm: "",

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

  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    rows() {
      return this.personels.length;
    },
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    },
  },

  created() {
    console.log("AREA PERSONEL");
    this.getArea();
    this.getPersonelByArea();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  mounted() {
    // this.title = `รายชื่อบุคลากรในสังกัด ... ${this.areaName}`
  },

  methods: {
    async getArea() {
      [this.area] = await areaService.getById(this.areaId);
      this.title = `รายชื่อบุคลากรในสังกัด ${this.area.areaName} (${this.area.areaId})`
    },
    getSelectedArea: function () {
      //console.log(this.selected);
    },

    async getPersonelByArea() {
      try {
        this.personels = await personelService.getByArea(this.areaId);
        this.totalRows = this.personels.length;
        
        // console.log(this.personels);
        
        var temp = this.personels;
        var autoNumber = 1;
        for (var x in temp) {
            temp[x]["id"] = autoNumber;
            autoNumber = autoNumber + 1;
        }
        this.personels = temp;
         
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
      this.selectedIndex = this.personels.indexOf(item);
      this.selectedItem = Object.assign({}, item);      
      //this.selectedItem = JSON.stringify(item, null, 2);
      await personelService.getById(item.personId).then(response => {
        [this.personel] = response;  
        
        for (let key in this.form) {
          this.form[key] = this.personel[key];
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
      let temp = this.personels;
      for (var index in this.personels) {
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

    // //ส่งลิ้งค์ไปหน้าเพิ่มข้อมูลครู
    // addPersonel() {
    //   this.$router.push("/area/personels/add");
    // },

    // //ลิ้งค์ไปหน้าแก้ไขข้อมูล
    // editPersonel(personel) {
    //   this.$router.push("/area/personels/" + personel.personId);
    // },

    //ลบข้อมูลครูเป็นรายคน
    // showDelConfirm(personel) {
    //   this.deleteConfirm = "";
    //   this.$bvModal
    //     .msgBoxConfirm('คุณยืนยันที่จะลบ "' + personel.fullname + '" หรือไม่ ?', {
    //       title: "ยืนยันการลบ",
    //       size: "md",
    //       buttonSize: "md",
    //       okVariant: "danger",
    //       okTitle: "ยืนยัน",
    //       cancelTitle: "ไม่ใช่",
    //       footerClass: "p-2",
    //       hideHeaderClose: false,
    //       centered: true
    //     })
    //     .then(value => {
    //       this.deleteConfirm = value;
    //       this.deletePersonId = personel.personId;
    //       if (value) {
    //         //this.deleteArea(school.schId);
    //         console.log("Delete personel : " + personel.personId);
    //         personelService.delete(personel.personId);
    //       }
          
    //       this.action = "DELETE";
    //       let d = new Date().getTime();
    //       this.actionConfirm = this.action + d;
    //     })
    //     .catch(err => {
    //       // An error occurred
    //     });
    // },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    }
  },

  watch: {
    actionConfirm: function() {
      this.getPersonelByArea();
    },
  },

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
.text-detail-personel p {
  margin-bottom: 0px;
}
.btn-addPer {
  margin-top: -32px;
}
</style>
