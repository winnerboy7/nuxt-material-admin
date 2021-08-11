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
                              <!-- <dl class="row">
                                <dt class="col-sm-4">ชื่อ-สกุล :</dt>
                                <dd class="col-sm-8">
                                  {{ form.fullname }}
                                </dd>

                                <dt class="col-sm-4">หมายเลขบัตรประชาชน :</dt>
                                <dd class="col-sm-8">
                                  {{ form.personId }}
                                </dd>

                                <dt class="col-sm-4">เพศ :</dt>
                                <dd class="col-sm-8">
                                  {{ form.genderName.title }}
                                </dd>

                                <dt class="col-sm-4">สัญชาติ :</dt>
                                <dd class="col-sm-8">
                                  {{ form.nationalityName.title }}
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
                              </dl> -->

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
                                  <v-list-item-title>เพศ</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.genderName.title }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>สัญชาติ</v-list-item-title>
                                  <v-list-item-subtitle> {{ form.nationalityName.title }}</v-list-item-subtitle>
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
                              <!-- <dl class="row">
                                <dt class="col-sm-4">สังกัด :</dt>
                                <dd class="col-sm-8">
                                  {{ form.areaName }} ({{ form.areaCode }})
                                </dd>

                                <dt class="col-sm-4">โรงเรียน :</dt>
                                <dd class="col-sm-8">
                                  {{ form.schName }} ({{ form.schId }})
                                </dd>

                                <dt class="col-sm-4">ประเภทบุคลากร :</dt>
                                <dd class="col-sm-8">
                                  {{ form.personType.title }}
                                </dd>

                                <dt class="col-sm-4">ตำแหน่ง :</dt>
                                <dd class="col-sm-8">
                                  {{ form.positionName.title }}
                                </dd>

                                <dt class="col-sm-4">วิทยฐานะ :</dt>
                                <dd class="col-sm-8">
                                  {{ form.academicStandingName.title }}
                                </dd>

                                <dt class="col-sm-4">กลุ่มสาระการเรียนรู้ :</dt>
                                <dd class="col-sm-8">
                                  {{ form.teachSubjectName.title }}
                                </dd>
                              </dl> -->

                              <!-- <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>สังกัด</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.areaName }} ({{ form.areaCode }})</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>โรงเรียน</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.schName }} ({{ form.schId }})</v-list-item-subtitle>
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

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>กลุ่มสาระการเรียนรู้</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.teachSubjectName.title }}</v-list-item-subtitle>
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

            <v-chip class="ma-2" color="pink" text-color="white">
              {{ items.length }}
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>
          
          <upload-files @load-items="handleLoadItems"></upload-files>
          
          <person-data-table :items="items" :infoSelected="infoSelected" v-if="items.length"></person-data-table>

          <!-- <pre>{{ selected }}</pre> -->
          <pre>{{ items }}</pre>
        </v-card>

        <Dialog
          :title="dialogMsg.title"
          :message="dialogMsg.message"
          :type="dialogMsg.type"
          :show="dialogMsg.show"
          @onOk="onOk"
        ></Dialog>

        <!-- Main content -->
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import PersonDataTable from "~/components/PersonDataTable";
import UploadService from "@/_services/upload.service";
import { schoolService } from "@/_services/school.service";
import Dialog from "@/components/Dialog";
import * as axios from "axios";

import UploadFiles from "@/components/UploadFiles";
import PersonDataTable from "@/components/PersonDataTable";

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
  name: "ImportTeacher",

  components: {
    ValidationObserver,
    ValidationProvider,
    Dialog,
    UploadFiles,
    PersonDataTable,
  },

  data() {
    return {
      title: "นำเข้าข้อมูลจาก cgd",
      formTitle: "",

      dialogInfo: false,

      items: [],
      typeSelected: 42,
      infoSelected: 1,

      dialogMsg: {
        title: "",
        message: "",
        type: "",
        show: false
      }
    };
  },

  computed: {
    ...mapState({
      user: state => state.account.user
    }),
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    }
  },

  methods: {
    initialize () {},

    handleLoadItems(items) {
      this.items = items;
    },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    },

    closeInfo() {
      this.dialogInfo = false;
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
    }
  },

  mounted() {
    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  }
};
</script>

<style></style>
