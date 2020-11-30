

<template>
  <ValidationObserver ref="observer"  v-slot="{ handleSubmit }">
    <v-form ref="form" @keyup.native.enter="handleSubmit(onSubmit)">
      <v-card class="mb-4">
        <v-toolbar color="primary darken-1" dark flat dense cad>
          <v-toolbar-title class="subheading"><v-icon>mdi-tag</v-icon>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>
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
                    name="เลขบัตรประชาชน"
                    v-slot="{ errors }"
                    rules="required|max:13"
                  >
                    <v-text-field
                      v-model="form.personId"
                      :error-messages="errors"
                      :readonly="readonly"
                      label="เลขบัตรประชาชน"
                      dense
                    ></v-text-field>
                  </ValidationProvider>

                  <v-btn text @click="handleCheckPersonId" :disabled="disabled" v-if="!readonly">
                    <v-icon>mdi-account-check</v-icon> ตรวจสอบเลขประจำตัวประชาชน
                  </v-btn>

                  <v-text-field
                    v-model="form.passportNumber"
                    label="หมายเลข Passport"
                    dense
                  ></v-text-field>

                  <v-menu
                    v-model="menuStartDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.passportStartDate"
                        label="วันทำ Passport"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.passportStartDate"
                      locale="TH-th"
                      @input="menuStartDate = false"
                    ></v-date-picker>
                  </v-menu>

                  <v-menu
                    v-model="menuExpireDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.passportEndDate"
                        label="วันหมดอายุ Passport"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.passportEndDate"
                      locale="TH-th"
                      @input="menuExpireDate = false"
                    ></v-date-picker>
                  </v-menu>

                  <ValidationProvider
                    name="คำนำหน้า"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.prefixCode"
                      :items="optionsPrefix"
                      item-value="id"
                      item-text="title"
                      filled
                      :error-messages="errors"
                      label="คำนำหน้า"
                      data-vv-name="select-prefix"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>

                  <ValidationProvider
                    name="ชื่อ"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      v-model="form.firstName"
                      :error-messages="errors"
                      label="ชื่อ"
                      dense
                    ></v-text-field>
                  </ValidationProvider>

                  <ValidationProvider
                    name="นามสกุล"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      v-model="form.lastName"
                      :error-messages="errors"
                      label="นามสกุล"
                      dense
                    ></v-text-field>
                  </ValidationProvider>

                  <v-menu
                    v-model="menuBirthday"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.birthdate"
                        label="วันเกิด"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.birthdate"
                      locale="TH-th"
                      @input="menuBirthday = false"
                    ></v-date-picker>
                  </v-menu>

                  <ValidationProvider
                    name="เพศ"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.genderCode"
                      :items="optionsGender"
                      item-value="id"
                      item-text="title"
                      filled
                      :error-messages="errors"
                      label="เพศ"
                      data-vv-name="select-gender"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>

                  <ValidationProvider
                    name="สัญชาติ"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.nationalityCode"
                      :items="optionsNationality"
                      item-value="id"
                      item-text="title"
                      filled
                      :error-messages="errors"
                      label="สัญชาติ"
                      data-vv-name="select-nationalityCode"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>

                  <v-text-field
                    v-model="form.currentHouseId"
                    label="รหัสทะเบียนบ้าน"
                    dense
                  ></v-text-field>

                  <ValidationProvider
                    name="บ้านเลขที่"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      v-model="form.currentHouseNumber"
                      :error-messages="errors"
                      label="บ้านเลขที่"
                      dense
                    ></v-text-field>
                  </ValidationProvider>

                  <v-text-field
                    v-model="form.currentVillageNumber"
                    label="หมู่ที่"
                    dense
                  ></v-text-field>

                  <v-text-field
                    v-model="form.currentTrok"
                    label="ตรอก"
                    dense
                  ></v-text-field>

                  <v-text-field
                    v-model="form.currentSoi"
                    label="ซอย"
                    dense
                  ></v-text-field>

                  <v-text-field
                    v-model="form.currentStreet"
                    label="ถนน"
                    dense
                  ></v-text-field>

                  <ValidationProvider
                    name="จังหวัด"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.province_id"
                      v-on:change="getDistrict"
                      :items="optionsProvince"
                      item-value="id"
                      item-text="province"
                      filled
                      :error-messages="errors"
                      label="จังหวัด"
                      data-vv-name="select-province"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>

                  <ValidationProvider
                    name="อำเภอ/เขต"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.district_id"
                      v-on:change="getSubdistrict"
                      :items="optionsDistrict"
                      item-value="id"
                      item-text="district"
                      filled
                      :error-messages="errors"
                      label="อำเภอ/เขต"
                      data-vv-name="select-amphur"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>

                  <ValidationProvider
                    name="ตำบล/แขวง"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.currentSubdistrictCode"
                      :items="optionsSubdistrict"
                      item-value="id"
                      item-text="sub_district"
                      filled
                      :error-messages="errors"
                      label="ตำบล/แขวง"
                      data-vv-name="select-tambon"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>

                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>

                  <!-- <v-autocomplete
                    v-model="form.semester"
                    :items="optionsSemester"
                    item-value="id"
                    item-text="title"
                    filled
                    label="ภาคเรียน"
                    data-vv-name="select-semester"
                  ></v-autocomplete>

                  <v-text-field
                    v-model="form.academicYear"
                    label="ปีการศึกษา"
                    dense
                  ></v-text-field> -->

                  <ValidationProvider
                    name="ประเภท"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.personTypeCode"
                      :items="optionsPersonTypeCode"
                      item-value="id"
                      item-text="title"
                      filled
                      :error-messages="errors"
                      label="ประเภท"
                      data-vv-name="select-person-type"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>

                  <ValidationProvider
                    name="ตำแหน่ง"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.positionCode"
                      :items="optionsPositionCode"
                      item-value="id"
                      item-text="title"
                      filled
                      :error-messages="errors"
                      label="ตำแหน่ง"
                      data-vv-name="select-positionCode"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>

                  <ValidationProvider
                    name="วิทยฐานะ"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="form.academicStandingCode"
                      :items="optionsAcademicStandingCode"
                      item-value="id"
                      item-text="title"
                      filled
                      :error-messages="errors"
                      label="วิทยฐานะ"
                      data-vv-name="select-academicStandingCode"
                      required
                      dense
                    ></v-autocomplete>
                  </ValidationProvider>

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
            @click="loadPagePrev"
          >ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { personelService } from "@/_services/personel.service";
