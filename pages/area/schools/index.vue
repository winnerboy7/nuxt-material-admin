<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>
        <!-- {{ selectedIndex }} -->

        <v-card class="mb-4">
          <v-toolbar color="primary darken-1" dark flat dense cad>
            <v-toolbar-title class="subheading"><v-icon>mdi-tag</v-icon>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn text icon v-bind="attrs" v-on="on" @click="addItem(item)">เพิ่ม</v-btn>
              </template>
              <v-card>
                <ValidationObserver ref="observer"  v-slot="{ handleSubmit }">
                  <v-form ref="form" @keyup.native.enter="handleSubmit(onSubmit)">
                    <v-toolbar dark color="primary">
                      <v-toolbar-title><v-icon>{{ formIcon }}</v-icon> {{ formTitle }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn icon text @click="handleSubmit(onSubmit)">
                          <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                        <v-btn icon text @click="close">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-card-text>
                      <v-card>
                        <v-toolbar flat color="info" dark dense>
                          <v-toolbar-title><v-icon>mdi-tag</v-icon> รายชื่อโรงเรียนในสังกัด </v-toolbar-title>
                        </v-toolbar>
                        <v-tabs vertical>
                          <v-tab>
                            <v-icon left>
                              mdi-format-list-bulleted-type
                            </v-icon>
                            ข้อมูลพื้นฐาน
                          </v-tab>
                          <v-tab>
                            <v-icon left>
                              mdi-map-marker
                            </v-icon>
                            ข้อมูลทั่วไป
                          </v-tab>

                          <v-tab-item>
                            <v-card flat>
                              <v-card-text>

                                <ValidationProvider
                                  name="รหัส MOE CODE"
                                  v-slot="{ errors }"
                                  rules="required|digits:10"
                                >
                                  <v-text-field
                                    v-model="form.schId"
                                    :error-messages="errors"
                                    :readonly="readonly"
                                    label="รหัส MOE CODE"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="รหัส SMIS CODE"
                                  v-slot="{ errors }"
                                  rules="required|digits:8"
                                >
                                  <v-text-field
                                    v-model="form.smis_code"
                                    :error-messages="errors"
                                    label="รหัส SMIS CODE"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="ชื่อโรงเรียน"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="form.schName"
                                    :error-messages="errors"
                                    label="ชื่อโรงเรียน"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="ประเภทสถานศึกษา"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-select
                                    v-model="form.school_type"
                                    :items="optionsSchoolType"
                                    item-value="id"
                                    item-text="title"
                                    :error-messages="errors"
                                    label="ประเภทสถานศึกษา"
                                    data-vv-name="select-school-type"
                                    required
                                  ></v-select>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="ประเภทสถานศึกษาพิเศษ"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-select
                                    v-model="form.school_type_special"
                                    :items="optionsSchoolSpecial"
                                    item-value="id"
                                    item-text="title"
                                    :error-messages="errors"
                                    label="ประเภทสถานศึกษาพิเศษ"
                                    data-vv-name="select-school-special"
                                    required
                                  ></v-select>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="ที่ตั้งสถานศึกษา"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-select
                                    v-model="form.school_position"
                                    :items="optionsSchoolPosition"
                                    item-value="id"
                                    item-text="title"
                                    :error-messages="errors"
                                    label="ที่ตั้งสถานศึกษา"
                                    data-vv-name="select-school-position"
                                    required
                                  ></v-select>
                                </ValidationProvider>
                                
                                <ValidationProvider
                                  name="สังกัด"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <!-- <v-select
                                    v-model="form.areaCode"
                                    v-on:change="getSelectedArea"
                                    :items="optionsAreas"
                                    item-value="areaId"
                                    item-text="areaName"
                                    :error-messages="errors"
                                    :disabled="disabled"
                                    label="สังกัด"
                                    data-vv-name="select-area"
                                    required
                                  ></v-select> -->
                                  <v-autocomplete
                                    v-model="form.areaCode"
                                    v-on:change="getSelectedArea"
                                    :items="optionsAreas"
                                    item-value="areaId"
                                    item-text="areaName"
                                    filled
                                    :error-messages="errors"
                                    readonly
                                    label="สังกัด"
                                    data-vv-name="select-area"
                                    required
                                  ></v-autocomplete>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="จำนวนห้อง"
                                  v-slot="{ errors }"
                                  rules="required|numeric"
                                >
                                  <v-text-field
                                    v-model="form.sumRoom"
                                    :error-messages="errors"
                                    label="จำนวนห้อง"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="จำนวนนักเรียน"
                                  v-slot="{ errors }"
                                  rules="required|numeric"
                                >
                                  <v-text-field
                                    v-model="form.sumStudents"
                                    :error-messages="errors"
                                    label="จำนวนนักเรียน"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                              </v-card-text>
                            </v-card>
                          </v-tab-item>
                          <v-tab-item>
                            <v-card flat>
                              <v-card-text>
                                <ValidationProvider
                                  name="ตำบล"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="form.subdistrict"
                                    :error-messages="errors"
                                    label="ตำบล"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="อำเภอ"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="form.district"
                                    :error-messages="errors"
                                    label="อำเภอ"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="จังหวัด"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="form.province"
                                    :error-messages="errors"
                                    label="จังหวัด"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="ละติจูด"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="form.latitude"
                                    :error-messages="errors"
                                    label="ละติจูด"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="ลองติจูด"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="form.longitude"
                                    :error-messages="errors"
                                    label="ลองติจูด"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>
                                
                              </v-card-text>
                            </v-card>
                          </v-tab-item>
                        </v-tabs>
                      </v-card>                    
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        class="mr-4"
                        @click="handleSubmit(onSubmit)"
                      >บันทึก</v-btn>
                      <v-btn
                        color="warning"
                        text
                        @click="close"
                      >ยกเลิก</v-btn>
                    </v-card-actions>
                  </v-form>
                </ValidationObserver>
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
                      <v-toolbar-title><v-icon>mdi-tag</v-icon> ข้อมูลโรงเรียนในสังกัด</v-toolbar-title>
                    </v-toolbar>
                    <v-tabs vertical>
                      <v-tab>
                        <v-icon left>
                          mdi-format-list-bulleted-type
                        </v-icon>
                        ข้อมูลพื้นฐาน
                      </v-tab>
                      <v-tab>
                        <v-icon left>
                          mdi-map-marker
                        </v-icon>
                        ข้อมูลทั่วไป
                      </v-tab>

                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>รหัส สพฐ.</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.schId}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>รหัส SMIS</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.smis_code}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ชื่อโรงเรียน</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.schName}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ประเภท</v-list-item-title>
                                  <v-list-item-subtitle> {{ schoolType(form.school_type) }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ประเภทพิเศษ</v-list-item-title>
                                  <v-list-item-subtitle> {{ schoolSpecial(form.school_type_special) }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ตำแหน่งที่ตั้ง</v-list-item-title>
                                  <v-list-item-subtitle> {{ schoolPosition(form.school_position) }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ที่อยู่</v-list-item-title>
                                  <v-list-item-subtitle>
                                    ตำบล{{ form.subdistrict + " อำเภอ" + form.district + " จังหวัด" + form.province }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>พิกัด GPS </v-list-item-title>
                                  <v-list-item-subtitle>{{ form.latitude + ", " + form.longitude }}</v-list-item-subtitle>
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
                                  <v-list-item-title>เปิดระดับการศึกษาชั้นสูงสุด</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.maxClassLevel}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>จำนวนห้อง</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.sumRoom }} ห้อง</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>จำนวนนักเรียน</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.sumStudents.toLocaleString() }} คน</v-list-item-subtitle>
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
              {{ schools.length }}
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>
          
          <v-data-table
            v-model="selected"
            :headers="fields"
            :items="schools"
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
            <template v-slot:[`item.schId`]="{ item }">
              <div @click="showItem(item)">{{item.schId}}</div>
            </template>
            <template v-slot:[`item.schName`]="{ item }">
              <div @click="showItem(item)">{{item.schName}}</div>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { areaService } from "@/_services/area.service";
