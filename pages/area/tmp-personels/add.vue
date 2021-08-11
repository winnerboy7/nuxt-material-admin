<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>

        <personel-form
          :title="title"
          :form.sync="form"
          :readonly="readonly"
          @updateForm="onSubmit"
          @handleCheckPersonId="handleCheckPersonId"
        ></personel-form>

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
import { personelService } from "@/_services/personel.service";
import moment from "moment";
import Dialog from "@/components/Dialog";
import Swal from "sweetalert2";
import PersonelForm from '@/forms/personelForm'

export default {
  layout: "area",
  middleware: "authorize-area",  
  name: "AddPersonel",

  components: {
    Dialog,
    PersonelForm,
  },

  asyncData({ params }) {
    // called every time before loading the component
    return {
      areaCode: params.areaCode
    };
  },

  data() {
    return {
      //ตัวแปรที่ใช้งาน
      title: "เพิ่มข้อมูลบุคลากรในสำนักงานเขตพื้นที่การศึกษา",
      personel: [],
      readonly: false,
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

        academicYear: new Date().getFullYear() + 543,
        semester: "",
        areaCode: "",
        passportNumber: "",
        passportStartDate: "",
        passportEndDate: "",
        personTypeCode: "10",
        positionCode: "10000",
        academicStandingCode: "99",
        personelQualificationCode: "",
        personelCertificateCode: "",
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

  mounted() {
    console.log("MOUNTED PERSONEL");    
    if (this.areaCode) {
      this.form.areaCode = this.areaCode;
      console.log(`areaCode : ${this.areaCode}`)
    }    
  },

  watch: {},
  
  created() {
    console.log("CREATED PERSONEL");
    //this.getPersonel();
    this.setAcademicYear();
    this.setSemester();
    this.form.academicYear = this.systemConfig.academicYear;
    this.form.semester = this.systemConfig.semester;
    // console.log(this.form)
  },

  methods: {
    // ดึงข้อมูลคอนฟิกระบบ
    ...mapActions("config", ["setAcademicYear", "setSemester"]),

    //บันทึกข้อมูล
    onSubmit() {
     console.log("ADDED PERSONEL");
      if (this.handleCheckPersonId()) {
        this.form.birthdate = moment(this.form.birthdate).format("YYYYMMDD");
        this.form.passportStartDate = this.form.passportStartDate.length > 0
            ? moment(this.form.passportStartDate).format("YYYYMMDD")
            : "00000000";
        this.form.passportEndDate = this.form.passportEndDate.length > 0
            ? moment(this.form.passportEndDate).format("YYYYMMDD")
            : "00000000";
            
        this.form.updateDate = moment().format("YYYYMMDD");
        let d = new Date().getTime();
        this.actionConfirm = this.action + d;
        this.action = "update";

        // console.log(this.form)

        personelService.insert(this.form).then(
          (response) => {
            this.dialogMsg = {
              title: "เยี่ยมมาก",
              message: "บันทึกข้อมูลสำเร็จ",
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
    
    //ตรวจสอบเลขประจำตัวประชาชน
    handleCheckPersonId() {
      let value = this.form.personId;
      if (value) {
        personelService.getById(value).then(response => {
          let [personel] = response;
          let isPass = true;
          if(personel) {
            this.dialogMsg = {
              title: `กรุณาตรวจสอบอีกครั้ง`,
              message: `เลขบัตรประชาชน ${value} มีในระบบแล้ว`,
              type: "error",
              show: true,
            };
            this.form.personId = "";
            console.log(`เลขบัตรประชาชน ${value} มีในระบบแล้ว`);
            console.log(personel);
            isPass = false;
          }
          else {
            this.dialogMsg = {
              title: `ผ่านการตรวจสอบ`,
              message: `เลขบัตรประชาชน ${value} ผ่าน`,
              type: "primary",
              show: true,
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
            show: true,
          };
          
          this.form.personId = "";
          console.log(error)
          return false;
        })        
      }      
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
