<template>  
  <v-card class="mt-3">
    <v-toolbar flat color="info" dark dense>
      <v-toolbar-title><v-icon>mdi-tag</v-icon> ข้อมูลบุคลากรในสังกัด</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-format-list-bulleted-type
        </v-icon>
        ข้อมูลบุคคล
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-format-list-bulleted-type
        </v-icon>
        การช่วยราชการ
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-format-list-bulleted-type
        </v-icon>
        การปฏิบัติหน้าที่เพิ่มเติม
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-format-list-bulleted-type
        </v-icon>
        เงินเดือน
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-map-marker
        </v-icon>
        ที่อยู่ทะเบียนบ้าน
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-map-marker
        </v-icon>
        ที่อยู่ปัจจุบัน
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-format-list-bulleted-type
        </v-icon>
        ใบประกอบวิชาชีพ
      </v-tab>  
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-list dense>

              <dl class="row">
                <dt class="col-sm-4">ชื่อ-สกุล :</dt>
                <dd class="col-sm-8">
                  {{ form.fullname }}
                </dd>

                <dt class="col-sm-4">หมายเลขบัตรประชาชน :</dt>
                <dd class="col-sm-8">
                  {{ form.personId }}
                </dd>

                <dt class="col-sm-4">เพศ :</dt>
                <dd class="col-sm-8">
                  {{ form.genderName.title }}
                </dd>

                <dt class="col-sm-4">สัญชาติ :</dt>
                <dd class="col-sm-8">
                  {{ form.nationalityName.title }}
                </dd>

                <dt class="col-sm-4">วันเกิด :</dt>
                <dd class="col-sm-8">
                  {{ fotmatDateThai(form.birthdate) }}
                </dd>

                <dt class="col-sm-4">ที่อยู่ :</dt>
                <dd class="col-sm-8">
                  {{
                    form.currentHouseNumber +
                      " หมู่ " +
                      form.currentVillageNumber +
                      " " +
                      form.currentSubdistrictCode
                  }}
                </dd>
              </dl>

              <!-- <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ชื่อ-สกุล</v-list-item-title>
                  <v-list-item-subtitle>{{ form.fullname}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>หมายเลขบัตรประชาชน</v-list-item-title>
                  <v-list-item-subtitle>{{ form.personId}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>เพศ</v-list-item-title>
                  <v-list-item-subtitle>{{ form.genderName.title }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>สัญชาติ</v-list-item-title>
                  <v-list-item-subtitle> {{ form.nationalityName.title }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>วันเกิด</v-list-item-title>
                  <v-list-item-subtitle> {{ fotmatDateThai(form.birthdate) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ที่อยู่</v-list-item-title>
                  <v-list-item-subtitle>
                    เลขที่ {{ currentHouseNumber }} หมู่ {{ currentVillageNumber }} ตำบล{{ form.currentSubdistrictCode }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item> -->

            </v-list>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-list dense>
              
              <dl class="row">
                <dt class="col-sm-4">สังกัด :</dt>
                <dd class="col-sm-8">
                  {{ form.areaName }} ({{ form.areaCode }})
                </dd>

                <dt class="col-sm-4">โรงเรียน :</dt>
                <dd class="col-sm-8">
                  {{ form.schName }} ({{ form.schId }})
                </dd>

                <dt class="col-sm-4">ประเภทบุคลากร :</dt>
                <dd class="col-sm-8">
                  {{ form.personType.title }}
                </dd>

                <dt class="col-sm-4">ตำแหน่ง :</dt>
                <dd class="col-sm-8">
                  {{ form.positionName.title }}
                </dd>

                <dt class="col-sm-4">วิทยฐานะ :</dt>
                <dd class="col-sm-8">
                  {{ form.academicStandingName.title }}
                </dd>

                <dt class="col-sm-4">กลุ่มสาระการเรียนรู้ :</dt>
                <dd class="col-sm-8">
                  {{ form.teachSubjectName.title }}
                </dd>
              </dl>
              
              <!-- <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>สังกัด</v-list-item-title>
                  <v-list-item-subtitle>{{ form.areaName }} ({{ form.areaCode }})</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>โรงเรียน</v-list-item-title>
                  <v-list-item-subtitle>{{ form.schName }} ({{ form.schId }})</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ประเภทบุคลากร</v-list-item-title>
                  <v-list-item-subtitle>{{ form.personType.title }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ตำแหน่ง</v-list-item-title>
                  <v-list-item-subtitle>{{ form.positionName.title }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>วิทยฐานะ</v-list-item-title>
                  <v-list-item-subtitle>{{ form.academicStandingName.title }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>กลุ่มสาระการเรียนรู้</v-list-item-title>
                  <v-list-item-subtitle>{{ form.teachSubjectName.title }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item> -->

            </v-list>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { standardcodeService } from "@/_services/standardcode.service";
import { schoolService } from "@/_services/school.service";
import moment from "moment";

export default {
  name: 'teacherView',

  components: {
  },
  
  props: {
    title: String,
    form: {
      required: true,
    },
  },

  data: () => ({
    disabled: true,
    
    menuStartDate: false,
    menuExpireDate: false,
    menuBirthday: false,
    menuLicenseExpiredDate: false,

    optionsSchools: [],
    optionsPrefix: [],
    optionsGender: [],
    optionsNationality: [],
    optionsSubdistrict: [],
    optionsProvince: [],
    optionsDistrict: [],
    optionsPersonTypeCode: [],
    optionsPositionCode: [],
    optionsTeachAcademicLevelCode: [],
    optionsTeachSubjectCode: [],
    optionsAcademicStandingCode: [],
    optionsSemester: [{id:"1", title: "ภาคเรียนที่ 1"},{id:"2", title: "ภาคเรียนที่ 2"}],
  }),

  computed: {
    ...mapState({
      account: state => state.account
    }), 
  },

  mounted() {    
    console.log("TEACHER");
    // this.getTeacher();

    this.getSchools();
    this.getPrefix();
    this.getGender();
    this.getNationality();
    this.getPersonTypeCode();
    this.getPositionCode();
    this.getTeachAcademicLevelCode();
    this.getTeachSubjectCode();
    this.getAcademicStandingCode();
    this.getProvince();
    this.getDistrict();
    this.getSubdistrict();
  },

  created() {
  },

  watch: {
  },

  methods: {
    //ดึงโรงเรียน
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
    getTeachAcademicLevelCode() {
      standardcodeService.getTeachAcademicLevelCode().then(response => {
        this.optionsTeachAcademicLevelCode = response;
      });
    },

    //ดึงข้อมูลกลุ่มสาระฯ
    getTeachSubjectCode() {
      standardcodeService.getTeachSubjectCode().then(response => {
        this.optionsTeachSubjectCode = response;
      });
    },

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

    //คำนวณวันที่แสดงใน Modals จากรูปแบบ 19900918 (YYYYMMDD)
    fotmatDateThai(datehbd) {
      this.yyyy = datehbd.substring(0, 4);
      this.mm = datehbd.substr(4, 2);
      this.dd = datehbd.substr(6, 2);

      var datehbdRe =
        this.dd + "/" + this.mm + "/" + (parseInt(this.yyyy) + 543);
      var diffAge = this.yyyy + "-" + this.mm;

      var a = moment();
      var b = moment(diffAge, "YYYY-MM");
      var age = moment.duration(a.diff(b));
      var years = age.years();
      var months = age.months();

      return (
        datehbdRe + " (ปัจจุบันอายุ " + years + " ปี " + months + " เดือน)"
      );
    },
  },
}
</script>

<style scoped>
  .v-tab {
    justify-content: left;
  }
</style>