<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Main row -->
        <div class="row">
          <!-- left column -->
          <div class="col-md-12">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <small>ช่องที่เครื่องหมายดอกจัน (*) ไม่สามารถว่างได้</small>
                </h3>
                <button
                  @click="loadPagePrev()"
                  class="btn btn-info float-right btn-sm btn-prev"
                >
                  <i class="fas fa-arrow-left"></i> ย้อนกลับ
                </button>
              </div>
              <!-- /.card-header -->
              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <b-form @submit.stop.prevent="handleSubmit(onSubmit)" @reset="onReset" autocomplete="off">
                <div class="card-body">
                  <div>
                    <h4>{{ title }}</h4>
                    <!-- <pre>{{personel}}</pre> -->
                    <hr />
                    <b-row>
                      <b-col md="8" offset-md="2" class="my-1">
                        <b-row>
                          <b-col md="12" class="my-1">
                            <ValidationProvider
                              name="เลขบัตรประชาชน"
                              :rules="{ required: true, digits:13 }"
                              v-slot="validationContext"
                            >
                              <b-form-group id="personId-group" label="เลขบัตรประชาชน *" label-for="personId">
                                <b-form-input
                                  placeholder="xxxxxxxxxxxxx"
                                  :readonly="readonly"
                                  type="number"
                                  id="personId"
                                  v-model.lazy="personId"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="personId-live-feedback"
                                ></b-form-input>
                                <b-form-invalid-feedback id="personId-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="12" class="my-1">
                            <b-form-group
                              id="l-passportNumber"
                              label="หมายเลข Passport"
                              label-for="passportNumber"
                            >
                              <b-form-input
                                id="passportNumber"
                                name="passportNumber"
                                v-model="form.passportNumber"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="6" class="my-1">
                            <b-form-group
                              id="l-passportStartDate"
                              label="วันทำ Passport"
                              label-for="passportStartDate"
                            >
                              <b-form-datepicker
                                label-help="คลิกลูกศรด้านบนเพื่อเลือกเดือนและปี"
                                label-no-date-selected="เลือกวันทำ Passport"
                                id="passportStartDate"
                                name="passportStartDate"
                                v-model="form.passportStartDate"
                              ></b-form-datepicker>
                            </b-form-group>
                          </b-col>

                          <b-col md="6" class="my-1">
                            <b-form-group
                              id="l-passportEndDate"
                              label="วันหมดอายุ Passport"
                              label-for="passportEndDate"
                            >
                              <b-form-datepicker
                                label-help="คลิกลูกศรด้านบนเพื่อเลือกเดือนและปี"
                                label-no-date-selected="เลือกวันหมดอายุ Passport"
                                id="passportEndDate"
                                v-model="form.passportEndDate"
                              ></b-form-datepicker>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="คำนำหน้า"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="prefixCode-group" label="คำนำหน้า *" label-for="prefixCode">
                                <b-form-select
                                  id="prefixCode"
                                  v-model="form.prefixCode"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="prefixCode-live-feedback"
                                >
                                  <b-form-select-option :value="null" disabled
                                    >-- กรุณาเลือก --</b-form-select-option
                                  >
                                  <b-form-select-option
                                    v-for="prefix in optionsPrefix"
                                    :key="prefix.id"
                                    :value="prefix.id"                                    
                                    >{{ prefix.title }}</b-form-select-option
                                  >
                                </b-form-select>
                                <b-form-invalid-feedback id="prefixCode-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="ชื่อ"
                              :rules="{ required: true, min: 2 }"
                              v-slot="validationContext"
                            >
                              <b-form-group id="firstName-group" label="ชื่อ *" label-for="firstName">                                  
                                <b-form-input
                                  id="firstName"
                                  name="firstName"
                                  v-model="form.firstName"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="firstName-live-feedback"
                                ></b-form-input>
                                <b-form-invalid-feedback id="firstName-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="นามสกุล"
                              :rules="{ required: true, min: 2 }"
                              v-slot="validationContext"
                            >
                              <b-form-group id="lastName-group" label="นามสกุล *" label-for="lastName">                                  
                                <b-form-input
                                  id="lastName"
                                  name="lastName"
                                  v-model="form.lastName"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="lastName-live-feedback"
                                ></b-form-input>
                                <b-form-invalid-feedback id="lastName-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="6" class="my-1">
                            <ValidationProvider
                              name="วันเกิด"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="birthdate-group" label="วันเกิด *" label-for="birthdate">
                                <b-form-datepicker
                                  label-help="คลิกลูกศรด้านบนเพื่อเลือกเดือนและปี"
                                  label-no-date-selected="เลือกวันเกิด"
                                  id="birthdate"
                                  name="birthdate"
                                  locale="th"
                                  v-model="form.birthdate"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="birthdate-live-feedback"
                                ></b-form-datepicker>
                                <b-form-invalid-feedback id="birthdate-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="3" class="my-1">
                            <ValidationProvider
                              name="เพศ"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="genderCode-group" label="เพศ *" label-for="genderCode">
                                <b-form-select
                                  id="genderCode"
                                  v-model="form.genderCode"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="genderCode-live-feedback"
                                >
                                  <b-form-select-option :value="null" disabled
                                    >-- กรุณาเลือก --</b-form-select-option
                                  >
                                  <b-form-select-option
                                    v-for="gender in optionsGender"
                                    :key="gender.id"
                                    :value="gender.id"                                    
                                    >{{ gender.title }}</b-form-select-option
                                  >
                                </b-form-select>
                                <b-form-invalid-feedback id="genderCode-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="3" class="my-1">
                            <ValidationProvider
                              name="สัญชาติ"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="nationalityCode-group" label="สัญชาติ *" label-for="nationalityCode">
                                <b-form-select
                                  id="nationalityCode"
                                  v-model="form.nationalityCode"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="nationalityCode-live-feedback"
                                >
                                  <b-form-select-option :value="null" disabled
                                    >-- กรุณาเลือก --</b-form-select-option
                                  >
                                  <b-form-select-option
                                    v-for="nationality in optionsNationality"
                                    :key="nationality.id"
                                    :value="nationality.id"                                    
                                    >{{ nationality.title }}</b-form-select-option
                                  >
                                </b-form-select>
                                <b-form-invalid-feedback id="nationalityCode-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="รหัสทะเบียนบ้าน"
                              :rules="{ required: false}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="currentHouseId-group" label="รหัสทะเบียนบ้าน *" label-for="currentHouseId">
                                <b-form-input
                                  placeholder="รหัสทะเบียนบ้าน"
                                  type="number"
                                  id="currentHouseId"
                                  v-model="form.currentHouseId"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="currentHouseId-live-feedback"
                                ></b-form-input>
                                <b-form-invalid-feedback id="currentHouseId-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>                                
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="บ้านเลขที่"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="currentHouseNumber-group" label="บ้านเลขที่ *" label-for="currentHouseNumber">
                                <b-form-input
                                  placeholder="บ้านเลขที่"
                                  id="currentHouseNumber"
                                  v-model="form.currentHouseNumber"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="currentHouseNumber-live-feedback"
                                ></b-form-input>
                                <b-form-invalid-feedback id="currentHouseNumber-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>                                
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="หมู่ที่"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="currentVillageNumber-group" label="หมู่ที่ *" label-for="currentVillageNumber">
                                <b-form-input
                                  placeholder="รหัสทะเบียนบ้าน"
                                  type="number"
                                  id="currentVillageNumber"
                                  v-model="form.currentVillageNumber"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="currentVillageNumber-live-feedback"
                                ></b-form-input>
                                <b-form-invalid-feedback id="currentVillageNumber-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>                                
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="4" class="my-1">
                            <b-form-group
                              id="l-currentTrok"
                              label="ตรอก"
                              label-for="currentTrok"
                            >
                              <b-form-input
                                id="currentTrok"
                                v-model="form.currentTrok"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <b-form-group
                              id="l-currentSoi"
                              label="ซอย"
                              label-for="currentSoi"
                            >
                              <b-form-input
                                id="currentSoi"
                                v-model="form.currentSoi"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <b-form-group
                              id="l-currentStreet"
                              label="ถนน"
                              label-for="currentStreet"
                            >
                              <b-form-input
                                id="currentStreet"
                                v-model="form.currentStreet"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="จังหวัด"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="province_id-group" label="จังหวัด *" label-for="province_id">
                                <b-form-select
                                  id="province_id"
                                  @change="getDistrict"
                                  v-model="province_id"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="province_id-live-feedback"
                                >
                                  <b-form-select-option :value="null" disabled
                                    >-- กรุณาเลือก --</b-form-select-option
                                  >
                                  <b-form-select-option
                                    v-for="province in optionsProvince"
                                    :key="province.id"
                                    :value="province.id"
                                    >{{ province.province }}</b-form-select-option
                                  >
                                </b-form-select>
                                <b-form-invalid-feedback id="province_id-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="อำเภอ/เขต"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="district_id-group" label="อำเภอ/เขต *" label-for="district_id">
                                <b-form-select
                                  id="district_id"
                                  @change="getSubdistrict"
                                  v-model="district_id"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="district_id-live-feedback"
                                >
                                  <b-form-select-option :value="null" disabled
                                    >-- กรุณาเลือก --</b-form-select-option
                                  >
                                  <b-form-select-option
                                    v-for="district in optionsDistrict"
                                    :key="district.id"
                                    :value="district.id"
                                    >{{ district.district }}</b-form-select-option
                                  >
                                </b-form-select>
                                <b-form-invalid-feedback id="district_id-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="ตำบล/แขวง"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="currentSubdistrictCode-group" label="ตำบล/แขวง *" label-for="currentSubdistrictCode">
                                <b-form-select
                                  id="currentSubdistrictCode"
                                  v-model="form.currentSubdistrictCode"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="currentSubdistrictCode-live-feedback"
                                >
                                  <b-form-select-option :value="null" disabled
                                    >-- กรุณาเลือก --</b-form-select-option
                                  >
                                  <b-form-select-option
                                    v-for="subdistrict in optionsSubdistrict"
                                    :key="subdistrict.id"
                                    :value="subdistrict.id"
                                    >{{ subdistrict.sub_district }}</b-form-select-option
                                  >
                                </b-form-select>
                                <b-form-invalid-feedback id="currentSubdistrictCode-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <br />
                    <br />
                    <h4>ข้อมูลการทำงาน</h4>
                    <hr />
                    <b-row>
                      <b-col md="8" offset-md="2" class="my-1">
                        <b-row>
                          <b-col md="3" class="my-1">
                            <b-form-group
                              id="l-semester"
                              label="ภาคเรียนที่"
                              label-for="semester"
                            >
                              <b-form-select
                                id="semester"
                                v-model="form.semester"
                              >
                                <b-form-select-option :value="null"
                                  >-- ไม่ระบุ --</b-form-select-option
                                >
                                <b-form-select-option :value="1"
                                  >ภาคเรียนที่ 1</b-form-select-option
                                >
                                <b-form-select-option :value="2"
                                  >ภาคเรียนที่ 2</b-form-select-option
                                >
                              </b-form-select>
                            </b-form-group>
                          </b-col>

                          <b-col md="3" class="my-1">
                            <b-form-group
                              id="l-academicYear"
                              label="ปีการศึกษา"
                              label-for="academicYear"
                            >
                              <b-form-input
                                type="number"
                                id="academicYear"
                                v-model="form.academicYear"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="ประเภท"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="personTypeCode-group" label="ประเภท *" label-for="personTypeCode">
                                <b-form-select
                                  id="personTypeCode"
                                  v-model="form.personTypeCode"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="personTypeCode-live-feedback"
                                >
                                  <b-form-select-option :value="null" disabled
                                    >-- กรุณาเลือก --</b-form-select-option
                                  >
                                  <b-form-select-option
                                    v-for="personTypeCode in optionsPersonTypeCode"
                                    :key="personTypeCode.id"
                                    :value="personTypeCode.id"
                                    >{{ personTypeCode.title }}</b-form-select-option
                                  >
                                </b-form-select>
                                <b-form-invalid-feedback id="personTypeCode-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="ตำแหน่ง"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="positionCode-group" label="ตำแหน่ง *" label-for="positionCode">
                                <b-form-select
                                  id="positionCode"
                                  v-model="form.positionCode"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="positionCode-live-feedback"
                                >
                                  <b-form-select-option :value="null" disabled
                                    >-- กรุณาเลือก --</b-form-select-option
                                  >
                                  <b-form-select-option
                                    v-for="positionCode in optionsPositionCode"
                                    :key="positionCode.id"
                                    :value="positionCode.id"
                                    >{{ positionCode.title }}</b-form-select-option
                                  >
                                </b-form-select>
                                <b-form-invalid-feedback id="positionCode-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>

                          <b-col md="4" class="my-1">
                            <ValidationProvider
                              name="วิทยฐานะ"
                              :rules="{ required: true}"
                              v-slot="validationContext"
                            >
                              <b-form-group id="academicStandingCode-group" label="วิทยฐานะ *" label-for="academicStandingCode">
                                <b-form-select
                                  id="academicStandingCode"
                                  v-model="form.academicStandingCode"
                                  :state="getValidationState(validationContext)"
                                  aria-describedby="academicStandingCode-live-feedback"
                                >
                                  <b-form-select-option :value="null" disabled
                                    >-- กรุณาเลือก --</b-form-select-option
                                  >
                                  <b-form-select-option
                                    v-for="academicStandingCode in optionsAcademicStandingCode"
                                    :key="academicStandingCode.id"
                                    :value="academicStandingCode.id"
                                    >{{ academicStandingCode.title }}</b-form-select-option
                                  >
                                </b-form-select>
                                <b-form-invalid-feedback id="academicStandingCode-live-feedback">{{
                                  validationContext.errors[0]
                                }}</b-form-invalid-feedback>
                              </b-form-group>
                            </ValidationProvider>
                          </b-col>
                        </b-row>
                        
                      </b-col>
                    </b-row>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <div class="btn-control">
                    <b-button type="submit" variant="primary">
                      <i class="far fa-save"></i> บันทึก
                    </b-button>
                    <b-button type="reset" variant="warning">
                      <i class="fas fa-sync-alt"></i> ยกเลิก
                    </b-button>
                  </div>
                  <!-- <pre>{{form}}</pre> -->
                </div>
              </b-form>
              </ValidationObserver>
            </div>
            <!-- /.card -->
          </div>
          <!-- /.Left col -->
        </div>
        <!-- /.row (main row) -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->

  
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapState, mapActions } from "vuex";
import { standardcodeService } from "@/_services/standardcode.service";
import { personelService } from "@/_services/personel.service";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import th from "vee-validate/dist/locale/th.json";
import * as rules from "vee-validate/dist/rules";

