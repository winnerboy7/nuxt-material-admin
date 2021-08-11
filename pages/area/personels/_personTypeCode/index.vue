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
            <v-btn text icon @click="addTeacher(areaCode)">เพิ่ม</v-btn>

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
                  <v-card class="mt-3">
                    <v-toolbar flat color="info" dark dense>
                      <v-toolbar-title
                        ><v-icon>mdi-tag</v-icon>
                        ข้อมูลบุคลากรในสังกัด</v-toolbar-title
                      >
                    </v-toolbar>
                    <v-tabs vertical>
                      <v-tab>
                        <v-icon left>
                          mdi-format-list-bulleted-type
                        </v-icon>
                        ข้อมูลส่วนตัว
                      </v-tab>
                      <v-tab>
                        <v-icon left>
                          mdi-map-marker
                        </v-icon>
                        ข้อมูลการทำงาน
                      </v-tab>

                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-list dense>
                              <dl class="row">
                                <dt class="col-sm-4">ชื่อ-สกุล :</dt>
                                <dd class="col-sm-8">
                                  {{ form.fullname }}
                                </dd>

                                <dt class="col-sm-4">หมายเลขบัตรประชาชน :</dt>
                                <dd class="col-sm-8">
                                  {{ form.personId }}
                                </dd>

                                <dt class="col-sm-4">วันเกิด :</dt>
                                <dd class="col-sm-8">
                                  {{ fotmatDateThai(form.birthdate) }}
                                </dd>

                                <dt class="col-sm-4">ที่อยู่ :</dt>
                                <dd class="col-sm-8">
                                  {{
                                    form.currentHouseNumber +
                                      " หมู่ " +
                                      form.currentVillageNumber +
                                      " " +
                                      form.currentSubdistrictCode
                                  }}
                                </dd>
                              </dl>

                              <!-- <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ชื่อ-สกุล</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.fullname}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>หมายเลขบัตรประชาชน</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.personId}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>วันเกิด</v-list-item-title>
                                  <v-list-item-subtitle> {{ fotmatDateThai(form.birthdate) }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ที่อยู่</v-list-item-title>
                                  <v-list-item-subtitle>
                                    เลขที่ {{ currentHouseNumber }} หมู่ {{ currentVillageNumber }} ตำบล{{ form.currentSubdistrictCode }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item> -->
                            </v-list>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>

                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-list dense>
                              <dl class="row">
                                <dt class="col-sm-4">สังกัด :</dt>
                                <dd class="col-sm-8">
                                  {{ areaName }} ({{ areaCode }})
                                </dd>

                                <dt class="col-sm-4">ประเภทบุคลากร :</dt>
                                <dd class="col-sm-8">
                                  {{ form.personTypeName }}
                                </dd>

                                <dt class="col-sm-4">ตำแหน่ง :</dt>
                                <dd class="col-sm-8">
                                  {{ form.positionName }}
                                </dd>

                                <dt class="col-sm-4">วิทยฐานะ :</dt>
                                <dd class="col-sm-8">
                                  {{ form.academicStandingName }}
                                </dd>
                              </dl>

                              <!-- <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>สังกัด</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.areaName }} ({{ form.areaCode }})</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ประเภทบุคลากร</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.personTypeName }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ตำแหน่ง</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.positionName }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>วิทยฐานะ</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.academicStandingName }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item> -->
                            </v-list>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs>
                  </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions> </v-card-actions>
              </v-card>
            </v-dialog>
            <Dialog
              :title="dialogMsg.title"
              :message="dialogMsg.message"
              :type="dialogMsg.type"
              :show="dialogMsg.show"
              @onOk="onOk"
            ></Dialog>

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
            :loading="isLoading"
            loading-text="กำลังโหลดข้อมูล กรุณารอสักครู่"
            show-select           
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>
                  <!-- {{ title }} -->

                  <v-autocomplete
                    v-model="personTypeCode"
                    :items="optionsPersonTypeCode"
                    v-on:change="getTeacherByArea"
                    item-value="id"
                    item-text="title"
                    label="ประเภทบุคลากร"
                    data-vv-name="select-person-type"
                    disabled
                    dense
                  ></v-autocomplete>
                </v-toolbar-title>
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
              ไม่มีข้อมูล
              <!-- <v-btn color="primary" @click="initialize">
                Reset
              </v-btn> -->
            </template>
          </v-data-table>

          <!-- <pre>{{ selected }}</pre> -->
          <!-- <pre> {{ teachers }} </pre> -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { standardcodeService } from "@/_services/standardcode.service";
import { manpowerService } from "@/_services/manpower.service";
import { teacherService } from "@/_services/teacher.service";

import moment from "moment";
import Dialog from "@/components/Dialog";

