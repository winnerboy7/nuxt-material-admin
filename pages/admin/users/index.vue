<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>
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
                      <v-container>
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
                          name="ชื่อผู้ใช้งาน"
                          v-slot="{ errors }"
                          rules="required|max:10"
                        >
                          <v-text-field
                            v-model="form.username"
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
                          v-if="selectedIndex === -1"
                        >
                          <v-text-field
                            v-model="form.password"
                            :counter="10"
                            :error-messages="errors"
                            label="รหัสผ่าน"
                            type="password"
                            v-if="selectedIndex === -1"
                          ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider
                          name="email"
                          v-slot="{ errors }"
                          rules="email"
                        >
                          <v-text-field
                            v-model="form.email"
                            :error-messages="errors"
                            label="E-mail"
                            
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
                            :disabled="disabled"
                            label="สังกัด"
                            data-vv-name="select-area"
                            required
                          ></v-autocomplete>
                        </ValidationProvider>

                        <v-text-field
                          v-model="form.level"
                          label="ตำแหน่ง"
                        ></v-text-field>
                      </v-container>
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

            <v-dialog
              v-model="dialogPassword"
              max-width="500px"
            >
              <v-card>
                <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                  <v-form ref="formPassword" @keyup.native.enter="handleSubmit(onSubmitPassword)">
                    <v-toolbar dark color="primary">                      
                      <v-toolbar-title><v-icon>mdi-account-key</v-icon> {{ formTitle }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn icon text @click="handleSubmit(onSubmitPassword)">
                          <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                        <v-btn icon text @click="closePassword">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-card-text>
                      <v-container>
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
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        class="mr-4"
                        @click="handleSubmit(onSubmitPassword)"
                      >บันทึก</v-btn>
                      <v-btn
                        color="warning"
                        text
                        @click="closePassword"
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
            <v-dialog v-model="dialogInfo" max-width="500px">
              <v-card>
                <v-card-title class="dark primary">
                  <v-icon dark left>mdi-note</v-icon>
                  <span class="headline white--text">{{ formTitle}}</span>
                  <v-spacer></v-spacer>                  
                  <v-btn
                    icon
                    dark
                    @click="dialogInfo = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title> 
                      
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ชื่อ - สกุล</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.name}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Username</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.username}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>อีเมล์</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="selectedItem.areaCode">
                    <v-list-item-content>
                      <v-list-item-title>สังกัด</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.areaName}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ระดับผู้ใช้งาน</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.role}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ตำแหน่ง</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.level}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>
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
              {{ users.length }}
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>
          
          <v-data-table
            v-model="selected"
            :headers="fields"
            :items="users"
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
            <template v-slot:[`item.username`]="{ item }">
              <div @click="showItem(item)">{{item.username}}</div>
            </template>
            <template v-slot:[`item.name`]="{ item }">
              <div @click="showItem(item)">{{item.name}}</div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="editPasswordItem(item)"
                  >
                    mdi-key
                  </v-icon>
                </template>
                <span>เปลี่ยนรหัสผ่าน</span>
              </v-tooltip>
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
import { userService } from "@/_services/user.service";
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
      title: "ข้อมูลผู้ใช้งานระบบ",
      formTitle: "",
      
      users: [], 
      optionsAreas: [],
      dialog: false,
      dialogInfo: false,
      dialogDelete: false,
      dialogPassword: false,

      item: "",
      selected: [],
      search: "",
      items_per_page: [10, 20, 50, 100, -1],

      selectedIndex: -1,
      selectedItem: [],
      form: {
        name: "",
        username: "",
        password: null,
        email: "",
        areaCode: "",
        level: "",
        role: "",
        status: "1",
      },
      formPassword: {
        username: "",
        password: null,
      },
      defaultItem: {
        name: "",
        username: "",
        password: null,
        email: "",
        areaCode: "",
        level: "",
        role: "Admin",
        status: "1",
      },

      fields: [
        {
          value: "id",
          text: "ที่",
          align: "start",
          sortable: true,
        },
        {
          value: "username",
          text: "ชื่อผู้ใช้งาน",
          sortable: true,
        },
        {
          value: "name",
          text: "ชื่อ - สกุล",
          sortable: true,
          // tdClass: "styleName"
        },
        {
          value: "role",
          text: "ระดับผู้ใช้งาน",
          sortable: true,
        },
        {
          value: "areaName",
          text: "สพท.",
          sortable: true,
        },
        {
          value: "actions",
          text: "ดำเนินการ",
          sortable: false
        },
      ],

      action: "",
      actionConfirm: "",
      state: "readonly",
      // readonly: true,
      // disabled: false,

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

  async asyncData({ $axios }) {},

  async created() {
    console.log("USERS");
    this.getUsers();
    this.getAreas();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach((rule) => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  computed: {
    rows() {
      return this.users.length;
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
  },

  methods: {
    async getUsers() {
      try {
        this.users = await userService.getAll();

        var temp = this.users;
        var autoNumber = 1;
        for (var x in temp) {
          temp[x]["id"] = autoNumber;
          autoNumber = autoNumber + 1;
        }
        this.users = temp;
      } catch (error) {
        console.log(error);
      }
    },

    async getAreas() {
      areaService.getAll().then((response) => {
        this.optionsAreas = response;
      });
    },

    getSelectedArea: function () {
      //console.log(this.selected);
    },

    genAreaUser(button) {
      let payload = {
        name: "",
        username: "",
        password: null,
        email: "",
        areaCode: "",
        level: "",
        role: "",
      };
      /*
        for (let key in this.optionsAreas) {
            payload.name = this.optionsAreas[key].areaName;
            payload.username = this.optionsAreas[key].areaId;
            payload.password = this.optionsAreas[key].areaId;
            payload.email = null;
            payload.areaCode = this.optionsAreas[key].areaId;
            payload.level = "ผู้ดูแลระบบ " + this.optionsAreas[key].areaName;
            payload.role = "Area";
            console.log(payload);
        }
        */

      this.optionsAreas.forEach(function (area, index) {
        //console.log(area);
        payload.name = area.areaName;
        payload.username = area.areaId;
        payload.password = area.areaId;
        payload.email = null;
        payload.areaCode = area.areaId;
        payload.level = "ผู้ดูแลระบบ " + area.areaName;
        payload.role = "Area";

        userService.insert(payload);
        console.log(payload);
      });
      this.action = "genUser";
      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
    },

    // ตรวจสอบสถานะ Validate
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },    

    initialize () {},

    showItem(item) {
      this.formTitle = `ข้อมูล: ${item.name} : (${item.username})`;
      this.selectedIndex = this.users.indexOf(item);
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
      this.formTitle = `แก้ไขข้อมูล: ${item.name} : (${item.username})`;
      this.selectedIndex = this.users.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      // this.form = Object.assign({}, item);
      this.dialog = true;

      for (let key in this.form) {
        this.form[key] = item[key];
      }
      this.form.password = "";

      this.state = "readonly";
      this.action = "update";
    },

    editPasswordItem(item) {
      this.formTitle = `เปลี่ยนรหัสผ่าน: ${item.name}`;
      this.selectedIndex = this.users.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      // this.formPassword = Object.assign({}, item);
      this.dialogPassword = true;
      
      this.formPassword.username = item.username;
      this.formPassword.password = "";

      this.state = "readonly";
      this.action = "updatePassword";
    },

    onSubmit() {      
      if (this.selectedIndex > -1) {
        Object.assign(this.users[this.selectedIndex], this.form);
      } else {
        this.users.push(this.form);
      }

      if (this.action === "update") {
        console.log("Updated");

        userService.update(this.form).then(
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
        
        userService.insert(this.form).then(
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

    onSubmitPassword() {
      console.log("Updated Password");

      userService.updatePassword(this.formPassword).then(
        (response) => {
          this.dialogMsg = {
            title: "เยี่ยมมาก",
            message: "เปลี่ยนรหัสผ่านสำเร็จ",
            type: "primary",
            show: true,
          };

          // swal("เยี่ยมมาก", "เปลี่ยนรหัสผ่านสำเร็จ", "success");
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

      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "";

      this.closePassword();
    },

    // deleteItem(item) {
    //   const index = this.users.indexOf(item);
    //   confirm("คุณยืนยันที่จะลบข้อมูลหรือไม่?") && this.users.splice(index, 1);
    // },

    deleteItem (item) {
      this.formTitle = `ยืนยันการลบข้อมูล: ${item.name} หรือไม่?`;
      this.selectedIndex = this.users.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialogDelete = true

      this.deleteConfirm = "";
      this.action = "delete";
    },

    deleteItemConfirm () {
      this.users.splice(this.selectedIndex, 1)

      console.log("Delete User : " + this.selectedItem.username);
      userService.delete(this.selectedItem.username);

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
    
    closePassword () {
      this.dialogPassword = false
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
    //     Object.assign(this.users[this.selectedIndex], this.selectedItem);
    //   } else {
    //     this.users.push(this.form);
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

    onReset() {
      // Reset our form values
      for (let key in this.form) {
        if (key === "areaId") continue;
        this.form[key] = "";
      }
    },
  },

  watch: {
    // actionConfirm: function () {
    //   this.getUsers();
    // },
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogInfo (val) {
      val || this.closeInfo()
    },
  },
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
