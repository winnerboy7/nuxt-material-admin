<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>
        <teacher-form
          :title="title"
          :form.sync="form"
          :teacherEdu.sync="teacherEdu"
          :readonly="readonly"
          @updateForm="onSubmit"
          @insertEdu="insertEdu"
          @updateEdu="updateEdu"
          @deleteEdu="deleteEdu"
          @handleCheckPersonId="handleCheckPersonId"
          v-if="personTypeCode === '10'"
        ></teacher-form>

        <personel-form
          :title="title"
          :form.sync="form"
          :teacherEdu.sync="teacherEdu"
          :readonly="readonly"
          @updateForm="onSubmit"
          @insertEdu="insertEdu"
          @updateEdu="updateEdu"
          @deleteEdu="deleteEdu"
          @handleCheckPersonId="handleCheckPersonId"
          v-if="personTypeCode === '11' || personTypeCode === '38'"
        ></personel-form>

        <goverment-form
          :title="title"
          :form.sync="form"
          :teacherEdu.sync="teacherEdu"
          :readonly="readonly"
          @updateForm="onSubmit"
          @insertEdu="insertEdu"
          @updateEdu="updateEdu"
          @deleteEdu="deleteEdu"
          @handleCheckPersonId="handleCheckPersonId"
          v-if="personTypeCode === '23'"
        ></goverment-form>

        <permanent-form
          :title="title"
          :form.sync="form"
          :teacherEdu.sync="teacherEdu"
          :readonly="readonly"
          @updateForm="onSubmit"
          @insertEdu="insertEdu"
          @updateEdu="updateEdu"
          @deleteEdu="deleteEdu"
          @handleCheckPersonId="handleCheckPersonId"
          v-if="personTypeCode === '15'"
        ></permanent-form>

        <temporary-form
          :title="title"
          :form.sync="form"
          :teacherEdu.sync="teacherEdu"
          :readonly="readonly"
          @updateForm="onSubmit"
          @insertEdu="insertEdu"
          @updateEdu="updateEdu"
          @deleteEdu="deleteEdu"
          @handleCheckPersonId="handleCheckPersonId"
          v-if="personTypeCode === '17'"
        ></temporary-form>

        <v-dialog v-model="dialogInfo" width="500" hide-overlay scrollable>
          <education-form
            :title="formTitle"
            :formEdu.sync="formEdu"
            :action.sync="action"
            @onUpdate="onUpdate"
            @onInsert="onInsert"
            @closeInfo="closeInfo"
          ></education-form>
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
              <v-btn color="blue darken-1" text @click="closeDelete"
                >ยกเลิก</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >ลบข้อมูล</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <Dialog
          :title="dialogMsg.title"
          :message="dialogMsg.message"
          :type="dialogMsg.type"
          :show="dialogMsg.show"
          @onOk="onOk"
        ></Dialog>

        <!-- <pre> {{ teacher }} </pre> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { teacherService } from "@/_services/teacher.service";
import moment from "moment";
import Dialog from "@/components/Dialog";
// import Swal from "sweetalert2"
import TeacherForm from "@/forms/teacherForm";
import PersonelForm from "@/forms/personelForm";
import GovermentForm from "@/forms/govermentForm";
import PermanentForm from "@/forms/permanentForm";
import TemporaryForm from "@/forms/temporaryForm";
import EducationForm from "@/forms/educationForm";

