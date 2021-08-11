<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, handleSubmit }">
    <v-form ref="form" @keyup.native.enter="handleSubmit(onSubmit)">
      <v-card class="mb-4">
        <v-toolbar color="primary darken-1" dark flat dense cad>
          <v-toolbar-title class="subheading"
            ><v-icon>mdi-tag</v-icon>{{ title }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>
          <v-card class="elevation-3">
            <v-toolbar dark dense color="light-blue darken-1">
              <v-toolbar-title>ข้อมูลตำแหน่ง/วิทยฐานะ</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <ValidationProvider
                    name="personTypeCode"
                    v-slot="{ errors, valid }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.personTypeCode"
                      :items="optionsPersonTypeCode"
                      item-value="id"
                      item-text="title"
                      :error-messages="errors"
                      :success="valid"
                      label="ประเภท"
                      data-vv-name="select-person-type"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>

                <v-col cols="4">
                  <ValidationProvider
                    name="positionNumber"
                    v-slot="{ errors, valid }"
                    rules="required"
                  >
                    <v-text-field
                      v-model="form.positionNumber"
                      :error-messages="errors"
                      :success="valid"
                      label="เลขที่ตำแหน่ง"
                      dense
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.cgdNumber"
                    label="เลขที่ตำแหน่งจ่ายตรง"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="form.schoolId"
                    :items="optionsSchools"
                    item-value="schId"
                    item-text="schName"
                    label="โรงเรียน"
                    dense
                  ></v-autocomplete>
                </v-col>

                <v-col cols="4">
                  <ValidationProvider
                    name="positionCode"
                    v-slot="{ errors, valid }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.positionCode"
                      :items="optionsPositionCode"
                      item-value="id"
                      item-text="title"
                      :error-messages="errors"
                      :success="valid"
                      label="ตำแหน่ง"
                      data-vv-name="select-positionCode"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <ValidationProvider
                    name="positionStatus"
                    v-slot="{ errors, valid }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.positionStatus"
                      :items="optionsPositionStatus"
                      item-value="id"
                      item-text="title"
                      :error-messages="errors"
                      :success="valid"
                      label="สถานะตำแหน่ง"
                      data-vv-name="select-positionStatus"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.personId"
                    :readonly="readonly"
                    label="เลขบัตรประชาชน"
                    dense
                  ></v-text-field>
                  <v-btn
                    text
                    @click="handleCheckPersonId"
                    :disabled="disabled"
                    v-if="!readonly"
                  >
                    <v-icon>mdi-account-check</v-icon>
                    ตรวจสอบเลขประจำตัวประชาชน
                  </v-btn>
                </v-col>

                <v-col cols="4">
                  
                </v-col>
                <v-col cols="4">
                  
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="form.prefixCode"
                    :items="optionsPrefix"
                    item-value="id"
                    item-text="title"
                    label="คำนำหน้า"
                    data-vv-name="select-prefix"
                    required
                    dense
                  ></v-autocomplete>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.firstName"
                    label="ชื่อ"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.lastName"
                    label="นามสกุล"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mr-4"
            @click="handleSubmit(onSubmit)"
            :disabled="invalid"
            >บันทึก</v-btn
          >
          <v-btn color="warning" text @click="loadPagePrev">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { standardcodeService } from "@/_services/standardcode.service";
import { schoolService } from "@/_services/school.service";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import th from "vee-validate/dist/locale/th.json";
import * as rules from "vee-validate/dist/rules";

export default {
  name: "positionForm",

  components: {
    ValidationObserver,
    ValidationProvider
  },

  props: {
    title: String,
    form: {
      required: true
    },
    readonly: Boolean
  },

  data: () => ({
    disabled: true,

    optionsSchools: [],
    optionsPrefix: [],   
    optionsPersonTypeCode: [],
    optionsPositionCode: [],
    optionsPositionStatus: [],

    optionsSemester: [
      { id: "1", title: "ภาคเรียนที่ 1" },
      { id: "2", title: "ภาคเรียนที่ 2" }
    ]
  }),

  computed: {
    ...mapState({
      account: state => state.account
    })
  },

  created() {},

  mounted() {
    this.getSchools();
    this.getPrefix();
    this.getPersonTypeCode();
    this.getPositionById();
    this.getPositionStatus();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  watch: {
    //ตรวจสอบหมายเลขบัตรประชาชน
    // personId: function(value) {
    //   if (value.length === 13) {
    //     this.getPersonel();
    //   }
    // },
    "form.personId": {
      handler: function(value) {
        if (!this.readonly) {
          if (value.length > 5) {
            this.disabled = false;
            // this.handleCheckPersonId();
          } else {
            this.disabled = true;
          }

          // if (value.length === 13) {
          //   this.handleCheckPersonId();
          // }
        }
      }
    },

    "form.personTypeCode": function() {
      this.getPositionById();
    }
  },

  methods: {
    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    },
    
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    onSubmit() {
      console.log("Save");
      // this.$emit('update:form', this.form)
      this.$emit("updateForm", this.form);
    },

    //ตรวจสอบเลขประจำตัวประชาชน
    handleCheckPersonId() {
      let value = this.form.personId;
      if (value) {
        console.log("Check PersonId");
        this.$emit("handleCheckPersonId", this.form);
      }
    },

    // ดึงโรงเรียน
    getSchools() {
      schoolService.getByArea(this.account.user.areaCode).then(response => {
        this.optionsSchools = response;
      });
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
    getPositionById() {
      if (this.form.personTypeCode) {
        standardcodeService
          .getPositionById(this.form.personTypeCode)
          .then(response => {
            this.optionsPositionCode = response;
          });
      }
    },

    //ดึงข้อมูลสถานะตำแหน่ง
    getPositionStatus() {
      standardcodeService.getPositionStatus().then(response => {
        this.optionsPositionStatus = response;
      });
    }
  }
};
</script>

<style scoped>
.v-tab {
  justify-content: left;
}
</style>
