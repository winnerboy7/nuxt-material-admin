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
                  <v-toolbar-title
                    ><v-icon>mdi-tag</v-icon> {{ formTitle }}</v-toolbar-title
                  >
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
                      <v-toolbar-title
                        ><v-icon>mdi-tag</v-icon>
                        ข้อมูลบุคลากรในสังกัด</v-toolbar-title
                      >
                    </v-toolbar>
                    <v-tabs vertical>
                      <v-tab>
                        <v-icon left>
                          mdi-format-list-bulleted-type
                        </v-icon>
                        ข้อมูลส่วนตัว
                      </v-tab>
                      <v-tab>
                        <v-icon left>
                          mdi-map-marker
                        </v-icon>
                        ข้อมูลการทำงาน
                      </v-tab>

                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-list dense>
                              <!-- <dl class="row">
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
                              </dl> -->

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
                              <!-- <dl class="row">
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
                              </dl> -->

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
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions> </v-card-actions>
              </v-card>
            </v-dialog>

            <Dialog
              :title="dialogMsg.title"
              :message="dialogMsg.message"
              :type="dialogMsg.type"
              :show="dialogMsg.show"
              @onOk="onOk"
            ></Dialog>

            <v-chip class="ma-2" color="pink" text-color="white">
              <!-- {{ items.length }} -->
            </v-chip>
          </v-toolbar>

          <v-divider></v-divider>
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <v-form ref="form" @keyup.native.enter="handleSubmit(handleSearch)">
              <v-container fluid>
                <v-row>
                  <v-col cols="4">
                    <ValidationProvider
                      name="ค้นหา"
                      v-slot="{ errors }"
                      rules="required"
                    >
                      <v-text-field
                        v-model="filter"
                        append-icon="mdi-magnify"
                        :error-messages="errors"
                        label="ค้นหา"
                        single-line
                        hide-details
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      color="primary"
                      class="mr-4"
                      @click="handleSubmit(handleSearch)"
                    >
                      ค้นหา
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>

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

          <!-- <pre>{{ selected }}</pre> -->
        </v-card>

        <Dialog
          :title="dialogMsg.title"
          :message="dialogMsg.message"
          :type="dialogMsg.type"
          :show="dialogMsg.show"
          @onOk="onOk"
        ></Dialog>

        <!-- Main content -->
        <section class="content">
          <div class="container-fluid">
            <!-- Main row -->
            <div class="row">
              <!-- Left col -->
              <section class="col-lg-12 connectedSortable">
                <!-- Content -->
                <div class="card card-primary color-palette-box">
                  <div class="card-header">
                    <h3 class="card-title">{{ title }}</h3>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
                    <template>
                      <div>
                        <b-form-group
                          label="เลือกประเภทบุคคล:"
                          label-for="file-personTypes"
                          label-cols-sm="2"
                        >
                          <b-form-radio-group
                            id="input-personInfos"
                            v-model="typeSelected"
                            :options="personTypes"
                            class="mb-3"
                            value-field="item"
                            text-field="name"
                            disabled-field="notEnabled"
                          ></b-form-radio-group>
                          <!-- <div class="mt-3">ประเภทบุคคล: <strong>{{ typeSelected }}</strong></div> -->
                        </b-form-group>
                      </div>
                    </template>

                    <template>
                      <div>
                        <b-form-group
                          label="เลือกประเภทข้อมูล:"
                          label-for="file-personInfos"
                          label-cols-sm="2"
                        >
                          <b-form-select
                            id="input-personInfos"
                            v-model="infoSelected"
                            :options="personInfos"
                            class="mb-3"
                            value-field="item"
                            text-field="name"
                            disabled-field="notEnabled"
                          ></b-form-select>
                          <!-- <div class="mt-3">ข้อมูล: <strong>{{ infoSelected }}</strong></div> -->
                        </b-form-group>
                      </div>
                    </template>

                    <template>
                      <div v-if="currentFile" class="progress">
                        <div
                          class="progress-bar progress-bar-info progress-bar-striped"
                          role="progressbar"
                          :aria-valuenow="progress"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          :style="{ width: progress + '%' }"
                        >
                          {{ progress }}%
                        </div>
                      </div>

                      <div>
                        <b-form-group
                          label="เลือกไฟล์:"
                          label-for="file-input"
                          label-cols-sm="2"
                        >
                          <b-form-file
                            v-model="cgdFile"
                            accept=".txt"
                            ref="file"
                            id="file-input"
                            class="mb-2"
                            placeholder="เลือกไฟล์ หรือลากไฟล์มาวางที่นี่..."
                            drop-placeholder="ลากไฟล์มาวางที่นี่..."
                            @change="handleFileUpload()"
                          ></b-form-file>
                        </b-form-group>

                        <b-button :disabled="!cgdFile" @click="submitFile()"
                          >ตกลง</b-button
                        >

                        <p class="mt-2">
                          ไฟล์: <b>{{ cgdFile ? cgdFile.name : "" }}</b> :
                          <i>{{ message }}</i>
                        </p>
                      </div>

                      <!-- <div class="alert alert-light" role="alert">{{ message }}</div> -->

                      <!-- <PersonDataTable :items="items" :infoSelected="infoSelected" v-if="items.length"></PersonDataTable> -->

                      <!-- <pre>{{ content }}</pre> -->
                      <b-card
                        border-variant="primary"
                        header="รายการไฟล์ที่อัพโหลด"
                        header-bg-variant="primary"
                        header-text-variant="white"
                        align="left"
                      >
                        <b-card-text>
                          <ol>
                            <li v-for="(file, index) in fileInfos" :key="index">
                              <a :href="file.url">{{ file.name }}</a>
                            </li>
                          </ol>
                        </b-card-text>
                      </b-card>
                    </template>
                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer"></div>
                  <!-- /.card-footer-->
                </div>
                <!-- /.card -->
              </section>
              <!-- /.Left col -->
            </div>
            <!-- /.row (main row) -->
          </div>
          <!-- /.container-fluid -->
        </section>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import PersonDataTable from "~/components/PersonDataTable";