export default {
  layout: "area",
  middleware: "authorize-area",
  name: "EditTeacher",

  components: {
    Dialog,
    TeacherForm,
    PersonelForm,
    GovermentForm,
    PermanentForm,
    TemporaryForm,
    EducationForm
  },

  asyncData({ params }) {
    // called every time before loading the component
    return {
      personId: params.id,
      personTypeCode: params.personTypeCode
    };
  },

  data() {
    return {
      //ตัวแปรที่ใช้งาน
      title: "แก้ไขข้อมูลครูและบุคลากรทางการศึกษา",
      formTitle: "",
      teacher: [],
      readonly: true,

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
        endDate: "",
        retireDate: "",
        proCurrentDate: "",
        currentDepartmentDate: "",

        movementType: "",
        physicalStatus: "",
        outReason: "",
        contractNo: "",
        contractNum: "",
        salaryFirst: "",
        salarySeptember: "",
        salaryCurrent: "",
        salaryAdd: "",
        socialInsurance: "",
        compensationFund: "",
        riskPremium: "",
        salaryPercent: "",
        scoreKPI: "",
        scoreCompetency: "",

        budgetPlan: "",
        contractType: "",
        contractYear: "",
        salaryType: "",

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
        currentProvinceID: ""
      },

      teacherEdu: [],
      formEdu: {
        personId: "",
        educationLevelCode: "",
        educationLevelName: "",
        degreeCode: "",
        degreeName: "",
        otherDegree: "",
        majorCode: "",
        majorName: "",
        otherMajor: "",
        programCode: "",
        programName: "",
        otherProgram: "",
        schoolId: ""
      },
      defaultEdu: {
        personId: "",
        educationLevelCode: "",
        educationLevelName: "",
        degreeCode: "",
        degreeName: "",
        otherDegree: "",
        majorCode: "",
        majorName: "",
        otherMajor: "",
        programCode: "",
        programName: "",
        otherProgram: "",
        schoolId: ""
      },

      action: "",
      actionConfirm: "Start",
      eduItem: {},

      dialogInfo: false,
      dialogDelete: false,
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
    this.getTeacher();
    this.getTeacherEdu();
    this.setAcademicYear();
    this.setSemester();

    this.defaultEdu.personId = this.personId;
  },

  mounted() {},

  watch: {
    actionConfirm: function() {
      this.getTeacher();
    }
  },

  methods: {
    // ดึงข้อมูลคอนฟิกระบบ
    ...mapActions("config", ["setAcademicYear", "setSemester"]),

    // ดึงข้อมูลครู
    async getTeacher() {
      // console.log("GET TEACHER");
      try {
        await teacherService.getById(this.personId).then(response => {
          [this.teacher] = response;
          this.title = `แก้ไขข้อมูล ${this.personId}`;
        });

        // console.log(this.teacher)

        for (let key in this.form) {
          this.form[key] = this.teacher[key];
        }
        this.form.addProvinceID = this.teacher.addSubdistrictName
          ? this.teacher.addSubdistrictName.province_id
          : "";
        this.form.addDistrictID = this.teacher.addSubdistrictName
          ? this.teacher.addSubdistrictName.district_id
          : "";
        this.form.currentProvinceID = this.teacher.subdistrictName
          ? this.teacher.subdistrictName.province_id
          : "";
        this.form.currentDistrictID = this.teacher.subdistrictName
          ? this.teacher.subdistrictName.district_id
          : "";

        this.form.academicYear = this.systemConfig.academicYear;
        this.form.semester = this.systemConfig.semester;

        this.form.birthdate = this.formatDate(this.form.birthdate);
        this.form.passportStartDate = this.formatDate(
          this.form.passportStartDate
        );
        this.form.passportEndDate = this.formatDate(this.form.passportEndDate);
        // this.form.licenseStartDate = this.formatDate(this.form.licenseStartDate);
        this.form.licenseExpiredDate = this.formatDate(
          this.form.licenseExpiredDate
        );

        // this.form.startDate = this.formatDate(this.form.startDate);
        // this.form.beginDate = this.formatDate(this.form.beginDate);
        // this.form.retireDate = this.formatDate(this.form.retireDate);
        // this.form.proCurrentDate = this.formatDate(this.form.proCurrentDate);
        // this.form.currentDepartmentDate = this.formatDate(this.form.currentDepartmentDate);
        // this.form.dateAcademics = this.formatDate(this.form.dateAcademics);
        // this.form.assistanceDateStart = this.formatDate(this.form.assistanceDateStart);
        // this.form.assistanceDateEnd = this.formatDate(this.form.assistanceDateEnd);
        // this.form.addDateDuty = this.formatDate(this.form.addDateDuty);
        // this.form.gpfDate = this.formatDate(this.form.gpfDate);

        this.form.updateDate = moment().format("YYYYMMDD");
      } catch (error) {
        console.log(error);
      }
    },

    //ดึงข้อมูลการศึกษา
    getTeacherEdu() {
      teacherService.getTeacherEdu(this.personId).then(response => {
        this.teacherEdu = response;
      });
    },

    //บันทึกข้อมูล
    onSubmit() {
      console.log("Updated");
      console.log(this.form);

      // this.form.birthdate = moment(this.form.birthdate).format("YYYYMMDD");
      // this.form.passportStartDate = this.form.passportStartDate.length > 0
      //     ? moment(this.form.passportStartDate).format("YYYYMMDD")
      //     : "00000000";
      // this.form.passportEndDate = this.form.passportEndDate.length > 0
      //     ? moment(this.form.passportEndDate).format("YYYYMMDD")
      //     : "00000000";
      // this.form.licenseStartDate = this.form.licenseStartDate.length > 0
      //     ? moment(this.form.licenseStartDate).format("YYYYMMDD")
      //     : "00000000";
      // this.form.licenseExpiredDate = this.form.licenseExpiredDate.length > 0
      //     ? moment(this.form.licenseExpiredDate).format("YYYYMMDD")
      //     : "00000000";
      // this.form.startDate = this.form.startDate.length > 0
      //     ? moment(this.form.startDate).format("YYYYMMDD")
      //     : "00000000";
      // this.form.beginDate = this.form.beginDate.length > 0
      //     ? moment(this.form.beginDate).format("YYYYMMDD")
      //     : "00000000";
      // this.form.retireDate = this.form.retireDate.length > 0
      //     ? moment(this.form.retireDate).format("YYYYMMDD")
      //     : "00000000";
      // this.form.proCurrentDate = this.form.proCurrentDate.length > 0
      //     ? moment(this.form.proCurrentDate).format("YYYYMMDD")
      //     : "00000000";
      // this.form.currentDepartmentDate = this.form.currentDepartmentDate.length > 0
      //     ? moment(this.form.currentDepartmentDate).format("YYYYMMDD")
      //     : "00000000";
      // this.form.dateAcademics = this.form.dateAcademics.length > 0
      //     ? moment(this.form.dateAcademics).format("YYYYMMDD")
      //     : "00000000";
      // this.form.assistanceDateStart = this.form.assistanceDateStart.length > 0
      //     ? moment(this.form.assistanceDateStart).format("YYYYMMDD")
      //     : "00000000";
      // this.form.assistanceDateEnd = this.form.assistanceDateEnd.length > 0
      //     ? moment(this.form.assistanceDateEnd).format("YYYYMMDD")
      //     : "00000000";
      // this.form.addDateDuty = this.form.addDateDuty.length > 0
      //     ? moment(this.form.addDateDuty).format("YYYYMMDD")
      //     : "00000000";
      // this.form.gpfDate = this.form.gpfDate.length > 0
      //     ? moment(this.form.gpfDate).format("YYYYMMDD")
      //     : "00000000";

      this.form.updateDate = moment().format("YYYYMMDD");
      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "update";

      // console.log(this.form)

      teacherService.update(this.form).then(
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
    },

    //จัดรูปแบบวันที่ให้เป็น 1990-09-18 จาก 19900918 (YYYYMMDD)
    formatDate(ymd) {
      if (ymd.length == 8 && ymd != "" && ymd != "00000000") {
        this.yyyy = ymd.substring(0, 4);
        this.mm = ymd.substr(4, 2);
        this.dd = ymd.substr(6, 2);
        return this.yyyy + "-" + this.mm + "-" + this.dd;
      } else if (ymd.length == 10) {
        return ymd;
      } else {
        return "";
      }
    },

    //ปุ่มปิด Dialog
    onOk(value) {
      // this.$router.replace(`/area/personels/${this.personTypeCode}`)

      this.dialogMsg = {
        title: "",
        message: "",
        type: "primary",
        show: false
      };
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
    },

    // addItem() {
    //   this.formTitle = `บันทึกข้อมูล`;
    //   this.formEdu = Object.assign({}, this.defaultEdu);
    //   this.state = "";
    //   this.action = "add";
    // },

    insertEdu() {
      console.log(`Insert EDU`);
      this.formTitle = `บันทึกข้อมูลการศึกษา`;
      this.formEdu = Object.assign({}, this.defaultEdu);
      this.action = "add";
      this.dialogInfo = true;
    },

    updateEdu(item) {
      console.log(`Emit Update EDU ${item._id}`);
      this.formTitle = `แก้ไขข้อมูลการศึกษา`;
      for (let key in item) {
        this.formEdu[key] = item[key];
      }
      this.action = "update";
      this.dialogInfo = true;
    },

    deleteEdu(item) {
      console.log(`Delete EDU ${item._id}`);
      this.formTitle = `ยืนยันการลบข้อมูล: ${item.otherMajor} หรือไม่?`;
      this.eduItem = item;
      this.dialogDelete = true;
      this.deleteConfirm = "";
      this.action = "delete";
    },

    deleteItemConfirm() {
      console.log("Delete : " + this.eduItem._id);
      teacherService.deleteTeacherEdu(this.eduItem._id);

      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "";

      this.getTeacherEdu();
      this.closeDelete();
    },

    onInsert() {
      console.log(`Emit onInsert`);
      this.getTeacherEdu();
      this.closeInfo();
    },

    onUpdate() {
      console.log(`Emit OnUpdate`);
      this.getTeacherEdu();
      this.closeInfo();
    },

    onOk(value) {
      this.dialogMsg = {
        title: "",
        message: "",
        type: "primary",
        show: false
      };
    },
    closeInfo() {
      this.dialogInfo = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    }
  }
};
</script>

<style scoped></style>
