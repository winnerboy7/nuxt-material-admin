<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>

        <teacher-form
          :title="title"
          :form.sync="form"
          :readonly="readonly"
          :disabled="disabled"
          @updateForm="onSubmit"
        ></teacher-form>

        <Dialog
          :title="dialogMsg.title"
          :message="dialogMsg.message"
          :type="dialogMsg.type"
          :show="dialogMsg.show"
          @onOk="onOk"
        ></Dialog>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { teacherService } from "@/_services/teacher.service";
import moment from "moment";
import Dialog from "@/components/Dialog";
import Swal from "sweetalert2";
import TeacherForm from '@/forms/teacherForm'

export default {
  layout: "area",
  middleware: "authorize-area",  
  name: "EditTeacher",

  components: {
    Dialog,
    TeacherForm,
  },

  asyncData({ params }) {
    // called every time before loading the component
    return {
      personId: params.personId
    };
  },

  data() {
    return {
      //ตัวแปรที่ใช้งาน
      title: "แก้ไขข้อมูลครูและบุคลากรทางการศึกษา",
      teacher: [],
      readonly: true,
      disabled: true,
      action: "",
      actionConfirm: "Start",

      form: {
        personId: "",
        prefixCode: "",
        firstName: "",
        middleName: "",
        lastName: "",
        birthdate: "",
        genderCode: "",
        nationalityCode: "",
        currentHouseId: "",
        currentHouseNumber: "",
        currentVillageNumber: "",
        currentTrok: "",
        currentSoi: "",
        currentStreet: "",
        currentSubdistrictCode: "",

        academicYear: "",
        semester: "",
        schoolId: "",
        passportNumber: "",
        passportStartDate: "",
        passportEndDate: "",
        personTypeCode: "",
        positionCode: "",
        academicStandingCode: "",
        teachAcademicLevelCode: "",
        teachSubjectCode: "",
        teacherQualificationCode: "",
        teacherCertificateCode: "",
        licenseNumber: "",
        licenseExpiredDate: "",
        updateDate: "",
        foreignCode: "",
        statusIdcard: "",
        id: "",

        district_id: "",
        province_id: "",
      },

      dialogMsg: {
        title: "",
        message: "",
        type: "",
        show: false,
      },
    };
  },

  computed: {    
    ...mapGetters({
      systemConfig: "config/getSystemConfig"
    }),  
  },

  mounted() {},

  watch: {
    actionConfirm: function() {
      this.getTeacher();
    },
  },
  
  created() {
    console.log("TEACHER");
    this.getTeacher();  
    this.setAcademicYear();
    this.setSemester();
  },

  methods: {    
    // ดึงข้อมูลคอนฟิกระบบ
    ...mapActions("config", ["setAcademicYear", "setSemester"]),

    // ดึงข้อมูลครู
    async getTeacher() {
      console.log("GET TEACHER");
      try {
        await teacherService.getById(this.personId).then(response => {
          [this.teacher] = response;
          this.title =`แก้ไขข้อมูล ${this.teacher.prefixName.title}${this.teacher.firstName}  ${this.teacher.lastName}`;
        });

        for (let key in this.form) {
          this.form[key] = this.teacher[key];
        }
        this.form.province_id = this.teacher.subdistrictName.province_id;
        this.form.district_id = this.teacher.subdistrictName.district_id;
        
        this.form.academicYear = this.systemConfig.academicYear;
        this.form.semester = this.systemConfig.semester;

        this.form.birthdate = this.formatDate(this.form.birthdate);
        this.form.passportStartDate = this.formatDate(this.form.passportStartDate);
        this.form.passportEndDate = this.formatDate(this.form.passportEndDate);
        this.form.licenseExpiredDate = this.formatDate(this.form.licenseExpiredDate);
        this.form.updateDate = moment().format("YYYYMMDD");
      } catch (error) {
        console.log(error);
      }
    },

    //บันทึกข้อมูล
    onSubmit() {
      console.log("Updated");
      var teacherForm = this.form;

      teacherForm.birthdate = moment(teacherForm.birthdate).format("YYYYMMDD");
      teacherForm.passportStartDate = teacherForm.passportStartDate.length > 0
          ? moment(teacherForm.passportStartDate).format("YYYYMMDD")
          : "00000000";
      teacherForm.passportEndDate = teacherForm.passportEndDate.length > 0
          ? moment(teacherForm.passportEndDate).format("YYYYMMDD")
          : "00000000";
      teacherForm.licenseExpiredDate = teacherForm.licenseExpiredDate.length > 0
          ? moment(teacherForm.licenseExpiredDate).format("YYYYMMDD")
          : "00000000";
      teacherForm.updateDate = moment().format("YYYYMMDD");
      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "update";

      // console.log(this.form)

      teacherService.update(teacherForm).then(
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
    },
    
    //จัดรูปแบบวันที่ให้เป็น 1990-09-18 จาก 19900918 (YYYYMMDD)
    formatDate(ymd) {
      if (ymd.length == 8 && ymd != "" && ymd != "00000000") {
        this.yyyy = ymd.substring(0, 4);
        this.mm = ymd.substr(4, 2);
        this.dd = ymd.substr(6, 2);
        return this.yyyy + "-" + this.mm + "-" + this.dd;
      } else {
        return "";
      }
    },

    //ปุ่มปิด Dialog
    onOk(value) {
      this.dialogMsg = {
        title: "",
        message: "",
        type: "primary",
        show: false,
      };
    },
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
.btn-control button {
  margin-right: 5px;
}
.btn-prev {
  margin-bottom: -6px;
  margin-top: -4px;
}
</style>
