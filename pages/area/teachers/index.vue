<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>
        <!-- {{ selectedIndex }} -->

        <v-card class="mb-4">
          <v-toolbar color="primary darken-1" dark flat dense cad>
            <v-toolbar-title class="subheading"><v-icon>mdi-tag</v-icon>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog
              v-model="dialogInfo"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title><v-icon>mdi-tag</v-icon> {{ formTitle }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn icon text @click="dialogInfo = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>

                <v-card-text>
                  <v-card class="mt-3">
                    <v-toolbar flat color="info" dark dense>
                      <v-toolbar-title><v-icon>mdi-tag</v-icon> ข้อมูลโรงเรียนในสังกัด</v-toolbar-title>
                    </v-toolbar>
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
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>รหัส สพฐ.</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.schId}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <!-- <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>รหัส SMIS</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.smis_code}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item> -->

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ชื่อโรงเรียน</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.schName}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <!-- <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ประเภท</v-list-item-title>
                                  <v-list-item-subtitle> {{ schoolType(form.school_type) }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ประเภทพิเศษ</v-list-item-title>
                                  <v-list-item-subtitle> {{ schoolSpecial(form.school_type_special) }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ตำแหน่งที่ตั้ง</v-list-item-title>
                                  <v-list-item-subtitle> {{ schoolPosition(form.school_position) }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ที่อยู่</v-list-item-title>
                                  <v-list-item-subtitle>
                                    ตำบล{{ form.subdistrict + " อำเภอ" + form.district + " จังหวัด" + form.province }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item> -->

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ประเภทสถานศึกษา</v-list-item-title>
                                  <v-list-item-subtitle>{{schoolType(form.typeSch)}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>ที่อยู่</v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{ "เลขที่ " + selectedItem.addnum + " หมู่ " + selectedItem.moo+ "  ตำบล" + selectedItem.subdistrict + " อำเภอ" + selectedItem.district + " จังหวัด" + selectedItem.province + " รหัสไปรษณีย์ " + selectedItem.postCode }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                            </v-list>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>

                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>เปิดระดับการศึกษาชั้นต่ำสุด</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.minClassLevel}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>เปิดระดับการศึกษาชั้นสูงสุด</v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.maxClassLevel}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>พิกัด GPS </v-list-item-title>
                                  <v-list-item-subtitle>{{ selectedItem.latitude + ", " + selectedItem.longitude }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <!-- <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>จำนวนห้อง</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.sumRoom }} ห้อง</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>

                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>จำนวนนักเรียน</v-list-item-title>
                                  <v-list-item-subtitle>{{ form.sumStudents.toLocaleString() }} คน</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item> -->

                            </v-list>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs>
                  </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
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

            <v-chip
              class="ma-2"
              color="pink"
              text-color="white"
            >
              {{ schools.length }}
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>
          
          <v-data-table
            v-model="selected"
            :headers="fields"
            :items="schools"
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
            <template v-slot:[`item.schId`]="{ item }">
              <div @click="showItem(item)">{{item.schId}}</div>
            </template>
            <template v-slot:[`item.schName`]="{ item }">
              <div @click="showItem(item)">{{item.schName}}</div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    @click="viewTeachers(item.schId)"
                  >
                    mdi-account-search
                  </v-icon>
                </template>
                <span>ข้อมูลครูและบุคลากรทางการศึกษา</span>
              </v-tooltip>
               <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    @click="addTeacher(item.schId)"
                  >
                    mdi-account-multiple-plus
                  </v-icon>
                </template>
                <span>เพิ่มครูและบุคลากรทางการศึกษา</span>
              </v-tooltip>
            </template>
            <template v-slot:no-data>
              <v-btn
                color="primary"
                @click="initialize"
              >
                Reset
              </v-btn>
            </template>
          </v-data-table>

          <!-- <pre>{{ selected }}</pre> -->
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { schoolService } from "@/_services/school.service";
import { standardcodeService } from "@/_services/standardcode.service";
import moment from "moment";
import Dialog from "@/components/Dialog";

export default {
  layout: "area",
  middleware: "authorize-area",  
  name: "ListTeachers",

  components: {
    Dialog,
  },

  data() {
    return {
      title: `ข้อมูลสถานศึกษาในสังกัด ${this.$store.state.account.user.areaName}`,
      formTitle: "",
      areaName: this.$store.state.account.user.areaName,

      schools: [],
      optionsAreas: [],
      optionsSchoolType: [],
      optionsSchoolSpecial: [],
      optionsSchoolPosition: [],
      disabled: true,

      dialogInfo: false,

      item: "",
      selected: [],
      search: "",
      items_per_page: [10, 20, 50, 100, -1],

      selectedIndex: -1,
      selectedItem: [],

      fields: [
        {
          value: "id",
          text: "ที่",
          sortable: true,
        },
        {
          value: "schId",
          text: "รหัส",
          sortable: true
        },
        {
          value: "schName",
          text: "ชื่อโรงเรียน",
          sortable: true,
          // tdClass: "styleName"
        },
        {
          value: "actions",
          text: "ดำเนินการ"
        }
      ],

      form: {
        schId: "",
        smis_code: "",
        schName: "",
        typeSch: "",
        region: "",
        areaCode: "",
        areaName: "",
        subdistrict: "",
        district: "",
        province: "",
        maxClassLevel: "",
        sumRoom: "",
        sumStudents: "",
        latitude: "",
        longitude: "",
        // quality_tambon :false,
        // partnership_school: false,
        // royal_school: "",
        // extend_school: false,
        // sub_school: false,
        school_type: "",
        school_position: "",
        school_type_special: "",
      },

      defaultItem: {
        schId: "",
        smis_code: "",
        schName: "",
        typeSch: "",
        region: "",
        areaCode: "",
        areaName: "",
        subdistrict: "",
        district: "",
        province: "",
        maxClassLevel: "",
        sumRoom: "",
        sumStudents: "",
        latitude: "",
        longitude: "",
        // quality_tambon :false,
        // partnership_school: false,
        // royal_school: "",
        // extend_school: false,
        // sub_school: false,
        school_type: "",
        school_position: "",
        school_type_special: "",
      },

      action: "",
      actionConfirm: "",
      state: "readonly",
      // readonly: true,
      // disabled: false,
      dialogMsg: {
        title: "",
        message: "",
        type: "",
        show: false,
      },      
    };
  },

  computed: {
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    },
  },

  mounted() {
  },

  created() {
    console.log("SCHOOL");
    this.getSchools();
    this.getSchoolType();
    this.getSchoolSpecial();
    this.getSchoolPosition();
  },

  methods: {
    async getSchools() {
      try {
        this.schools = await schoolService.getByArea(
          this.$store.state.account.user.areaCode
        );
        this.totalRows = this.schools.length;

        var temp = this.schools;
        var autoNumber = 1;
        for (var x in temp) {
          temp[x]["id"] = autoNumber;
          autoNumber = autoNumber + 1;
        }
        this.schools = temp;
      } catch (error) {
        console.log(error);
      }
    },

    //ดึงข้อมูลประเภทสถานศึกษา
    getSchoolType() {
      standardcodeService.getSchoolType().then(response => {
        this.optionsSchoolType = response;
      });
    },

    //ดึงข้อมูลประเภทสถานศึกษาพิเศษ
    getSchoolSpecial() {
      standardcodeService.getSchoolSpecial().then(response => {
        this.optionsSchoolSpecial = response;
      });
    },

    //ดึงข้อมูลที่ตั้งสถานศึกษา
    getSchoolPosition() {
      standardcodeService.getSchoolPosition().then(response => {
        this.optionsSchoolPosition = response;
      });
    },

    initialize () {},

    viewTeachers(schId) {
      this.$router.push(`/area/teachers/${schId}`);
    },

    addTeacher(schId) {
      this.$router.push(`/area/teachers/${schId}/add`);
    },

    showItem(item) {
      this.formTitle = `ข้อมูล: ${item.schName} : (${item.schId})`;
      this.selectedIndex = this.schools.indexOf(item);
      this.selectedItem = Object.assign({}, item);      
      //this.selectedItem = JSON.stringify(item, null, 2);
      for (let key in this.form) {
        this.form[key] = item[key];
      }

      this.dialogInfo = true;
    },

    closeInfo () {
      this.dialogInfo = false
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem)
        this.selectedIndex = -1
      })
    },

    onOk(value) {
      this.dialogMsg = {
        title: "",
        message: "",
        type: "primary",
        show: false,
      };
    },
    schoolType(value) {
      if (value) {        
        return this.optionsSchoolType.filter(item => { return item.id.match(value) })[0].title
      }
    },
    schoolSpecial(value) {
      if (value) {        
        return this.optionsSchoolSpecial.filter(item => { return item.id.match(value) })[0].title
      }
    },
    schoolPosition(value) {
      if (value) {        
        return this.optionsSchoolPosition.filter(item => { return item.id.match(value) })[0].title
      }
    },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    }

  },

  computed: {
    rows() {
      return this.schools.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.card-title {
  margin-bottom: 0rem;
}
.text-header {
  margin-top: 40px;
}
span .page-link {
  line-height: normal;
}
.btn-prev {
  margin-bottom: -6px;
  margin-top: -4px;
}
.text-detail-teacher p {
  margin-bottom: 0px;
}
.btn-addPer {
  margin-top: -32px;
}
.styleName {
  max-width: 300px;
}

</style>
