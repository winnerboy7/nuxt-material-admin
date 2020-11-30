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
          <v-card-text class="">
            <v-layout row>
              <v-flex xs4>
                <v-subheader>ชื่อ :</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :value="user.name" dense></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs4>
                <v-subheader>ชื่อผู้ใช้งาน :</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :value="user.username" dense></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs4>
                <v-subheader>อีเมล์ :</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :value="user.email" dense></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row v-if="user.areaCode">
              <v-flex xs4>
                <v-subheader>สังกัด :</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :value="user.areaName" dense></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs4>
                <v-subheader>ตำแหน่ง :</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :value="user.level" dense></v-text-field>
              </v-flex>
            </v-layout>

            <v-btn color="success" class="mr-4" @click="update()">
              แก้ไขข้อมูล
            </v-btn>

            <v-btn color="error" class="mr-4" @click="updatePass()">
              เปลี่ยนรหัสผ่าน
            </v-btn>
            <cite class="float-right">แก้ไขล่าสุด : {{ user.updatedAt }}</cite>
          </v-card-text>
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
                <v-toolbar-title
                  ><v-icon>mdi-pencil</v-icon>
                  {{ formItem.title }}</v-toolbar-title
                >
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
                <!-- <ValidationProvider name="ชื่อผู้ใช้งาน" v-slot="validationContext" :rules="{ required: true }" >                     
                  <v-text-field
                    v-model="form.username"
                    label="ชื่อผู้ใช้งาน"
                    :readonly="readonly"
                    :state="getValidationState(validationContext)"
                    :error-messages="validationContext.errors[0]"
                  ></v-text-field>
                </ValidationProvider> -->

                <ValidationProvider
                  name="ชื่อผู้ใช้งาน"
                  v-slot="{ errors }"
                  rules="required|max:20"
                >
                  <v-text-field
                    v-model="form.username"
                    :counter="20"
                    :error-messages="errors"
                    label="ชื่อผู้ใช้งาน"
                    :readonly="readonly"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="รหัสผ่าน"
                  v-slot="{ errors }"
                  rules="required|max:20|min:4"
                  v-if="action === 'add'"
                >
                  <v-text-field
                    v-model="form.password"
                    :counter="20"
                    :error-messages="errors"
                    label="รหัสผ่าน"
                    type="password"
                    v-if="action === 'add'"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="ชื่อ-นามสกุล"
                  v-slot="{ errors }"
                  rules="required"
                >
                  <v-text-field
                    v-model="form.name"
                    :error-messages="errors"
                    label="ชื่อ-นามสกุล"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="email"
                  v-slot="{ errors }"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="form.email"
                    :error-messages="errors"
                    label="E-mail"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="ระดับผู้ใช้งาน"
                  v-slot="{ errors }"
                  rules="required"
                >
                  <v-select
                    v-model="form.role"
                    :items="roles"
                    item-value="level"
                    item-text="text"
                    :error-messages="errors"
                    :disabled="disabled"
                    label="ระดับผู้ใช้งาน"
                    data-vv-name="select-role"
                    required
                  ></v-select>
                </ValidationProvider>

                <ValidationProvider
                  name="สังกัด"
                  v-slot="{ errors }"
                  rules="required"
                  v-if="form.role === 'Area'"
                >
                  <v-select
                    v-model="form.areaCode"
                    v-on:change="getSelectedArea"
                    :items="areas"
                    item-value="areaId"
                    item-text="areaName"
                    :error-messages="errors"
                    :disabled="disabled"
                    label="สังกัด"
                    data-vv-name="select-area"
                    required
                  ></v-select>
                </ValidationProvider>

                <v-text-field
                  v-model="form.level"
                  label="ตำแหน่ง"
                ></v-text-field>

                <v-btn
                  color="success"
                  class="mr-4"
                  @click="handleSubmit(onSubmit)"
                  >ตกลง</v-btn
                >
                <v-btn color="warning" text @click="dialogInfo = false"
                  >ปิด</v-btn
                >
              </v-card-text>

              <div style="flex: 1 1 auto;"></div>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogPassword" max-width="500px">
        <v-card>
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <v-form
              ref="formPassword"
              @keyup.native.enter="handleSubmit(onSubmitPassword)"
            >
              <v-toolbar dark color="primary">
                <v-toolbar-title
                  ><v-icon>mdi-pencil</v-icon>
                  {{ formItem.title }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn icon text @click="handleSubmit(onSubmitPassword)">
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                  <v-btn icon text @click="dialogPassword = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>

              <v-card-text>
                <ValidationProvider
                  name="ชื่อผู้ใช้งาน"
                  v-slot="{ errors }"
                  rules="required|max:10"
                >
                  <v-text-field
                    v-model="formPassword.username"
                    :counter="10"
                    :error-messages="errors"
                    label="ชื่อผู้ใช้งาน"
                    :readonly="readonly"
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="รหัสผ่าน"
                  v-slot="{ errors }"
                  rules="required|max:10|min:4"
                >
                  <v-text-field
                    v-model="formPassword.password"
                    :counter="10"
                    :error-messages="errors"
                    label="รหัสผ่าน"
                    type="password"
                  ></v-text-field>
                </ValidationProvider>

                <v-btn
                  color="success"
                  class="mr-4"
                  @click="handleSubmit(onSubmitPassword)"
                  >ตกลง</v-btn
                >
                <v-btn color="warning" text @click="dialogPassword = false"
                  >ปิด</v-btn
                >
              </v-card-text>

              <v-card-actions> </v-card-actions>
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
import { mapState, mapActions } from "vuex";
import { userService } from "@/_services/user.service";
import { areaService } from "@/_services/area.service";
import { Role } from "@/controllers/role";

import moment from "moment";
// import Swal from "sweetalert2";
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
  layout: "admin",
  middleware: "authorize-admin",

  components: {
    ValidationObserver,
    ValidationProvider,
    Dialog
  },

  data() {
    return {
      title: "ข้อมูลส่วนตัว",
      user: [],
      areas: [],

      formItem: {
        id: "update-modal",
        title: "",
        content: ""
      },

      dialogInfo: false,
      dialogPassword: false,

      form: {
        name: "",
        username: "",
        password: null,
        email: "",
        areaCode: "",
        level: "",
        role: "",
        status: "1"
      },
      formPassword: {
        username: "",
        password: null
      },

      action: "",
      actionConfirm: "Start",
      readonly: true,
      disabled: false,

      roles: [
        { level: "Admin", text: "Admin" },
        { level: "Area", text: "Area" },
        { level: "School", text: "School" }
      ],

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
      account: state => state.account
    }),

    // readonly() {
    //   return this.state === "readonly";
    // },
    // disabled() {
    //   return this.state === "disabled";
    // },
    Role() {
      return Role;
    }
  },

  created() {
    this.getUsers();
    this.getAreas();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  methods: {
    async getUsers() {
      try {
        [this.user] = await userService.getProfile(this.account.user.username);

        moment.locale("th");
        this.user["updatedAt"] = moment(this.user["updatedAt"])
          .add(543, "year")
          .format("LLLL");
        // this.user["updatedAt"] = moment(this.user["updatedAt"]).format("DD-MM-YYYY HH:mm:ss");

        for (let key in this.form) {
          this.form[key] = this.user[key];
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getAreas() {
      try {
        this.areas = await areaService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    getSelectedArea: function() {
      //console.log(this.selected);
    },

    update(button) {
      this.formItem.title = `แก้ไขข้อมูล: ${this.user.name} : (${this.user.username})`;
      this.formItem.content = JSON.stringify(this.form, null, 2);

      for (let key in this.form) {
        this.form[key] = this.user[key];
      }
      this.form.password = "";
      this.action = "update";
      this.dialogInfo = true;
    },

    updatePass(button) {
      this.formItem.title = `เปลี่ยนรหัสผ่าน: ${this.user.name}`;
      this.formItem.content = JSON.stringify(this.form, null, 2);

      this.formPassword.username = this.user.username;
      this.updatePassword = "";

      this.action = "updatePassword";
      this.dialogPassword = true;
    },

    // ตรวจสอบสถานะ Validate
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    onSubmit(evt) {
      // console.log("Event", evt);
      // alert(JSON.stringify(this.form));
      if (this.action === "update") {
        console.log("Updated");
        this.updateUsername = "";
        userService.update(this.form).then(
          response => {
            this.dialogMsg = {
              title: "เยี่ยมมาก",
              message: "แก้ไขข้อมูลสำเร็จ",
              type: "primary",
              show: true
            };
            // swal("เยี่ยมมาก", "แก้ไขข้อมูลสำเร็จ", "success");
          },
          error => {
            console.log(error);
            this.dialogMsg = {
              title: "แจ้งเตือน !",
              message: "เกิดข้อผิดพลาด",
              type: "error",
              show: true
            };

            // swal("เกิดข้อผิดพลาด!", "", "error");
          }
        );
      } else if (this.action === "add") {
        console.log("Insert");
        console.log(this.form);
        this.insertUsername = this.form.username;
        userService.insert(this.form).then(
          response => {
            this.dialogMsg = {
              title: "เยี่ยมมาก",
              message: "บันทึกข้อมูลสำเร็จ",
              type: "primary",
              show: true
            };

            // swal("เยี่ยมมาก", "บันทึกข้อมูลสำเร็จ", "success");
          },
          error => {
            console.log(error);
            this.dialogMsg = {
              title: "แจ้งเตือน !",
              message: "เกิดข้อผิดพลาด",
              type: "error",
              show: true
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

    onSubmitPassword(evt) {
      // console.log("Event", evt);
      // alert(JSON.stringify(this.form));
      console.log("Updated Password");
      this.updatePassword = "";
      userService.updatePassword(this.formPassword).then(
        response => {
          this.dialogMsg = {
            title: "เยี่ยมมาก",
            message: "เปลี่ยนรหัสผ่านสำเร็จ",
            type: "primary",
            show: true
          };

          // swal("เยี่ยมมาก", "เปลี่ยนรหัสผ่านสำเร็จ", "success");
        },
        error => {
          console.log(error);
          this.dialogMsg = {
            title: "แจ้งเตือน !",
            message: "เกิดข้อผิดพลาด",
            type: "error",
            show: true
          };

          // swal("เกิดข้อผิดพลาด!", "", "error");
        }
      );

      let d = new Date().getTime();
      this.actionConfirm = this.action + d;

      this.$nextTick(() => {
        this.dialogPassword = false;
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

    // onReset(evt) {
    //   for (let key in this.form) {
    //     if (key === "areaId") continue;
    //     this.form[key] = "";
    //   }
    // },

    // submit() {
    //   this.$refs.observer.validate();
    // },
    // clear() {
    //   this.dialogInfo = false;
    // },
  },

  watch: {
    actionConfirm: function() {
      this.getUsers();
    }
  }
};
</script>
