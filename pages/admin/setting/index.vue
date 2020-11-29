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
                          name="หัวข้อ"
                          v-slot="{ errors }"
                          rules="required"
                        >
                          <v-text-field
                            v-model="form.title"
                            :error-messages="errors"
                            label="หัวข้อ"
                          ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider
                          name="รายละเอียด"
                          v-slot="{ errors }"
                          rules="required"
                        >
                          <v-text-field
                            v-model="form.detail"
                            :error-messages="errors"
                            label="รายละเอียด"
                          ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider
                          name="ค่า"
                          v-slot="{ errors }"
                          rules="required"
                        >
                          <v-text-field
                            v-model="form.value"
                            :error-messages="errors"
                            label="ค่า"
                          ></v-text-field>
                        </ValidationProvider>

                        <v-checkbox
                          v-model="form.isImportant"
                          label="คอนฟิกระบบ"                          
                        ></v-checkbox>
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
                      <v-list-item-title>หัวข้อ</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.title}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>รายละเอียด</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.detail}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ค่า</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.value}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="selectedItem.areaCode">
                    <v-list-item-content>
                      <v-list-item-title>คอนฟิกระบบ</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedItem.isImportant}}</v-list-item-subtitle>
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
              {{ settings.length }}
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>
          
          <v-data-table
            v-model="selected"
            :headers="fields"
            :items="settings"
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
            <template v-slot:[`item.title`]="{ item }">
              <div @click="showItem(item)">{{item.title}}</div>
            </template>
            <template v-slot:[`item.isImportant`]="{ item }">
              <v-simple-checkbox
                v-model="item.isImportant"
                color="info"
                disabled
              ></v-simple-checkbox>
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
                    :disabled="item.isImportant"
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
import { mapState, mapActions, mapGetters } from "vuex";
import { settingService } from "@/_services/setting.service";
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
      title: `การตั้งค่าระบบ`,
      formTitle: "",
      
      settings: [],
      
      dialog: false,
      dialogInfo: false,
      dialogDelete: false,

      item: "",
      selected: [],
      search: "",
      items_per_page: [10, 20, 50, 100, -1],

      selectedIndex: -1,
      selectedItem: [],

      form: {
        //_id: "",
        title: "",
        value: "",
        detail: "",
        isImportant: false,
      },
      defaultItem: {
        //_id: "",
        title: "",
        value: "",
        detail: "",
        isImportant: false,
      },

      fields: [
        {
          value: "id",
          text: "ที่",
          align: "start",
          sortable: true,
        },
        {
          value: "title",
          text: "หัวข้อ",
          sortable: true
        },
        {
          value: "value",
          text: "ค่า",
          sortable: true,
          // tdClass: "styleName"
        },
        {
          value: "detail",
          text: "รายละเอียด",
          sortable: true
        },
        {
          value: "isImportant",
          text: "คอนฟิกระบบ",
          sortable: true
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
    console.log("SETTING");
    this.getSetting();
    
    this.setAcademicYear();
    this.setSemester();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  computed: {
    ...mapGetters({systemConfig: "config/getSystemConfig"}),
    
    rows() {
      //return this.settings.length;
    },
    readonly() {
      return this.state === "readonly";
    },
    disabled() {
      return this.state === "disabled";
    },
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    },
  },

  methods: {
    ...mapActions("config", ["setAcademicYear", "setSemester"]),

    async getSetting() {
      try {
        console.log("GET SETTING");

        this.settings = await settingService.getSetting();

        var temp = this.settings;
        var autoNumber = 1;
        for (var x in temp) {
          temp[x]["id"] = autoNumber;
          autoNumber = autoNumber + 1;
        }
        this.settings = temp;

        this.totalRows = this.settings.length;

        this.settings["updatedAt"] = moment(this.settings["updatedAt"]).format(
          "DD-MM-YYYY HH:mm:ss"
        );
        
        for (let key in this.form) {
          this.form[key] = this.settings[key];
        }
        //console.log(this.setting);
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
      this.formTitle = `ข้อมูล: ${item.title}`;
      this.selectedIndex = this.settings.indexOf(item);
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
      this.formTitle = `แก้ไขข้อมูล: ${item.title}`;
      this.selectedIndex = this.settings.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      this.form = Object.assign({}, item);
      this.dialog = true;

      this.state = "readonly";
      this.action = "update";
    },

    onSubmit() {      
      if (this.selectedIndex > -1) {
        Object.assign(this.settings[this.selectedIndex], this.form);
      } else {
        this.settings.push(this.form);
      }

      if (this.action === "update") {
        console.log("Updated");

        settingService.update(this.form).then(
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
        
        settingService.insert(this.form).then(
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
    //   const index = this.settings.indexOf(item);
    //   confirm("คุณยืนยันที่จะลบข้อมูลหรือไม่?") && this.settings.splice(index, 1);
    // },

    deleteItem (item) {
      this.formTitle = `ยืนยันการลบข้อมูล: ${item.title} หรือไม่?`;
      this.selectedIndex = this.settings.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialogDelete = true

      this.deleteConfirm = "";
      this.action = "delete";
    },

    deleteItemConfirm () {
      this.settings.splice(this.selectedIndex, 1)

      console.log("Delete : " + this.selectedItem.title);
      settingService.delete(this.selectedItem.title);

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
    //     Object.assign(this.settings[this.selectedIndex], this.selectedItem);
    //   } else {
    //     this.settings.push(this.form);
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

<style scoped>
</style>
