<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="fieldsData"
      :items="items"
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
      <template v-slot:[`item.personId`]="{ item }">
        <div @click="showItem(item)">{{ item.personId }}</div>
      </template>
      <template v-slot:[`item.fullname`]="{ item }">
        <div @click="showItem(item)">{{ item.fullname }}</div>
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
            >
              mdi-delete
            </v-icon>
          </template>
          <span>ลบข้อมูล</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  name: "person-data-table",
  props: ["items","infoSelected"],

  data() {
    return {
      title: "นำเข้าข้อมูลจาก cgd",
      fields: [],
      // infoSelected: 1,

      item: "",
      selected: [],
      search: "",
      items_per_page: [10, 20, 50, 100, -1],
      fieldsData: [
        { value: "id", text: "ลำดับ", sortable: true },
        // { value: "ministryCode", text: "รหัสกระทรวง", sortable: true, class: "text-center" },
        // { value: "ministryName", text: "ชื่อหน่วยงานระดับกระทรวง", sortable: true, },
        // { value: "belongCode", text: "รหัสกรม", sortable: true, class: "text-center" },
        // { value: "belongName", text: "ชื่อหน่วยงานระดับกรม", sortable: true, },
        // { value: "areaTypeCode", text: "รหัสสก./สภ.", sortable: true, class: "text-center" },
        // { value: "areaTypeName", text: "ชื่อหน่วยงานระดับสก./สภ.", sortable: true, },
        // { value: "areaCode", text: "รหัสสำนัก/กอง", sortable: true, class: "text-center" },
        // { value: "areaName", text: "ชื่อหน่วยงานระดับสำนัก/กอง", sortable: true, },
        // { value: "schoolId", text: "รหัสโรงเรียน", sortable: true, class: "text-center" },
        { value: "schoolName", text: "โรงเรียน", sortable: true },
        // { value: "budgetYear", text: "ปีงบประมาณ", sortable: true, class: "text-center" },
        {
          value: "positionNumber",
          text: "เลขที่ประจำตำแหน่ง",
          sortable: true,
          class: "text-center"
        },
        {
          value: "personId",
          text: "เลขประจำตัวประชาชน",
          sortable: true,
          class: "text-center"
        },
        // { value: "prefixCode", text: "รหัสคำนำหน้าชื่อ", sortable: true, class: "text-center" },
        { value: "fullname", text: "ชื่อ-สกุล", sortable: true },
        // { value: "prefixTitle", text: "คำนำหน้าชื่อ", sortable: true, },
        // { value: "firstName", text: "ชื่อ", sortable: true, },
        // { value: "lastName", text: "นามสกุล", sortable: true, },
        // { value: "positionCode", text: "รหัสตำแหน่งในสายงาน", sortable: true, class: "text-center" },
        { value: "positionName", text: "ตำแหน่ง", sortable: true },
        // { value: "positionCategoryCode", text: "รหัสสายบริหาร", sortable: true, class: "text-center" },
        { value: "positionCategoryTitle", text: "วิทยฐานะ", sortable: true },
        // { value: "personType", text: "รหัสประเภทสังกัด", sortable: true, class: "text-center" },
        // { value: "oriPosition", text: "อันดับเดิม", sortable: true, class: "text-center" },
        // { value: "oriOrderLevel", text: "ขั้นเดิม", sortable: true, class: "text-center" },
        // { value: "oriSalary", text: "เงินเดือนเดิม", sortable: true, class: "text-center" },
        // { value: "oriSalaryRef", text: "เงินอาศัยเบิกเดิม", sortable: true, class: "text-center" },
        // { value: "oriSalaryExtend", text: "เงินประจำวิทยฐานะเดิมลำดับที่1", sortable: true, class: "text-center" },
        {
          value: "currentPosition",
          text: "อันดับ",
          sortable: true,
          class: "text-center"
        },
        // { value: "currentOrderLevel", text: "ขั้น", sortable: true, class: "text-center" },
        {
          value: "currentSalary",
          text: "เงินเดือน",
          sortable: true,
          class: "text-center"
        },
        // { value: "currentSalaryRef", text: "เงินอาศัยเบิก", sortable: true, class: "text-center" },
        {
          value: "currentSalaryExtend",
          text: "เงินประจำวิทยฐานะลำดับที่1",
          sortable: true,
          class: "text-center"
        }
        // { value: "provinceName", text: "ชื่อรหัสจังหวัด", sortable: true, class: "text-center" },
        // { value: "teacherType", text: "รหัสประเภทข้าราชการ", sortable: true, class: "text-center" },
      ],

      fieldsInfo: [
        { value: "id", text: "ลำดับ", sortable: true },
        {
          value: "personId",
          text: "เลขประจำตัวประชาชน",
          sortable: true,
          class: "text-center"
        },
        // { value: "prefixCode", text: "รหัสคำนำหน้าชื่อ", sortable: true, class: "text-center" },
        { value: "fullname", text: "ชื่อ-สกุล", sortable: true },
        // { value: "prefixTitle", text: "คำนำหน้าชื่อ", sortable: true, },
        // { value: "firstName", text: "ชื่อ", sortable: true, },
        // { value: "lastName", text: "นามสกุล", sortable: true, },
        {
          value: "birthDate",
          text: "วันเดือนปีเกิด",
          sortable: true,
          class: "text-center"
        },
        {
          value: "startCommandDate",
          text: "วันสั่งบรรจุ",
          sortable: true,
          class: "text-center"
        },
        {
          value: "startWorkingDate",
          text: "วันเริ่มปฏิบัติราชการ",
          sortable: true,
          class: "text-center"
        },
        {
          value: "gpfStatus",
          text: "การเป็นสมาชิก กบข.",
          sortable: true,
          class: "text-center"
        },
        {
          value: "gpfDate",
          text: "วันเข้าเป็นสมาชิก",
          sortable: true,
          class: "text-center"
        },
        {
          value: "gpfCollect",
          text: "การสะสม",
          sortable: true,
          class: "text-center"
        }
        // { value: "gpfCollectPercent", text: "จำนวน % อัตราการสะสม", sortable: true, class: "text-center" },
        // { value: "gpfCollectDate", text: "วันสะสมเข้าเป็นสมาชิก กบข.", sortable: true, class: "text-center" },
        // { value: "gpfCollectDateAdd", text: "วันสะสมส่วนเพิ่ม", sortable: true, class: "text-center" },
        // { value: "gpfCollectStatus", text: "การสะสมส่วนเพิ่ม", sortable: true, class: "text-center" },
        // { value: "gpfCollectPercent", text: "จำนวน % อัตราการการสะสมส่วนเพิ่ม", sortable: true, class: "text-center" },
      ],
      
    };
  },

  computed: {
  },

  methods: {
    initialize () {},    
  },
  mounted() {
    console.log("MOUNTED TABLE")
    if (this.infoSelected == "1") {
      this.fields = this.fieldsInfo;
    }
    else if(this.infoSelected == "2") {
      this.fields = this.fieldsData;
    }
  },

  updated() {
    console.log("UPDATE TABLE")
    if (this.infoSelected == "1") {
      this.fields = this.fieldsInfo;
    }
    else if(this.infoSelected == "2") {
      this.fields = this.fieldsData;
    }
  },
};
</script>