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
                                  <v-list-item-subtitle>{{ selectedItem.areaFoundingdate}}</v-list-item-subtitle>
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
            <template v-slot:[`item.numberOfSchools`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    text
                    @click="gotoSchool(item)"
                    color="primary"
                  >
                    {{ item.numberOfSchools }}
                  </v-btn>
                </template>
                <span>โรงเรียน</span>
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
      title: "ข้อมูลโรงเรียนรายสำนักงานเขตพื้นที่การศึกษา",
      formTitle: "",

      areas: [],      
      dialogInfo: false,      

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
          value: "numberOfSchools",
          text: "จำนวนโรงเรียน",
          sortable: true,
          // tdClass: "styleName"
        },
        // {
        //   value: "actions",
        //   text: "ดำเนินการ"
        // }
      ],
      
      dialogMsg: {
        title: "",
        message: "",
        type: "",
        show: false,
      },
    };
  },

  async created() {
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
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    },
  },

  methods: {
    async getAreas() {
      try {
        this.areas = await areaService.getAll();
        this.totalRows = this.areas.length;

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

    gotoSchool(item) {
      let url = `/admin/schools/${item.areaId}`;
      this.$router.push(url);
    },
    gotoTeacher(item) {
      let url = `/admin/teachers/${item.areaId}`;
      this.$router.push(url);
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
  },

  watch: {
  }
};
</script>

<style>
.styleId {
  max-width: 50px;
}
.styleName {
  max-width: 100px;
}
</style>