import { standardcodeService } from "@/_services/standardcode.service";
// import { schoolService } from "@/_services/school.service";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import th from "vee-validate/dist/locale/th.json";
import * as rules from "vee-validate/dist/rules";

export default {
  name: 'personelForm',

  components: {
    ValidationObserver,
    ValidationProvider,
  },
  
  props: {
    title: String,
    form: {
      required: true,
    },
    readonly: Boolean,
  },

  data: () => ({
    disabled: true,

    menuStartDate: false,
    menuExpireDate: false,
    menuBirthday: false,
    menuLicenseExpiredDate: false,

    // optionsSchools: [],
    optionsPrefix: [],
    optionsGender: [],
    optionsNationality: [],
    optionsSubdistrict: [],
    optionsProvince: [],
    optionsDistrict: [],
    optionsPersonTypeCode: [],
    optionsPositionCode: [],
    // optionsTeachAcademicLevelCode: [],
    // optionsTeachSubjectCode: [],
    optionsAcademicStandingCode: [],
    optionsSemester: [{id:"1", title: "ภาคเรียนที่ 1"},{id:"2", title: "ภาคเรียนที่ 2"}],
  }),

  computed: {
    ...mapState({
      account: state => state.account
    }), 
  },

  mounted() {    
    console.log("PERSONEL");
    // this.getPersonel();

    // this.getSchools();
    this.getPrefix();
    this.getGender();
    this.getNationality();
    this.getPersonTypeCode();
    this.getPositionCode();
    // this.getTeachAcademicLevelCode();
    // this.getTeachSubjectCode();
    this.getAcademicStandingCode();
    this.getProvince();
    this.getDistrict();
    this.getSubdistrict();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  created() {
  },

  watch: {
    //ตรวจสอบหมายเลขบัตรประชาชน
    // personId: function(value) {
    //   if (value.length === 13) {
    //     this.getPersonel();
    //   }
    // },
    'form.personId': {
      handler: function(value) {
        if (!this.readonly)  {
          if(value.length === 13) {
            this.disabled = false;
            this.handleCheckPersonId();
          }
          else {
            this.disabled = true;
          }
        }
      },
    },

    'form.province_id': function() {
      this.getDistrict();
    },

    'form.district_id': function() {
      this.getSubdistrict();
    }
  },

  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //ดึงโรงเรียน
    // getSchools() {
    //   schoolService.getByArea(this.account.user.areaCode).then(response => {
    //     this.optionsSchools = response;
    //   });
    // },

    //ดึงคำนำหน้า
    getPrefix() {
      standardcodeService.getPrefix().then(response => {
        this.optionsPrefix = response;
      });
    },

    //ดึงเพศ
    getGender() {
      standardcodeService.getGender().then(response => {
        this.optionsGender = response;
      });
    },

    //ดึงสัญชาติ
    getNationality() {
      standardcodeService.getNationality().then(response => {
        this.optionsNationality = response;
      });
    },

    //ดึงข้อมูลประเภทบุคลากร
    getPersonTypeCode() {
      standardcodeService.getPersonTypeCode().then(response => {
        this.optionsPersonTypeCode = response;
      });
    },

    //ดึงข้อมูลตำแหน่งบุคลากร
    getPositionCode() {
      standardcodeService.getPositionCode().then(response => {
        this.optionsPositionCode = response;
      });
    },

    //ดึงข้อมูลระดับที่สอน
    // getTeachAcademicLevelCode() {
    //   standardcodeService.getTeachAcademicLevelCode().then(response => {
    //     this.optionsTeachAcademicLevelCode = response;
    //   });
    // },

    //ดึงข้อมูลกลุ่มสาระฯ
    // getTeachSubjectCode() {
    //   standardcodeService.getTeachSubjectCode().then(response => {
    //     this.optionsTeachSubjectCode = response;
    //   });
    // },

    //ดึงข้อมูลวิทยฐานะ
    getAcademicStandingCode() {
      standardcodeService.getAcademicStandingCode().then(response => {
        this.optionsAcademicStandingCode = response;
      });
    },

    //ดึงข้อมูลอำเภอ
    getDistrict() {
      standardcodeService.getDistrict(this.form.province_id).then(response => {
        this.optionsDistrict = response;
      });
    },

    //ดึงข้อมูลตำบล
    getSubdistrict() {
      standardcodeService.getSubdistrict(this.form.district_id).then(response => {
        this.optionsSubdistrict = response;
      });
    },

    //ดึงข้อมูลจังหวัด
    getProvince() {
      standardcodeService.getProvince().then(response => {
        this.optionsProvince = response;
      });
    },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    },

    //ยืนยันฟอร์ม
    onSubmit() {
      console.log('Save')      
      // this.$emit('update:form', this.form)
      this.$emit('updateForm', this.form)
    },

    //ตรวจสอบเลขประจำตัวประชาชน
    handleCheckPersonId() {
      let value = this.form.personId;
      if (value) {
        console.log('Check PersonId')
        this.$emit('handleCheckPersonId', this.form)
      }    
    },
  },
}
</script>