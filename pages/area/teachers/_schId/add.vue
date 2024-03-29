<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>

        <teacher-form
          :title="title"
          :form.sync="form"
          :teacherEdu.sync="teacherEdu"
          :readonly="readonly"
          @insertEdu="onSubmit"
          @handleCheckPersonId="handleCheckPersonId"
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
  name: "AddTeacher",

  components: {
    Dialog,
    TeacherForm,
  },

  asyncData({ params }) {
    // called every time before loading the component
    return {
      schId: params.schId
    };
  },

  data() {
    return {
      //ตัวแปรที่ใช้งาน
      title: "บันทึกข้อมูลข้อมูลครูและบุคลากรทางการศึกษา",
      teacher: [],
      readonly: false,
      action: "",
      actionConfirm: "Start",

      teacherEdu: [],

      form: {
        academicYear: "",
        semester: "",
        schoolId: "",

        personId: "",
        prefixCode: "",
        firstName: "",
        middleName: "",
        lastName: "",
        prefixCodeEn: "",
        firstNameEn: "",
        middleNameEn: "",
        lastNameEn: "",

        genderCode: "",
        birthdate: "",

        startDate: "",
        beginDate: "",
        retireDate: "",
        proCurrentDate: "",
        currentDepartmentDate: "",

        telNumber: "",
        emailAddress: "",
        marryStatus: "",
        marry: "",

        personBlood: "",
        personStatus: "",

        schoolName2: "",
        schoolName3: "",
        assistanceDateStart: "",
        assistanceDateEnd: "",
        assistanceCommand: "",  

        addPosition: "",
        department: "",
        addDateDuty: "",
        addCommand: "",
        addComment: "",
       
        nationalityCode: "",
        personTypeCode: "",
        positionCode: "",

        academicStandingCode: "",
        dateAcademics: "",
        academicsSubject: "",

        teachAcademicLevelCode: "",
        teachSubjectCode: "",
        groupSubjectCode: "",
        
        teacherQualificationCode: "",
        teacherCertificateCode: "",

        licenseCertificate: "",
        licenseNumber: "",    
        licenseRenew: "",
        licenseStartDate: "",
        licenseExpiredDate: "",
        licenseCancel: "",

        addHouseId: "",
        addHouseNumber: "",
        addVillageNumber: "",
        addStreet: "",
        addSoi: "",
        addTrok: "",
        addSubdistrictCode: "",
        // addDistrict: "",
        // addProvince: "",

        currentHouseId: "",
        currentHouseNumber: "",
        currentVillageNumber: "",
        currentTrok: "",
        currentSoi: "",
        currentStreet: "",
        currentSubdistrictCode: "",

        // currentDistrict: "",
        // currentProvince: "",

        passportNumber: "",
        passportStartDate: "",
        passportEndDate: "",
                
        cgdNumber: "",
        positionNumber: "",
        positionStatus: "",
        budgetYear: "",  
        // positionCode: "",
        // positionName: "",
        positionCategoryCode: "",
        positionCategoryTitle: "",
        // personType: "",
        
        currentPosition: "",
        currentOrderLevel: "",
        currentSalary: "",
        currentSalaryRef: "",
        currentSalaryExtend: "",

        oriPosition: "",
        oriOrderLevel: "",
        oriSalary: "",
        oriSalaryRef: "",
        oriSalaryExtend: "",

        salaryAcademic: "",
        salaryCompensation: "",
        salaryEmoluments: "",
        
        gpfStatus: "",
        gpfDate: "",
        gpfCollect: "",
        gpfCollectPercent: "",
        gpfCollectDate: "",
        gpfCollectDateAdd: "",
        gpfCollectStatus: "",
        gpfCollectPercent: "",
        
        updateDate: "",
        foreignCode: "",
        statusIdcard: "",
        id: "",

        addDistrictID: "",
        addProvinceID: "",
        currentDistrictID: "",
        currentProvinceID: "",
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
    console.log("MOUNTED TEACHER");    
    if (this.schId) {
      this.form.schoolId = this.schId;
      console.log(`SchId : ${this.schId}`)
    }    
  },

  watch: {},
  
  created() {
    console.log("CREATED TEACHER");
    //this.getTeacher();
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
     console.log("ADDED TEACHER");
      if (this.handleCheckPersonId()) {
        this.form.birthdate = moment(this.form.birthdate).format("YYYYMMDD");
        this.form.passportStartDate = this.form.passportStartDate.length > 0
            ? moment(this.form.passportStartDate).format("YYYYMMDD")
            : "00000000";
        this.form.passportEndDate = this.form.passportEndDate.length > 0
            ? moment(this.form.passportEndDate).format("YYYYMMDD")
            : "00000000";
        this.form.licenseExpiredDate = this.form.licenseExpiredDate.length > 0
            ? moment(this.form.licenseExpiredDate).format("YYYYMMDD")
            : "00000000";
        this.form.updateDate = moment().format("YYYYMMDD");
        let d = new Date().getTime();
        this.actionConfirm = this.action + d;
        this.action = "update";

        // console.log(this.form)

        teacherService.insert(this.form).then(
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

    onUpdate() {
      console.log(`Emit OnUpdate`)
      // this.getTeacherEdu();
      this.closeInfo();
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
        teacherService.getById(value).then(response => {
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
