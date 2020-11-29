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
                          <v-toolbar-title><v-icon>mdi-tag</v-icon> ข้อมูลสำนักงานเขตพื้นที่การศึกษา</v-toolbar-title>
                        </v-toolbar>
                        <v-tabs vertical>
                          <v-tab>
                            <v-icon left>
                              mdi-format-list-bulleted-type
                            </v-icon>
                            รายละเอียด
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
                                  name="รหัสเขตพื้นที่การศึกษา"
                                  v-slot="{ errors }"
                                  rules="required|digits:10"
                                >
                                  <v-text-field
                                    v-model="form.areaId"
                                    :readonly="readonly"
                                    :error-messages="errors"
                                    label="รหัสเขตพื้นที่การศึกษา"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="ชื่อสำนักงานเขตพื้นที่การศึกษา"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="form.areaName"
                                    :error-messages="errors"
                                    label="ชื่อสำนักงานเขตพื้นที่การศึกษา"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="กระทรวง"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="form.areaEducation"
                                    :error-messages="errors"
                                    label="กระทรวง"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider
                                  name="ชื่อสำนักงาน"
                                  v-slot="{ errors }"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="form.areaObec"
                                    :error-messages="errors"
                                    label="ชื่อสำนักงาน"
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>

                                <v-text-field
                                  v-model="form.areaLocation"
                                  label="ที่ตั้ง"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.areaGroup"
                                  label="เขตตรวจราชการ"
                                  dense
                                ></v-text-field>

                                <v-menu
                                  v-model="menuFoundingdate"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="form.areaFoundingdate"
                                      label="วันที่ก่อตั้ง"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="form.areaFoundingdate"
                                    locale="TH-th"
                                    @input="menuFoundingdate = false"
                                  ></v-date-picker>
                                </v-menu>
                                <!-- <v-text-field
                                  v-model="form.areaFoundingdate"
                                  label="วันที่ก่อตั้ง"
                                ></v-text-field> -->
                                <p>วันที่: <b> {{ areaFoundingdate }}</b></p>

                                <v-text-field
                                  v-model="form.directorName"
                                  label="ผู้อำนวยการสำนักงานเขตพื้นที่ฯ"
                                  dense
                                ></v-text-field>
                              </v-card-text>
                            </v-card>
                          </v-tab-item>
                          <v-tab-item>
                            <v-card flat>
                              <v-card-text>
                                <v-text-field
                                  v-model="form.houseId"
                                  label="เลขที่"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.houseNumber"
                                  label="ที่อยู่"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.street"
                                  label="ถนน"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.subdistrictName"
                                  label="ตำบล"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.districtName"
                                  label="อำเภอ"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.provinceName"
                                  label="จังหวัด"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.postcodeCode"
                                  label="รหัสไปรษณีย์"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.phone1"
                                  label="หมายเลขโทรศัพท์"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.phone2"
                                  label="หมายเลขโทรศัพท์"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.website"
                                  label="เวบไซต์"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.latitude"
                                  label="ละติจูด"
                                  dense
                                ></v-text-field>

                                <v-text-field
                                  v-model="form.longitude"
                                  label="ลองติจูด"
                                  dense
                                ></v-text-field>
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
                      <v-toolbar-title><v-icon>mdi-tag</v-icon> ข้อมูลสำนักงานเขตพื้นที่การศึกษา</v-toolbar-title>
                    </v-toolbar>
                    <v-tabs vertical>
                      <v-tab>
                        <v-icon left>
                          mdi-format-list-bulleted-type
                        </v-icon>
                        รายละเอียด
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
                                  <v-list-item-title>รหัส</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.areaId}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ชื่อสำนักงานเขตพื้นที่การศึกษา</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.areaName}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>กระทรวง</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.areaEducation}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ชื่อสำนักงาน</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.areaObec}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ที่ตั้ง</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.areaLocation}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>เขตตรวจราชการ</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.areaGroup}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>วันที่ก่อตั้ง</v-list-item-title>
                                  <v-list-item-subtitle>{{ formatFullDateThai(selectedItem.areaFoundingdate)}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>เวบไซต์</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.website}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ผู้อำนวยการสำนักงานเขตพื้นที่ฯ</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.directorName}}</v-list-item-subtitle>
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
                                  <v-list-item-title>เลขที่</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.houseId}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ที่อยู่</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.houseNumber}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ถนน</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.street}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ตำบล</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.subdistrictName}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>อำเภอ</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.districtName}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>จังหวัด</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.provinceName}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>รหัสไปรษณีย์</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.postcodeCode}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>หมายเลขโทรศัพท์</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.phone1}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>หมายเลขโทรศัพท์</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.phone2}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>เวบไซต์</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.website}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ละติจูด</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.latitude}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ลองติจูด</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.longitude}}</v-list-item-subtitle>
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
              {{ areas.length }}
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>
          
          <v-data-table
            v-model="selected"
            :headers="fields"
            :items="areas"
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
            <template v-slot:[`item.areaId`]="{ item }">
              <div @click="showItem(item)">{{item.areaId}}</div>
            </template>
            <template v-slot:[`item.areaName`]="{ item }">
              <div @click="showItem(item)">{{item.areaName}}</div>
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
import { Role } from "@/controllers/role";
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

  data() {
    return {
      title: "สำนักงานเขตพื้นที่การศึกษา",
      formTitle: "",

      areas: [],
      
      dialog: false,
      dialogInfo: false,
      dialogDelete: false,
      menuFoundingdate: false,
      // areaFoundingdate: "",

      item: "",
      selected: [],
      search: "",
      items_per_page: [10, 20, 50, 100, -1],

      selectedIndex: -1,
      selectedItem: [],

      form: {
        areaId: "",
        areaName: "",
        provinceName: null,
        areaEducation: "",
        areaObec: "",
        areaLocation: "",
        areaGroup: "",
        areaFoundingdate: "",
        houseId: "",
        houseNumber: "",
        street: "",
        subdistrictName: "",
        districtName: "",
        provinceName: "",
        postcodeCode: "",
        phone1: "",
        phone2: "",
        website: "",
        directorName: "",
        latitude: "",
        longitude: ""
      },
      defaultItem: {
        areaId: "",
        areaName: "",
        provinceName: null,
        areaEducation: "",
        areaObec: "",
        areaLocation: "",
        areaGroup: "",
        areaFoundingdate: "",
        houseId: "",
        houseNumber: "",
        street: "",
        subdistrictName: "",
        districtName: "",
        provinceName: "",
        postcodeCode: "",
        phone1: "",
        phone2: "",
        website: "",
        directorName: "",
        latitude: "",
        longitude: ""
      },

      fields: [
        {
          value: "id",
          text: "ที่",
          align: "start",
          sortable: true,
        },
        {
          value: "areaId",
          text: "รหัส",
          sortable: true
        },
        {
          value: "areaName",
          text: "ชื่อสำนักงานเขตฯ",
          sortable: true,
          // tdClass: "styleName"
        },
        {
          value: "provinceName",
          text: "จังหวัด",
          sortable: true,
          // tdClass: "styleName"
        },
        {
          value: "directorName",
          text: "ชื่อผู้อำนวยการเขตพื้นที่การศึกษา",
          sortable: true,
        },
        {
          value: "actions",
          text: "ดำเนินการ"
        }
      ],

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
    console.log("AREA");
    this.getAreas();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  computed: {
    rows() {
      return this.areas.length;
    },
    readonly() {
      return this.state === "readonly";
    },
    disabled() {
      return this.state === "disabled";
    },
    Role() {
      return Role;
    },
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    },
    areaFoundingdate () {
      moment.locale('th');
      return this.form.areaFoundingdate ? moment(this.form.areaFoundingdate).add(543, 'year').format('LL') : ''
    },
  },

  methods: {
    async getAreas() {
      try {
        this.areas = await areaService.getAll();

        var temp = this.areas;
        var autoNumber = 1;
        for (var x in temp) {
          temp[x]["id"] = autoNumber;
          autoNumber = autoNumber + 1;
        }
        this.areas = temp;
        
      } catch (error) {
        console.log(error);
      }
    },

    // ตรวจสอบสถานะ Validate
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    initialize () {},

    showItem(item) {
      this.formTitle = `ข้อมูล: ${item.areaName}`;
      this.selectedIndex = this.areas.indexOf(item);
      this.selectedItem = Object.assign({}, item);      
      //this.selectedItem = JSON.stringify(item, null, 2);
      this.dialogInfo = true;
    },

    addItem(item) {
      this.formTitle = `บันทึกข้อมูล`;
      // this.selectedIndex = -1;
      // this.dialog = true;

      this.form = Object.assign({}, this.defaultItem);
      this.state = "";
      this.action = "add";
    },

    editItem(item) {
      this.formTitle = `แก้ไขข้อมูล: ${item.areaName}`;
      this.selectedIndex = this.areas.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      this.form = Object.assign({}, item);
      this.dialog = true;

      this.state = "readonly";
      this.action = "update";
    },

    onSubmit() {      
      if (this.selectedIndex > -1) {
        Object.assign(this.areas[this.selectedIndex], this.form);
      } else {
        this.areas.push(this.form);
      }

      if (this.action === "update") {
        console.log("Updated");

        areaService.update(this.form).then(
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
              message: "เกิดข้อผิดพลาด",
              type: "error",
              show: true,
            };

            // swal("เกิดข้อผิดพลาด!", "", "error");
          }
        );
      } else if (this.action === "add") {
        console.log("Insert");       
        
        areaService.insert(this.form).then(
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
              message: "เกิดข้อผิดพลาด",
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
    //   const index = this.areas.indexOf(item);
    //   confirm("คุณยืนยันที่จะลบข้อมูลหรือไม่?") && this.areas.splice(index, 1);
    // },

    deleteItem (item) {
      this.formTitle = `ยืนยันการลบข้อมูล: ${item.areaName} หรือไม่?`;
      this.selectedIndex = this.areas.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialogDelete = true

      this.deleteConfirm = "";
      this.action = "delete";
    },

    deleteItemConfirm () {
      this.areas.splice(this.selectedIndex, 1)

      console.log("Delete : " + this.selectedItem.areaName);
      areaService.delete(this.selectedItem.areaId);

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
    //     Object.assign(this.areas[this.selectedIndex], this.selectedItem);
    //   } else {
    //     this.areas.push(this.form);
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
    
    formatFullDateThai(dateValue) {
      moment.locale('th');
      return dateValue ? moment(dateValue).add(543, 'year').format('LLL') : ''
    },
  },

  watch: {
    // actionConfirm: function() {
    //   this.getSetting();
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
</style>