import { schoolService } from "@/_services/school.service";
import { standardcodeService } from "@/_services/standardcode.service";
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
  layout: "area",
  middleware: "authorize-area",

  components: {
    ValidationObserver,
    ValidationProvider,
    Dialog,
  },

  asyncData({ params }) {
    // called every time before loading the component
    return {
      id: params.id
    };
  },
  //async asyncData({ $axios }) {},

  data() {
    return {
      title: "ข้อมูลโรงเรียนในสำนักงานเขตพื้นที่การศึกษา",
      formTitle: "",

      schools: [],
      optionsAreas: [],
      optionsSchoolType: [],
      optionsSchoolSpecial: [],
      optionsSchoolPosition: [],
      disabled: true,

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
          sortable: true,
        },
        {
          value: "schId",
          text: "รหัส",
          sortable: true
        },
        {
          value: "schName",
          text: "ชื่อโรงเรียน",
          sortable: true,
          // tdClass: "styleName"
        },
        {
          value: "actions",
          text: "ดำเนินการ"
        }
      ],

      form: {
        schId: "",
        smis_code: "",
        schName: "",
        typeSch: "",
        region: "",
        areaCode: "",
        areaName: "",
        subdistrict: "",
        district: "",
        province: "",
        maxClassLevel: "",
        sumRoom: "",
        sumStudents: "",
        latitude: "",
        longitude: "",
        // quality_tambon :false,
        // partnership_school: false,
        // royal_school: "",
        // extend_school: false,
        // sub_school: false,
        school_type: "",
        school_position: "",
        school_type_special: "",
      },

      defaultItem: {
        schId: "",
        smis_code: "",
        schName: "",
        typeSch: "",
        region: "",
        areaCode: "",
        areaName: "",
        subdistrict: "",
        district: "",
        province: "",
        maxClassLevel: "",
        sumRoom: "",
        sumStudents: "",
        latitude: "",
        longitude: "",
        // quality_tambon :false,
        // partnership_school: false,
        // royal_school: "",
        // extend_school: false,
        // sub_school: false,
        school_type: "",
        school_position: "",
        school_type_special: "",
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
    console.log("SCHOOLS");
    this.getSchools();
    this.getAreas();
    this.getSchoolType();
    this.getSchoolSpecial();
    this.getSchoolPosition();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  computed: {
    rows() {
      return this.schools.length;
    },
    readonly() {
      return this.state === "readonly";
    },
    // disabled() {
    //   return this.state === "disabled";
    // }
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    },
  },

  methods: {
    async getSchools() {
      try {
        // 1000101723
        console.log(
          `Area : ${this.$store.state.account.user.areaName} (${this.$store.state.account.user.areaCode})`
        );
        this.title = `ข้อมูลโรงเรียนใน ${this.$store.state.account.user.areaName} (${this.$store.state.account.user.areaCode})`;
        this.schools = await schoolService.getByArea(
          this.$store.state.account.user.areaCode
        );
        this.totalRows = this.schools.length;

        var temp = this.schools;
        var autoNumber = 1;
        for (var x in temp) {
          temp[x]["id"] = autoNumber;
          autoNumber = autoNumber + 1;
        }
        this.schools = temp;
      } catch (error) {
        console.log(error);
      }
    },

    async getAreas() {
      await areaService.getAll().then(response => {
        this.optionsAreas = response;
      });
    },

    //ดึงข้อมูลประเภทสถานศึกษา
    getSchoolType() {
      standardcodeService.getSchoolType().then(response => {
        this.optionsSchoolType = response;
      });
    },

    //ดึงข้อมูลประเภทสถานศึกษาพิเศษ
    getSchoolSpecial() {
      standardcodeService.getSchoolSpecial().then(response => {
        this.optionsSchoolSpecial = response;
      });
    },

    //ดึงข้อมูลที่ตั้งสถานศึกษา
    getSchoolPosition() {
      standardcodeService.getSchoolPosition().then(response => {
        this.optionsSchoolPosition = response;
      });
    },

    getSelectedArea: function () {
      //console.log(this.selected);
    },

    // ตรวจสอบสถานะ Validate
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    initialize () {},

    showItem(item) {
      this.formTitle = `ข้อมูล: ${item.schName} : (${item.schId})`;
      this.selectedIndex = this.schools.indexOf(item);
      this.selectedItem = Object.assign({}, item);      
      //this.selectedItem = JSON.stringify(item, null, 2);
      for (let key in this.form) {
        this.form[key] = item[key];
      }

      this.dialogInfo = true;
    },

    addItem(item) {
      this.formTitle = `บันทึกข้อมูล`;
      // this.selectedIndex = -1;
      // this.dialog = true;

      this.form = Object.assign({}, this.defaultItem);

      // for (let key in this.form) {
      //   this.form[key] = "";
      // }
      this.form.areaCode = this.$store.state.account.user.areaCode;
      this.state = "";
      this.action = "add";
    },

    editItem(item) {
      this.formTitle = `แก้ไขข้อมูล: ${item.schName} : (${item.schId})`;
      this.selectedIndex = this.schools.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      this.form = Object.assign({}, item);
      this.dialog = true;
      this.state = "readonly";
      this.action = "update";
    },

    onSubmit() {      
      if (this.selectedIndex > -1) {
        Object.assign(this.schools[this.selectedIndex], this.form);
      } else {
        this.schools.push(this.form);
      }

      console.log(this.form)

      if (this.action === "update") {
        console.log("Updated");

        schoolService.update(this.form).then(
          (response) => {
            this.dialogMsg = {
              title: "เยี่ยมมาก",
              message: "แก้ไขข้อมูลสำเร็จ",
              type: "primary",
              show: true,
            };
            // swal("เยี่ยมมาก", "แก้ไขข้อมูลสำเร็จ", "success");
          },
          (error) => {
            console.log(error);
            this.dialogMsg = {
              title: "แจ้งเตือน !",
              message: "เกิดข้อผิดพลาด : " + error,
              type: "error",
              show: true,
            };

            // swal("เกิดข้อผิดพลาด!", "", "error");
          }
        );
      } else if (this.action === "add") {
        console.log("Insert");       
        
        schoolService.insert(this.form).then(
          (response) => {
            this.dialogMsg = {
              title: "เยี่ยมมาก",
              message: "บันทึกข้อมูลสำเร็จ",
              type: "primary",
              show: true,
            };

            // swal("เยี่ยมมาก", "บันทึกข้อมูลสำเร็จ", "success");
          },
          (error) => {
            console.log(error);
            this.dialogMsg = {
              title: "แจ้งเตือน !",
              message: "เกิดข้อผิดพลาด : " + error,
              type: "error",
              show: true,
            };

            // swal("เกิดข้อผิดพลาด!", "", "error");
          }
        );
      }

      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "";
      
      this.close();
    },

    // deleteItem(item) {
    //   const index = this.schools.indexOf(item);
    //   confirm("คุณยืนยันที่จะลบข้อมูลหรือไม่?") && this.schools.splice(index, 1);
    // },

    deleteItem (item) {
      this.formTitle = `ยืนยันการลบข้อมูล: ${item.schName} หรือไม่?`;
      this.selectedIndex = this.schools.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialogDelete = true

      this.deleteConfirm = "";
      this.action = "delete";
    },

    deleteItemConfirm () {
      this.schools.splice(this.selectedIndex, 1)

      console.log("Delete : " + this.selectedItem.schName);
      schoolService.delete(this.selectedItem.schId);

      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "";

      this.closeDelete()
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem);
        this.selectedIndex = -1;
      });
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

    // save() {
    //   if (this.selectedIndex > -1) {
    //     Object.assign(this.schools[this.selectedIndex], this.selectedItem);
    //   } else {
    //     this.schools.push(this.form);
    //   }
    //   this.close();
    // },

    onOk(value) {
      this.dialogMsg = {
        title: "",
        message: "",
        type: "primary",
        show: false,
      };
    },
    schoolType(value) {
      if (value) {        
        return this.optionsSchoolType.filter(item => { return item.id.match(value) })[0].title
      }
    },
    schoolSpecial(value) {
      if (value) {        
        return this.optionsSchoolSpecial.filter(item => { return item.id.match(value) })[0].title
      }
    },
    schoolPosition(value) {
      if (value) {        
        return this.optionsSchoolPosition.filter(item => { return item.id.match(value) })[0].title
      }
    },
  },
  watch: {
    // actionConfirm: function() {
    //   this.getSchools();
    // }
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogInfo (val) {
      val || this.closeInfo()
    },
  }
};
</script>

<style>
.styleId {
  max-width: 50px;
}
.styleName {
  max-width: 300px;
}
</style>
