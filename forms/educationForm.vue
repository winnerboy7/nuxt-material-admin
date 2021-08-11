<template>
  <v-card tile>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <v-form ref="form" @keyup.native.enter="handleSubmit(onSubmit)">
        <v-toolbar dark color="primary">
          <v-toolbar-title
            ><v-icon>mdi-pencil</v-icon> {{ title }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon text @click="handleSubmit(onSubmit)">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
            <v-btn icon text @click="closeInfo">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <ValidationProvider
            name="educationLevelCode"
            v-slot="{ errors, valid }"
            rules="required"
          >
            <v-autocomplete
              v-model="formEdu.educationLevelCode"
              v-on:change="setFormEduLevel"
              :error-messages="errors"
              :success="valid"
              :items="optionsEducationLevelCode"
              item-value="id"
              item-text="title"
              label="ระดับการศึกษา"
              data-vv-name="select-educationLevelCode"
              return-object
            ></v-autocomplete>
          </ValidationProvider>

          <ValidationProvider
            name="degreeCode"
            v-slot="{ errors, valid }"
            rules="required"
          >
            <v-autocomplete
              v-model="formEdu.degreeCode"
              v-on:change="setFormDegree"
              :error-messages="errors"
              :success="valid"
              :items="optionsDegreeCode"
              item-value="id"
              item-text="title"
              label="วุฒิการศึกษา"
              data-vv-name="select-degreeCode"
              return-object
            ></v-autocomplete>
          </ValidationProvider>

          <ValidationProvider
            name="majorCode"
            v-slot="{ errors, valid }"
            rules="required"
          >
            <v-autocomplete
              v-model="formEdu.majorCode"
              v-on:change="setFormMajor"
              :error-messages="errors"
              :success="valid"
              :items="optionsMajorCode"
              item-value="id"
              item-text="title"
              label="ประเภทวิชา"
              data-vv-name="select-majorCode"
              return-object
            ></v-autocomplete>
          </ValidationProvider>

          <v-text-field
            v-if="formEdu.majorCode=='zzzz'"
            v-model="formEdu.otherMajor"
            label="ประเภทวิชาอื่น ๆ โปรดระบุ"
            dense
          ></v-text-field>

          <ValidationProvider
            name="programCode"
            v-slot="{ errors, valid }"
            rules="required"
          >
            <v-autocomplete
              v-model="formEdu.programCode"
              v-on:change="setFormMajorProgram"
              :error-messages="errors"
              :success="valid"
              :items="optionsMajorProgramCode"
              item-value="id"
              item-text="title"
              label="สาขาวิชาเอก"
              data-vv-name="select-majorProgramCode"
              return-object
            ></v-autocomplete>
          </ValidationProvider>

          <v-text-field
            v-if="formEdu.programCode=='zzzzz'"
            v-model="formEdu.otherProgram"
            label="สาขาวิชาเอกอื่น ๆ โปรดระบุ"
            dense
          ></v-text-field>

          <!-- <pre> {{ formEdu }} </pre> -->
          <!-- {{ action }} -->

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-4" @click="handleSubmit(onSubmit)"
            >บันทึก</v-btn
          >
          <v-btn color="warning" text @click="closeInfo">ยกเลิก</v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { standardcodeService } from "@/_services/standardcode.service";
import { teacherService } from "@/_services/teacher.service";
// import Swal from "sweetalert2";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import th from "vee-validate/dist/locale/th.json";
import * as rules from "vee-validate/dist/rules";

export default {
  name: "educationForm",

  components: {
    ValidationObserver,
    ValidationProvider
  },

  props: {
    title: String,
    formEdu: {
      required: true
    },
    action: String,
    readonly: Boolean
  },

  data() {
    return {
      optionsEducationLevelCode: [],
      optionsDegreeCode: [],
      optionsMajorCode: [],
      optionsMajorProgramCode: [],
      actionConfirm: "Start"
    };
  },

  mounted() {
    this.getEducationLevel();
    this.getDegree();
    this.getMajor();
    this.getMajorProgram();
  },

  async created() {
    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  computed: {},

  methods: {
    // ตรวจสอบสถานะ Validate
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    initialize() {},
    //ดึงข้อมูลระดับที่สอน-ระดับการศึกษา
    getEducationLevel() {
      standardcodeService.getEducationLevel().then(response => {
        this.optionsEducationLevelCode = response;
      });
    },

    //ดึงข้อมูลวุฒิการศึกษา
    getDegree() {
      standardcodeService.getDegree().then(response => {
        this.optionsDegreeCode = response;
      });
    },

    //ดึงข้อมูลประเภทวิชา
    getMajor() {
      standardcodeService.getMajor().then(response => {
        this.optionsMajorCode = response;
      });
    },

    //ดึงข้อมูลสาขาวิชา
    getMajorProgram() {
      standardcodeService.getMajorProgram().then(response => {
        this.optionsMajorProgramCode = response;
      });
    },

    onSubmit() {
      if (this.action === "update") {
        console.log("Updated");
        teacherService.updateTeacherEdu(this.formEdu).then(
          response => {
            swal("ยินดีด้วย", "แก้ไขข้อมูลสำเร็จ", "success");
          },
          error => {
            console.log(error);
            swal("เกิดข้อผิดพลาด!", "", "error");
          }
        );
        this.$emit("onUpdate");
      } else if (this.action === "add") {
        console.log("Insert");
        teacherService.insertTeacherEdu(this.formEdu).then(
          response => {
            swal("ยินดีด้วย", "บันทึกข้อมูลสำเร็จ", "success");
          },
          error => {
            console.log(error);
            swal("เกิดข้อผิดพลาด!", "", "error");
          }
        );
        this.$emit("onInsert");
      }
    },

    closeInfo() {
      this.$emit("closeInfo");
    },

    setFormEduLevel(v) {
      this.formEdu.educationLevelCode = v.id;
      this.formEdu.educationLevelName = v.title;
    },

    setFormDegree(v) {
      this.formEdu.degreeCode = v.id;
      this.formEdu.degreeName = v.title;
      this.formEdu.otherDegree = v.title;
    },

    setFormMajor(v) {
      this.formEdu.majorCode = v.id;
      this.formEdu.majorName = v.title;
      if (this.formEdu.majorCode !== 'zzzz') {
        this.formEdu.otherMajor = "";
      }   
    },

    setFormMajorProgram(v) {
      this.formEdu.programCode = v.id;
      this.formEdu.programName = v.title;
      if (this.formEdu.programCode !== 'zzzzz') {
        this.formEdu.otherProgram = "";
      }
    }
  },

  watch: {
    actionConfirm: function() {
      // this.getAreaById();
    }
  }
};
</script>

<style scoped></style>
