<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>
        <position-form
          :title="title"
          :form.sync="form"
          :readonly="readonly"
          @updateForm="onSubmit"
          @handleCheckPersonId="handleCheckPersonId"
        ></position-form>

        <Dialog
          :title="dialogMsg.title"
          :message="dialogMsg.message"
          :type="dialogMsg.type"
          :show="dialogMsg.show"
          @onOk="onOk"
        ></Dialog>

        <!-- <pre> {{ form }} </pre> -->

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { manpowerService } from "@/_services/manpower.service";
import { teacherService } from "@/_services/teacher.service";
import moment from "moment";
import Dialog from "@/components/Dialog";
import Swal from "sweetalert2";
import PositionForm from "@/forms/positionForm";

export default {
  layout: "area",
  middleware: "authorize-area",
  name: "AddPosition",

  components: {
    Dialog,
    PositionForm
  },

  asyncData({ params }) {
    // called every time before loading the component
    return {
      personTypeCode: params.personTypeCode
    };
  },

  data() {
    return {
      //ตัวแปรที่ใช้งาน
      title: `เพิมข้อมูลอัตรากำลังใน ${this.$store.state.account.user.areaName} : ${this.$store.state.account.user.areaCode}`,
      teacher: [],
      readonly: false,
      action: "",
      actionConfirm: "Start",

      areaName: this.$store.state.account.user.areaName,
      areaCode: this.$store.state.account.user.areaCode,

      form: {
        // _id: "",
        academicYear: "",
        semester: "",
        areaCode: this.$store.state.account.user.areaCode,
        schoolId: "",

        personId: "",
        prefixCode: "",
        firstName: "",
        middleName: "",
        lastName: "",        

        nationalityCode: "099",
        personStatus: "ปกติ",
        physicalStatus: "ปกติ",

        cgdNumber: "",
        positionNumber: "",
        positionStatus: "1",
        personTypeCode: "",
        positionCode: "",

        updateDate: "",
        foreignCode: "",
        statusIdcard: "",
        id: ""
      },

      dialogMsg: {
        title: "",
        message: "",
        type: "",
        show: false
      }
    };
  },

  computed: {
    ...mapGetters({
      systemConfig: "config/getSystemConfig"
    })
  },

  created() {   
  },

  mounted() {
     console.log("MANPOWER ADD");
    // this.getPersonel();
    this.setAcademicYear();
    this.setSemester();    
    
    this.form.academicYear = this.systemConfig.academicYear;
    this.form.semester = this.systemConfig.semester;
    this.form.areaCode = this.$store.state.account.user.areaCode;
    this.form.personTypeCode = this.personTypeCode;
  },

  watch: {
    actionConfirm: function() {
      // this.getPersonel();
    }
  },

  methods: {
    // ดึงข้อมูลคอนฟิกระบบ
    ...mapActions("config", ["setAcademicYear", "setSemester"]),

    //บันทึกข้อมูล
    onSubmit() {
      console.log("Inserted");

      // positionForm.birthdate = moment(positionForm.birthdate).format("YYYYMMDD");
      this.form.updateDate = moment().format("YYYYMMDD");
      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "update";

      // console.log(this.form)

      manpowerService.insert(this.form).then(
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
    },

    //ปุ่มปิด Dialog
    onOk(value) {
      this.dialogMsg = {
        title: "",
        message: "",
        type: "primary",
        show: false
      }
      this.$router.replace(`/area/manpower/${this.personTypeCode}`)
    },

    //ตรวจสอบเลขประจำตัวประชาชน
    handleCheckPersonId() {
      let value = this.form.personId;
      if (value) {
        teacherService
          .getById(value)
          .then(response => {
            let [personel] = response;
            let isPass = true;
            if (personel) {
              this.dialogMsg = {
                title: `กรุณาตรวจสอบอีกครั้ง`,
                message: `เลขบัตรประชาชน ${value} มีในระบบแล้ว`,
                type: "error",
                show: true
              };
              this.form.personId = "";
              console.log(`เลขบัตรประชาชน ${value} มีในระบบแล้ว`);
              console.log(personel);
              isPass = false;
            } else {
              this.dialogMsg = {
                title: `ผ่านการตรวจสอบ`,
                message: `เลขบัตรประชาชน ${value} ผ่าน`,
                type: "primary",
                show: true
              };
              console.log(`เลขบัตรประชาชน ${value} ผ่าน`);
              isPass = false;
            }
            return isPass;
          })
          .catch(error => {
            this.dialogMsg = {
              title: `เกิดข้อผิดพลาด !`,
              message: `${error}`,
              type: "error",
              show: true
            };

            this.form.personId = "";
            console.log(error);
            return false;
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
