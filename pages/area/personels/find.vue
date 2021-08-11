<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>
        <!-- {{ selectedIndex }} -->

        <v-card class="mb-4 elevation-12">
          <v-toolbar color="primary darken-1" dark flat dense cad>
            <v-toolbar-title class="subheading"><v-icon>mdi-tag</v-icon>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>

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
                  <teacher-view
                    :title="formTitle"
                    :form.sync="form"
                  ></teacher-view>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-dialog>

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
                  <v-btn color="blue darken-1" text @click="closeDelete">ยกเลิก</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">ลบข้อมูล</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-chip
              class="ma-2"
              color="pink"
              text-color="white"
            >
              {{ teachers.length }}
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>
          
          <ValidationObserver ref="observer"  v-slot="{ invalid, validated, handleSubmit }">
            <v-form ref="observer" @keyup.native.enter="handleSubmit(handleSearch)">
              <v-container fluid>
                <v-row>
                  <v-col cols="4">
                    <ValidationProvider
                      name="ค้นหา"
                      v-slot="{ errors }"
                      rules="required"
                    >
                      <v-text-field
                        v-model="filter"
                        append-icon="mdi-magnify"
                        :error-messages="errors"
                        label="ค้นหา"
                        single-line
                        hide-details
                      ></v-text-field>                      
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      color="primary"
                      class="mr-4"
                      @click="handleSubmit(handleSearch)" 
                      :disabled="invalid || !validated"
                    >
                      ค้นหา
                    </v-btn>
                  </v-col>
                  <v-col cols="4">                    
                    <v-text-field
                      v-model="filter"
                      label="คำสืบค้น"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>          
            </v-form>
          </ValidationObserver>
          
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
            v-if="teachers.length"
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
              <div @click="showItem(item)">{{item.personId}}</div>
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
                    @click="editItem(item)"
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

        <Dialog
          :title="dialogMsg.title"
          :message="dialogMsg.message"
          :type="dialogMsg.type"
          :show="dialogMsg.show"
          @onOk="onOk"
        ></Dialog>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { teacherService } from "@/_services/teacher.service";
import TeacherView from '@/forms/teacherView'
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
  name: "EditTeacher",

  components: {
    ValidationObserver,
    ValidationProvider,
    Dialog,
    TeacherView,
  },

  data() {
    return {
      title: `สืบค้นทะเบียนประวัติบุคลากรใน: ${this.$store.state.account.user.areaName} : ${this.$store.state.account.user.areaCode}`,
      areaName: this.$store.state.account.user.areaName,
      areaCode: this.$store.state.account.user.areaCode,
      formTitle: "",
      teachers: [],
      find: false,
      filter: null,

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
          value: "positionName.title",
          text: "ตำแหน่ง",
          sortable: true
        },
        // {
        //   value: "personType.title",
        //   text: "ประเภท",
        //   sortable: true
        // },
        {
          value: "schName",
          text: "โรงเรียน"
        },
        { value: "actions", text: "ตัวเลือก" }
      ],

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

      name: "",
      email: "",
      
    };
  },

  computed: {
    ...mapState({
      account: state => state.account,
    }),

    rows() {
      return this.teachers.length;
    },
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    },
  },

  async created() {
  },

  mounted() {
    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);   
  },

  methods: {
    async handleSearch() {
      console.log(`Search : ${this.filter}`)
      this.teachers = await teacherService.getTeachers(this.account.user.areaCode , this.filter);
      this.find = true;
    },

    initialize () {},

    showItem(item) {
      this.formTitle = `ข้อมูล ${item.fullname}`;
      this.selectedIndex = this.teachers.indexOf(item);
      this.selectedItem = Object.assign({}, item);      
      //this.selectedItem = JSON.stringify(item, null, 2);
      for (let key in this.form) {
        this.form[key] = item[key];
      }

      this.dialogInfo = true;
    },
    
    
    //ลิ้งค์ไปหน้าแก้ไขข้อมูล
    editItem(teacher) {
      // this.$router.push(`/area/teachers/${teacher.schoolId}/${teacher.personId}`);
      this.$router.push(`/area/personels/${teacher.personTypeCode}/${teacher.personId}`);
    },

    //ลบข้อมูลครูเป็นรายคน
    deleteItem(item) {
      this.formTitle = `ยืนยันการลบข้อมูล: ${item.fullname} หรือไม่?`;
      this.selectedIndex = this.teachers.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialogDelete = true

      this.deleteConfirm = "";
      this.action = "delete";
    },

    deleteItemConfirm () {
      this.teachers.splice(this.selectedIndex, 1)

      console.log("Delete : " + this.selectedItem.fullname);
      teacherService.delete(this.selectedItem.personId);

      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "";

      this.closeDelete()
    },

    //ส่งลิ้งค์ไปหน้าเพิ่มข้อมูลครู
    addTeacher() {
      this.$router.push("/area/teachers/add");
    },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    },

    closeInfo () {
      this.dialogInfo = false
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem)
        this.selectedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
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
  },
};
</script>

<style scoped>
.v-tab {
  justify-content: left;
}
</style>