export default {
  layout: "area",
  middleware: "authorize-area",
  name: "ListRegistration",
  components: {
    Dialog
  },

  asyncData({ params }) {
    // called every time before loading the component
    return {
      personTypeCode: params.personTypeCode
    };
  },

  data() {
    return {
      title: `ทะเบียนประวัติบุคลากรในสังกัด ${this.$store.state.account.user.areaName} (${this.$store.state.account.user.areaCode})`,
      formTitle: "",
      teachers: [],
      areaName: this.$store.state.account.user.areaName,
      areaCode: this.$store.state.account.user.areaCode,

      dialog: false,
      dialogInfo: false,
      dialogDelete: false,
      isLoading: true,

      // personTypeCode: "",

      optionsPrefix: [],
      optionsPersonTypeCode: [],
      optionsPositionCode: [],
      optionsAcademicStandingCode: [],
      optionsCurrentOrderLevel: [],

      item: "",
      selected: [],
      search: "",
      items_per_page: [10, 20, 50, 100, -1],

      selectedIndex: -1,
      selectedItem: [],

      fields: [
        // {
        //   value: "_id",
        //   text: "รหัส",
        //   sortable: true
        // },
        {
          value: "positionNumber",
          text: "เลขที่ตำแหน่ง",
          sortable: true
        },
        {
          value: "cgdNumber",
          text: "เลขที่จ่ายตรง",
          sortable: true
        },
        {
          value: "schName",
          text: "โรงเรียน",
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
          value: "personTypeName",
          text: "ประเภท",
          sortable: true
        },
        {
          value: "positionName",
          text: "ตำแหน่ง",
          sortable: true
        },
        // {
        //   value: "academicStandingName",
        //   text: "วิทยฐานะ"
        // },
        // {
        //   value: "orderLevelName",
        //   text: "ระดับ/อันดับ"
        // },
        { value: "actions", text: "ตัวเลือก" }
      ],
      yyyy: "",
      dd: "",
      mm: "",

      form: {
        areaCode: "",
        areaName: "",
        schId: "",
        schName: "",
        positionNumber: "",
        cgdNumber: "",
        fullname: "",
        firstName: "",
        lastName: "",
        personId: "",
        birthdate: "",
        currentHouseNumber: "",
        currentVillageNumber: "",
        currentSubdistrictCode: ""
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
      }
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

  async created() {    
  },

  mounted() {
    this.getPrefix();
    this.getPersonTypeCode();
    this.getPositionCode();
    this.getAcademicStandingCode();
    this.getOrderLevel();
    this.getTeacherByArea();
  },

  methods: {
    async getTeacherByArea() {
      try {
        console.log(`PERSONEL AREA: ${this.$store.state.account.user.areaName} : ${this.personTypeCode}`);

        if (this.personTypeCode) {
          this.teachers = await manpowerService.getByAreaPerson(this.areaCode, this.personTypeCode);
        }
        else {
          this.teachers = await manpowerService.getByArea(this.areaCode);
        }

        this.isLoading = false;
        
        this.totalRows = this.teachers.length;
        this.teachers = this.teachers.map(obj => {
          obj.prefixTitle = this.optionsPrefix.filter(item => {
            return item.id.match(obj.prefixCode);
          });
          obj.personTypeName = this.optionsPersonTypeCode.filter(item => {
            return item.id.match(obj.personTypeCode);
          });
          obj.positionName = this.optionsPositionCode.filter(item => {
            return item.id.match(obj.positionCode);
          });
          obj.academicStandingName = this.optionsAcademicStandingCode.filter(
            item => {
              return item.id.match(obj.academicStandingCode);
            }
          );
          obj.orderLevelName = this.optionsCurrentOrderLevel.filter(item => {
            return item.id.match(obj.optionsCurrentOrderLevel);
          });

          obj.prefixTitle = obj.prefixTitle.length
            ? obj.prefixTitle[0].title
            : "";
          obj.personTypeName = obj.personTypeName.length
            ? obj.personTypeName[0].title
            : "";
          obj.positionName = obj.positionName.length
            ? obj.positionName[0].title
            : "";
          obj.academicStandingName = obj.academicStandingName.length
            ? obj.academicStandingName[0].title
            : "";
          obj.orderLevelName = obj.orderLevelName.length
            ? obj.orderLevelName[0].title
            : "";

          return obj;
        });
        // console.log(this.teachers)
      } catch (error) {
        console.log(error);
      }
    },

    initialize() {},

    showItem(item) {
      this.formTitle = `รายชื่อบุคลากรในสังกัด ${this.$store.state.account.user.areaName}`;
      this.selectedIndex = this.teachers.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      //this.selectedItem = JSON.stringify(item, null, 2);
      for (let key in this.form) {
        this.form[key] = item[key];
      }

      this.dialogInfo = true;
    },

    deleteItem(item) {
      this.formTitle = `ยืนยันการลบข้อมูลตำแหน่ง: ${item.positionNumber} นี้หรือไม่?`;
      this.selectedIndex = this.teachers.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      this.dialogDelete = true;

      this.deleteConfirm = "";
      this.action = "delete";
    },

    deleteItemConfirm() {
      this.teachers.splice(this.selectedIndex, 1);      
      teacherService.delete(this.selectedItem._id);
      console.log("Delete : " + this.selectedItem.fullname);

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

    //ส่งลิ้งค์ไปหน้าเพิ่มข้อมูลบุคลากร
    addTeacher() {
      this.$router.replace(`/area/manpower/${this.personTypeCode}/add`);
    },

    //ลิ้งค์ไปหน้าแก้ไขข้อมูล
    editTeacher(teacher) {
      if(teacher.personId) {
        this.$router.replace(`/area/personels/${this.personTypeCode}/${teacher.personId}`);
      }
      else {
        this.dialogMsg = {
          title: `ไม่ปรากฏเลขบัตรประชาชน !`,
          message: `กรุุณาแก้ไขในระบบอัตรากำลังก่อนครับ`,
          type: "error",
          show: true,
        };
      }
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
    },

    //ดึงคำนำหน้า
    getPrefix() {
      standardcodeService.getPrefix().then(response => {
        this.optionsPrefix = response;
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

    //ดึงข้อมูลวิทยฐานะ
    getAcademicStandingCode() {
      standardcodeService.getAcademicStandingCode().then(response => {
        this.optionsAcademicStandingCode = response;
      });
    },

    //ดึงข้อมูลอันดับหรือระดับ
    getOrderLevel() {
      standardcodeService.getOrderLevel().then(response => {
        this.optionsCurrentOrderLevel = response;
        this.optionsOriOrderLevel = response;
      });
    }
  },

  watch: {
    actionConfirm: function() {
      this.getTeacherByArea();
    }
  }
};
</script>

<style scoped>
</style>