import UploadService from "@/_services/upload.service";
import { schoolService } from "@/_services/school.service";
import Dialog from "@/components/Dialog";
import * as axios from "axios";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import th from "vee-validate/dist/locale/th.json";
import * as rules from "vee-validate/dist/rules";

export default {
  layout: "area",
  middleware: "authorize-area",
  name: "ImportTeacher",

  components: {
    ValidationObserver,
    ValidationProvider,
    Dialog
  },

  data() {
    return {
      title: "นำเข้าข้อมูลจาก cgd",
      formTitle: "",

      dialogInfo: false,

      items: [],
      cgdFile: null,
      personTypes: [
        { item: 42, name: "ครูและบุคลากรทางการศึกษา" },
        { item: 43, name: "ผู้บริหาร สพท./สถานศึกษา" },
        { item: 45, name: "บุคลากรในสำนักงานเขตพื้นที่การศึกษา" },
        { item: 46, name: "ลูกจ้าง" }
      ],
      typeSelected: 42,
      personInfos: [
        { item: 1, name: "ข้อมูลทั่วไป" },
        { item: 2, name: "บุคคล" },
        { item: 3, name: "การศึกษา" },
        { item: 4, name: "ครอบครัว" },
        { item: 5, name: "ที่อยู่" }
      ],
      infoSelected: 1,

      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      content: {},
      fileInfos: [],

      fieldsData: [
        { key: "id", label: "ลำดับ", sortable: true },
        // { key: "ministryCode", label: "รหัสกระทรวง", sortable: true, class: "text-center" },
        // { key: "ministryName", label: "ชื่อหน่วยงานระดับกระทรวง", sortable: true, },
        // { key: "belongCode", label: "รหัสกรม", sortable: true, class: "text-center" },
        // { key: "belongName", label: "ชื่อหน่วยงานระดับกรม", sortable: true, },
        // { key: "areaTypeCode", label: "รหัสสก./สภ.", sortable: true, class: "text-center" },
        // { key: "areaTypeName", label: "ชื่อหน่วยงานระดับสก./สภ.", sortable: true, },
        // { key: "areaCode", label: "รหัสสำนัก/กอง", sortable: true, class: "text-center" },
        // { key: "areaName", label: "ชื่อหน่วยงานระดับสำนัก/กอง", sortable: true, },
        // { key: "schoolId", label: "รหัสโรงเรียน", sortable: true, class: "text-center" },
        { key: "schoolName", label: "โรงเรียน", sortable: true },
        // { key: "budgetYear", label: "ปีงบประมาณ", sortable: true, class: "text-center" },
        {
          key: "positionNumber",
          label: "เลขที่ประจำตำแหน่ง",
          sortable: true,
          class: "text-center"
        },
        {
          key: "personId",
          label: "เลขประจำตัวประชาชน",
          sortable: true,
          class: "text-center"
        },
        // { key: "prefixCode", label: "รหัสคำนำหน้าชื่อ", sortable: true, class: "text-center" },
        { key: "fullname", label: "ชื่อ-สกุล", sortable: true },
        // { key: "prefixTitle", label: "คำนำหน้าชื่อ", sortable: true, },
        // { key: "firstName", label: "ชื่อ", sortable: true, },
        // { key: "lastName", label: "นามสกุล", sortable: true, },
        // { key: "positionCode", label: "รหัสตำแหน่งในสายงาน", sortable: true, class: "text-center" },
        { key: "positionName", label: "ตำแหน่ง", sortable: true },
        // { key: "positionCategoryCode", label: "รหัสสายบริหาร", sortable: true, class: "text-center" },
        { key: "positionCategoryTitle", label: "วิทยฐานะ", sortable: true },
        // { key: "personType", label: "รหัสประเภทสังกัด", sortable: true, class: "text-center" },
        // { key: "oriPosition", label: "อันดับเดิม", sortable: true, class: "text-center" },
        // { key: "oriOrderLevel", label: "ขั้นเดิม", sortable: true, class: "text-center" },
        // { key: "oriSalary", label: "เงินเดือนเดิม", sortable: true, class: "text-center" },
        // { key: "oriSalaryRef", label: "เงินอาศัยเบิกเดิม", sortable: true, class: "text-center" },
        // { key: "oriSalaryExtend", label: "เงินประจำวิทยฐานะเดิมลำดับที่1", sortable: true, class: "text-center" },
        {
          key: "currentPosition",
          label: "อันดับ",
          sortable: true,
          class: "text-center"
        },
        // { key: "currentOrderLevel", label: "ขั้น", sortable: true, class: "text-center" },
        {
          key: "currentSalary",
          label: "เงินเดือน",
          sortable: true,
          class: "text-center"
        },
        // { key: "currentSalaryRef", label: "เงินอาศัยเบิก", sortable: true, class: "text-center" },
        {
          key: "currentSalaryExtend",
          label: "เงินประจำวิทยฐานะลำดับที่1",
          sortable: true,
          class: "text-center"
        }
        // { key: "provinceName", label: "ชื่อรหัสจังหวัด", sortable: true, class: "text-center" },
        // { key: "teacherType", label: "รหัสประเภทข้าราชการ", sortable: true, class: "text-center" },
      ],

      fieldsInfo: [
        { key: "id", label: "ลำดับ", sortable: true },
        {
          key: "personId",
          label: "เลขประจำตัวประชาชน",
          sortable: true,
          class: "text-center"
        },
        // { key: "prefixCode", label: "รหัสคำนำหน้าชื่อ", sortable: true, class: "text-center" },
        { key: "fullname", label: "ชื่อ-สกุล", sortable: true },
        // { key: "prefixTitle", label: "คำนำหน้าชื่อ", sortable: true, },
        // { key: "firstName", label: "ชื่อ", sortable: true, },
        // { key: "lastName", label: "นามสกุล", sortable: true, },
        {
          key: "birthDate",
          label: "วันเดือนปีเกิด",
          sortable: true,
          class: "text-center"
        },
        {
          key: "startCommandDate",
          label: "วันสั่งบรรจุ",
          sortable: true,
          class: "text-center"
        },
        {
          key: "startWorkingDate",
          label: "วันเริ่มปฏิบัติราชการ",
          sortable: true,
          class: "text-center"
        },
        {
          key: "gpfStatus",
          label: "การเป็นสมาชิก กบข.",
          sortable: true,
          class: "text-center"
        },
        {
          key: "gpfDate",
          label: "วันเข้าเป็นสมาชิก",
          sortable: true,
          class: "text-center"
        },
        {
          key: "gpfCollect",
          label: "การสะสม",
          sortable: true,
          class: "text-center"
        }
        // { key: "gpfCollectPercent", label: "จำนวน % อัตราการสะสม", sortable: true, class: "text-center" },
        // { key: "gpfCollectDate", label: "วันสะสมเข้าเป็นสมาชิก กบข.", sortable: true, class: "text-center" },
        // { key: "gpfCollectDateAdd", label: "วันสะสมส่วนเพิ่ม", sortable: true, class: "text-center" },
        // { key: "gpfCollectStatus", label: "การสะสมส่วนเพิ่ม", sortable: true, class: "text-center" },
        // { key: "gpfCollectPercent", label: "จำนวน % อัตราการการสะสมส่วนเพิ่ม", sortable: true, class: "text-center" },
      ],

      dialogMsg: {
        title: "",
        message: "",
        type: "",
        show: false
      }
    };
  },

  computed: {
    ...mapState({
      user: state => state.account.user
    }),
    formIcon() {
      return this.selectedIndex === -1 ? "mdi-tag-plus" : "mdi-pencil";
    }
  },

  methods: {
    submitFile() {
      this.progress = 0;
      // console.log(this.cgdFile)
      this.currentFile = this.cgdFile;
      const formInfo = {
        areaCode: this.user.areaCode,
        personType: this.typeSelected,
        personInfo: this.infoSelected
      };

      UploadService.upload(this.currentFile, formInfo, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then(response => {
          this.message = response.data.message;
          this.content = response.data.data.content;
          this.items = response.data.data.content;

          return UploadService.getFiles(this.user.areaCode);
        })
        .then(files => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });

      this.file = undefined;
    },

    handleFileUpload(event) {
      this.cgdFile = this.$refs.file.files;
      // console.log(this.$refs.file)
    },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    },

    closeInfo() {
      this.dialogInfo = false;
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem);
        this.selectedIndex = -1;
      });
    },

    onOk(value) {
      this.dialogMsg = {
        title: "",
        message: "",
        type: "primary",
        show: false
      };
    }
  },

  mounted() {
    UploadService.getFiles(this.user.areaCode).then(response => {
      this.fileInfos = response.data;
    });

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  }
};
</script>

<style></style>
