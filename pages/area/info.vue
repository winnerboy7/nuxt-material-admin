<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg8>
        <v-card class="mb-4">
          <v-toolbar color="primary darken-1" dark flat dense cad>
            <v-toolbar-title class="subheading"><v-icon>mdi-tag</v-icon>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          
          <v-card-text>
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
                <v-card class="elevation-3">
                  <v-toolbar dark dense color="primary">
                    <v-toolbar-title>รายละเอียด</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>รหัส</v-list-item-title>
                          <v-list-item-subtitle>{{ form.areaId}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>ชื่อสำนักงานเขตพื้นที่การศึกษา</v-list-item-title>
                          <v-list-item-subtitle>{{ form.areaName}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>กระทรวง</v-list-item-title>
                          <v-list-item-subtitle>{{ form.areaEducation}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>ชื่อสำนักงาน</v-list-item-title>
                          <v-list-item-subtitle>{{ form.areaObec}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>ที่ตั้ง</v-list-item-title>
                          <v-list-item-subtitle>{{ form.areaLocation}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>เขตตรวจราชการ</v-list-item-title>
                          <v-list-item-subtitle>{{ form.areaGroup}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>วันที่ก่อตั้ง</v-list-item-title>
                          <v-list-item-subtitle>{{ formatFullDateThai(form.areaFoundingdate)}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>เวบไซต์</v-list-item-title>
                          <v-list-item-subtitle>{{ form.website}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>ผู้อำนวยการสำนักงานเขตพื้นที่ฯ</v-list-item-title>
                          <v-list-item-subtitle>{{ form.directorName}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                    </v-list>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card class="elevation-3">
                  <v-toolbar dark dense color="primary">
                    <v-toolbar-title>ข้อมูลทั่วไป</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>เลขที่</v-list-item-title>
                          <v-list-item-subtitle>{{ form.houseId}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>ที่อยู่</v-list-item-title>
                          <v-list-item-subtitle>{{ form.houseNumber}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>ถนน</v-list-item-title>
                          <v-list-item-subtitle>{{ form.street}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>ตำบล</v-list-item-title>
                          <v-list-item-subtitle>{{ form.subdistrictName}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>อำเภอ</v-list-item-title>
                          <v-list-item-subtitle>{{ form.districtName}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>จังหวัด</v-list-item-title>
                          <v-list-item-subtitle>{{ form.provinceName}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>รหัสไปรษณีย์</v-list-item-title>
                          <v-list-item-subtitle>{{ form.postcodeCode}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>หมายเลขโทรศัพท์</v-list-item-title>
                          <v-list-item-subtitle>{{ form.phone1}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>หมายเลขโทรศัพท์</v-list-item-title>
                          <v-list-item-subtitle>{{ form.phone2}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>เวบไซต์</v-list-item-title>
                          <v-list-item-subtitle>{{ form.website}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>ละติจูด</v-list-item-title>
                          <v-list-item-subtitle>{{ form.latitude}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>ลองติจูด</v-list-item-title>
                          <v-list-item-subtitle>{{ form.longitude}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                    </v-list>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="success"
              class="mr-4"
              @click="update()"
            >
              แก้ไขข้อมูล
            </v-btn>
            <cite class="float-right">แก้ไขล่าสุด : {{ formatFullDateThai(form.updatedAt) }}</cite>
          </v-card-actions>

        </v-card>
      </v-flex>

      <v-dialog
        v-model="dialogInfo"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card tile>
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <v-form ref="form" @keyup.native.enter="handleSubmit(onSubmit)">              
              <v-toolbar dark color="primary">
                <v-toolbar-title><v-icon>mdi-pencil</v-icon> {{ formItem.title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn icon text @click="handleSubmit(onSubmit)">
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                  <v-btn icon text @click="dialogInfo = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
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
                  @click="closeInfo"
                >ยกเลิก</v-btn>
              </v-card-actions>
            </v-form>
          </ValidationObserver>        
        </v-card>
      </v-dialog>

      <Dialog
        :title="dialogMsg.title"
        :message="dialogMsg.message"
        :type="dialogMsg.type"
        :show="dialogMsg.show"
        @onOk="onOk"
      ></Dialog>

    </v-layout>
  </v-container>
</template>

<script>
// import sweetalert from "vue-sweetalert2";
import { mapState, mapActions } from "vuex";
import { areaService } from "@/_services/area.service";

import moment from "moment";
// import Swal from "sweetalert2";
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

  data() {
    return {
      title: `สำนักงานเขตพื้นที่การศึกษา`,
      formTitle: "",

      area: [],
      
      formItem: {
        id: "update-modal",
        title: "",
        content: "",
      },

      dialogInfo: false,
      menuFoundingdate: false,
      
      form: {
        id: "",
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
        longitude: "",
        updatedAt: ''
      },

      action: "",
      actionConfirm: "Start",
      readonly: true,
      disabled: false,      
      
      roles: [
        { level: "Admin", text: "Admin" },
        { level: "Area", text: "Area" },
        { level: "School", text: "School" },
      ],

      dialogMsg: {
        title: "",
        message: "",
        type: "",
        show: false,
      },
    };
  },

  mounted() {},

  async created() {
    console.log("AREA");
    this.getAreaById();
    this.title = `ข้อมูลของ ${this.account.user.areaName} (รหัส ${this.account.user.areaCode})`;

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  computed: {
    ...mapState({
      account: state => state.account
    }),
    areaFoundingdate () {
      moment.locale('th');
      return this.form.areaFoundingdate ? moment(this.form.areaFoundingdate).add(543, 'year').format('LL') : ''
    },
  },

  methods: {
    async getAreaById() {
      try {
        [this.area] = await areaService.getById(
          this.$store.state.account.user.areaCode
        );

        // this.area["updatedAt"] = moment(this.area["updatedAt"]).format("DD-MM-YYYY HH:mm:ss");
        for (let key in this.form) {
          this.form[key] = this.area[key];
        }

        let regex = /^(http|https)/;
        if(this.area.website.length > 3 && !this.area.website.match(regex)) {
          this.form.website = 'http://' + this.form.website;
          this.area.website = 'http://' + this.area.website;
          console.log(this.form.website);
        }

        //console.log(this.area);
      } catch (error) {
        console.log(error);
      }
    },

    //ส่งข้อมูลไปอัพเดท
    update() {
      this.formItem.title = `แก้ไขข้อมูล: ${this.account.user.areaName} (รหัส ${this.account.user.areaCode})`;
      this.formItem.content = JSON.stringify(this.form, null, 2);

      for (let key in this.form) {
        this.form[key] = this.area[key];
      }
      this.action = "update";
      this.dialogInfo = true;
    },

    // ตรวจสอบสถานะ Validate
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    initialize () {},

    onSubmit(evt) {
      // console.log("Event", evt);
      // alert(JSON.stringify(this.form));
      Object.assign(this.area, this.form);

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
      }

      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "";

      this.$nextTick(() => {
        this.dialogInfo = false;
      });
    },
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
      return dateValue ? moment(dateValue).add(543, 'year').format('LLLL') : ''
    },
    closeInfo () {
      this.dialogInfo = false
      this.$nextTick(() => {
        // this.selectedItem = Object.assign({}, this.defaultItem)
        // this.selectedIndex = -1
      })
    },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    }
  },

  watch: {
    actionConfirm: function() {
      // this.getAreaById();
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