export default {
  //layout: "admin",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  middleware: "authorize-admin",
  name: "EditTeacher",

  asyncData({ params }) {
    // called every time before loading the component
    return {
      personId: params.id
    };
  },

  data() {
    return {
      //ตัวแปรที่ใช้งาน
      title: "แก้ไขข้อมูลครู",
      personel: [],
      readonly: false,
      disabled: false,
      action: "",
      actionConfirm: "",

      optionsSchools: [],
      optionsPrefix: [],
      optionsGender: [],
      optionsNationality: [],
      optionsSubdistrict: [],
      optionsProvince: [],
      optionsDistrict: [],
      optionsPersonTypeCode: [],
      optionsPositionCode: [],
      optionsAcademicStandingCode: [],

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
        areaCode: "",
        passportNumber: "",
        passportStartDate: "",
        passportEndDate: "",
        personTypeCode: "",
        positionCode: "",
        academicStandingCode: "",
        personelQualificationCode: "",
        personelCertificateCode: "",
        updateDate: "",
        foreignCode: "",
        statusIdcard: "",
        id: ""
      },

      district_id: "",
      province_id: "",
      idCardStatus: null,
    };
  },
  computed: {
    ...mapState({
      account: state => state.account
    }),
    
  },

  mounted() {},

  watch: {
    //ตรวจสอบหมายเลขบัตรประชาชน
    personId: function(value) {
      if (value.length === 13) {
        this.getPersonel();
      }
    },

    actionConfirm: function() {
      this.getPersonel();
    },

    province_id: function() {
      this.getDistrict();
    },

    district_id: function() {
      this.getSubdistrict();
    }
  },
  
  created() {
    console.log("PERSONEL");
    this.getPersonel();
    this.getPrefix();
    this.getGender();
    this.getNationality();
    this.getPersonTypeCode();
    this.getPositionCode();
    this.getAcademicStandingCode();
    this.getProvince();
    this.getDistrict();
    this.getSubdistrict();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  methods: {
    // ดึงข้อมูลครู
    async getPersonel() {
      console.log("GET PERSONEL");
      try {
        await personelService.getById(this.personId).then(response => {
          [this.personel] = response;
          this.province_id = this.personel.subdistrictName.province_id;
          this.district_id = this.personel.subdistrictName.district_id;
          this.title =
            "แก้ไขข้อมูล " +
            this.personel.prefixName.title +
            this.personel.firstName +
            " " +
            this.personel.lastName;
          this.readonly = true;
          this.disabled = true;
        });

        for (let key in this.form) {
          this.form[key] = this.personel[key];
        }

        this.form.birthdate = this.formatDate(this.form.birthdate);
        this.form.passportStartDate = this.formatDate(
          this.form.passportStartDate
        );
        this.form.passportEndDate = this.formatDate(this.form.passportEndDate);
        this.form.updateDate = moment().format("YYYYMMDD");
      } catch (error) {
        console.log(error);
      }
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

    //ดึงข้อมูลวิทยฐานะ
    getAcademicStandingCode() {
      standardcodeService.getAcademicStandingCode().then(response => {
        this.optionsAcademicStandingCode = response;
      });
    },

    //ดึงข้อมูลอำเภอ
    getDistrict() {
      standardcodeService.getDistrict(this.province_id).then(response => {
        this.optionsDistrict = response;
      });
    },

    //ดึงข้อมูลตำบล
    getSubdistrict() {
      standardcodeService.getSubdistrict(this.district_id).then(response => {
        this.optionsSubdistrict = response;
      });
    },

    getProvince() {
      standardcodeService.getProvince().then(response => {
        this.optionsProvince = response;
      });
    },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    onSubmit(evt) {
      console.log("Updated");

      this.form.birthdate = moment(this.form.birthdate).format("YYYYMMDD");
      this.form.passportStartDate =
        this.form.passportStartDate.length > 0
          ? moment(this.form.passportStartDate).format("YYYYMMDD")
          : "00000000";
      this.form.passportEndDate =
        this.form.passportEndDate.length > 0
          ? moment(this.form.passportEndDate).format("YYYYMMDD")
          : "00000000";
      this.form.updateDate = moment().format("YYYYMMDD");

      let d = new Date().getTime();
      this.actionConfirm = this.action + d;
      this.action = "update";

      personelService.update(this.form);
      this.action = "";

      this.$swal({
        icon: "success",
        title:'ผลการบันทึกข้อมูล',
        text: 'การแก้ไขข้อมูลได้ถูกบันทึกเข้าฐานข้อมูลแล้ว',
        button: 'รับทราบ'
      }).then(() => {
        //this.$router.push("/area/schools/");
        this.$router.go(-1);
      });
    },
    
    onReset(evt) {
      this.getPersonel();
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
    }
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
