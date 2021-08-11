<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, handleSubmit, validate }">
    <v-form ref="form" @keyup.native.enter="handleSubmit(onSubmit)">
      <v-card class="mb-4">
        <v-toolbar color="primary darken-1" dark flat dense cad>
          <v-toolbar-title class="subheading"
            ><v-icon>mdi-tag</v-icon>{{ title }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>
          <v-tabs background-color="light-blue darken-3" dark vertical>
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
              ข้อมูลตำแหน่ง/วิทยฐานะ
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-format-list-bulleted-type
              </v-icon>
              เงินเดือน
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-format-list-bulleted-type
              </v-icon>
              ข้อมูล กบข.
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
            <!-- <v-tab>
              <v-icon left>
                mdi-format-list-bulleted-type
              </v-icon>
              ใบประกอบวิชาชีพ
            </v-tab> -->
            <v-tab>
              <v-icon left>
                mdi-format-list-bulleted-type
              </v-icon>
              การศึกษา
            </v-tab>
            <!-- <v-tab>
              <v-icon left>
                mdi-format-list-bulleted-type
              </v-icon>
              การสอน
            </v-tab> -->

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>ข้อมูลบุคคล</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <ValidationProvider
                          name="personTypeCode"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.personTypeCode"
                            :items="optionsPersonTypeCode"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="ประเภท"
                            data-vv-name="select-person-type"
                            required
                            dense
                            readonly
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        
                      </v-col>
                      <v-col cols="4">

                      </v-col>                        
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <ValidationProvider
                          name="personId"
                          v-slot="{ errors, valid }"
                          rules="required|max:13"
                        >
                          <v-text-field
                            v-model="form.personId"
                            :error-messages="errors"
                            :success="valid"
                            :readonly="readonly"
                            label="เลขบัตรประชาชน"
                            dense
                          ></v-text-field>
                        </ValidationProvider>

                        <v-btn
                          text
                          @click="handleCheckPersonId"
                          :disabled="disabled"
                          v-if="!readonly"
                        >
                          <v-icon>mdi-account-check</v-icon>
                          ตรวจสอบเลขประจำตัวประชาชน
                        </v-btn>
                      </v-col>

                      <v-col cols="4">
                        <ValidationProvider
                          name="nationalityCode"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.nationalityCode"
                            :items="optionsNationality"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="สัญชาติ"
                            data-vv-name="select-nationalityCode"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4"> </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <ValidationProvider
                          name="prefixCode"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.prefixCode"
                            :items="optionsPrefix"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="คำนำหน้า"
                            data-vv-name="select-prefix"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="firstName"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-text-field
                            v-model="form.firstName"
                            :error-messages="errors"
                            :success="valid"
                            label="ชื่อ"
                            dense
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="lastName"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-text-field
                            v-model="form.lastName"
                            :error-messages="errors"
                            :success="valid"
                            label="นามสกุล"
                            dense
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.prefixCodeEn"
                          :items="optionsPrefixEn"
                          label="คำนำหน้า (En)"
                          data-vv-name="select-prefix"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.firstNameEn"
                          label="ชื่อ (En)"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.lastNameEn"
                          label="นามสกุล (En)"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuBirthday"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.birthdate"
                              label="วันเกิด"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.birthdate"
                            locale="TH-th"
                            @input="menuBirthday = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuRetireDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.retireDate"
                              label="วันเกษียณ"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.retireDate"
                            locale="TH-th"
                            @input="menuRetireDate = false"
                          ></v-date-picker>
                        </v-menu>                        
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="genderCode"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.genderCode"
                            :items="optionsGender"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="เพศ"
                            data-vv-name="select-gender"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.telNumber"
                          label="เบอร์มือถือ"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.emailAddress"
                          label="E-mail"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.personBlood"
                          :items="optionsPersonBlood"
                          label="หมู่เลือด"
                          data-vv-name="select-blood"
                          dense
                        ></v-autocomplete>                        
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.marryStatus"
                          :items="optionsMarryStatus"
                          label="สถานภาพการแต่งงาน"
                          data-vv-name="select-maryy"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.marry"
                          label="คู่สมรส"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4"> 
                        <v-autocomplete
                          v-model="form.personStatus"
                          :items="optionsPersonStatus"
                          label="สถานะปฏิบัติราชการ"
                          data-vv-name="select-status"
                          dense
                        ></v-autocomplete>
                      </v-col>
                    </v-row>

                    <!-- <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.passportNumber"
                          label="หมายเลข Passport"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuPassportStartDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.passportStartDate"
                              label="วันทำ Passport"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.passportStartDate"
                            locale="TH-th"
                            @input="menuPassportStartDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuPassportExpireDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.passportEndDate"
                              label="วันหมดอายุ Passport"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.passportEndDate"
                            locale="TH-th"
                            @input="menuPassportExpireDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row> -->
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>ข้อมูลตำแหน่ง</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <ValidationProvider
                          name="โรงเรียน"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.schoolId"
                            :items="optionsSchools"
                            item-value="schId"
                            item-text="schName"
                            :error-messages="errors"
                            :success="valid"
                            label="โรงเรียน"
                            data-vv-name="select-school"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="positionCode"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.positionCode"
                            :items="optionsPositionCode"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="ตำแหน่ง"
                            data-vv-name="select-positionCode"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="positionStatus"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.positionStatus"
                            :items="optionsPositionStatus"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="สถานะตำแหน่ง"
                            data-vv-name="select-positionStatus"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.positionNumber"
                          label="เลขที่ตำแหน่ง"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.cgdNumber"
                          label="เลขที่ตำแหน่งจ่ายตรง*"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuStartDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.startDate"
                              label="วันบรรจุ"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.startDate"
                            locale="TH-th"
                            @input="menuStartDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuProCurrentDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.proCurrentDate"
                              label="วันดำรงตำแหน่งปัจจุบัน"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.proCurrentDate"
                            locale="TH-th"
                            @input="menuProCurrentDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuBeginDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.beginDate"
                              label="วันที่เริ่มปฏิบัติราชการ"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.beginDate"
                            locale="TH-th"
                            @input="menuBeginDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuCurrentDepartmentDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.currentDepartmentDate"
                              label="วันที่ดำรงตำแหน่งในหน่วยงาน/สถานศึกษาปัจจุบัน"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.currentDepartmentDate"
                            locale="TH-th"
                            @input="menuCurrentDepartmentDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4"> </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <ValidationProvider
                          name="academicStandingCode"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.academicStandingCode"
                            :items="optionsAcademicStandingCode"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="วิทยฐานะ"
                            data-vv-name="select-academicStandingCode"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuDateAcademics"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.dateAcademics"
                              label="ว/ด/ป ที่ได้วิทยฐานะ/เข้าสู่ระดับตำแหน่ง"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.dateAcademics"
                            locale="TH-th"
                            @input="menuDateAcademics = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.academicsSubject"
                          label="สาขาที่ยื่นขอวิทยฐานะ*"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>เงินเดือน</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="3">
                        <v-autocomplete
                          v-model="form.currentOrderLevel"
                          :items="optionsCurrentOrderLevel"
                          item-value="id"
                          item-text="title"
                          label="ระดับ/อันดับปัจจุบัน *"
                          data-vv-name="select-current-order-level"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.currentSalary"
                          label="เงินเดือนปัจจุบัน *"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.currentSalaryRef"
                          label="อาศัยเบิก"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.currentSalaryExtend"
                          label="ร้อยละปัจจุบัน"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="3">
                        <v-autocomplete
                          v-model="form.oriOrderLevel"
                          :items="optionsOriOrderLevel"
                          item-value="id"
                          item-text="title"
                          label="ระดับ/อันดับเดิม"
                          data-vv-name="select-order-level"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.oriSalary"
                          label="เงินเดือนเดิม "
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.oriSalaryRef"
                          label="อาศัยเบิกเดิม"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.oriSalaryExtend"
                          label="ร้อยละเดิม"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.salaryAcademic"
                          label="เงินวิทยฐานะ "
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.salaryCompensation"
                          label="เงินค่าตอบแทน"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.salaryEmoluments"
                          label="เงินประจำตำแหน่ง"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3"> </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>ข้อมูล กบข.</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="3">
                        <v-autocomplete
                          v-model="form.gpfStatus"
                          :items="optionsGpfStatus"
                          item-value="id"
                          item-text="title"
                          label="สมาชิก กบข."
                          data-vv-name="select-gpf-status"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="3">
                        <v-menu
                          v-model="menuGpfDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.gpfDate"
                              label="วันที่เข้าเป็นสมาชิก กบข."
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.gpfDate"
                            locale="TH-th"
                            @input="menuGpfDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="3">
                        <v-autocomplete
                          v-model="form.gpfCollect"
                          :items="optionsGpfCollect"
                          item-value="id"
                          item-text="title"
                          label="การสะสม"
                          data-vv-name="select-gpf-collect"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="form.gpfCollectPercent"
                          label="%อัตราการสะสม"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>การช่วยราชการ</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.schoolName2"
                          label="หน่วยงานไปช่วยราชการ"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuAssistanceDateStart"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.assistanceDateStart"
                              label="วดป. เริ่มไปช่วยราชการ"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.assistanceDateStart"
                            locale="TH-th"
                            @input="menuAssistanceDateStart = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.assistanceCommand"
                          label="คำสั่งการไปช่วยราชการ"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.schoolName3"
                          label="หน่วยงานไปช่วยราชการ (นอกสังกัด สพฐ.)"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuAssistanceDateEnd"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.assistanceDateEnd"
                              label="วดป. สิ้นสุดการไปช่วยราชการ"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.assistanceDateEnd"
                            locale="TH-th"
                            @input="menuAssistanceDateEnd = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.assistanceCommand"
                          label="คำสั่งการไปช่วยราชการ"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>การปฏิบัติหน้าที่เพิ่มเติม</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.addPosition"
                          :items="optionsAddPosition"
                          item-value="id"
                          item-text="title"
                          label="ตำแหน่งหน้าที่เพิ่มเติม"
                          data-vv-name="select-add-position"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuAddDateDuty"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.addDateDuty"
                              label="วดป.ที่เริ่มปฏิบัติหน้าที่เพิ่มเติม"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.addDateDuty"
                            locale="TH-th"
                            @input="menuAddDateDuty = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.addComment"
                          label="หมายเหตุ"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.department"
                          :items="optionsDepartment"
                          item-value="id"
                          item-text="title"
                          label="กลุ่มงาน/หมวด ที่ปฏิบัติหน้าที่เพิ่มเติม"
                          data-vv-name="select-department"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.addCommand"
                          label="คำสั่งให้ปฏิบัติหน้าที่เพิ่มเติม"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4"> </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>ที่อยู่ทะเบียนบ้าน</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.addHouseId"
                          label="รหัสทะเบียนบ้าน"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.addHouseNumber"
                          label="บ้านเลขที่"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.addVillageNumber"
                          label="หมู่ที่"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.addTrok"
                          label="ตรอก"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.addSoi"
                          label="ซอย"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.addStreet"
                          label="ถนน"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.addProvinceID"
                          v-on:change="getAddDistrict"
                          :items="optionsAddProvince"
                          item-value="id"
                          item-text="province"
                          label="จังหวัด"
                          data-vv-name="select-add-province"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.addDistrictID"
                          v-on:change="getAddSubdistrict"
                          :items="optionsAddDistrict"
                          item-value="id"
                          item-text="district"
                          label="อำเภอ/เขต"
                          data-vv-name="select-add-amphur"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.addSubdistrictCode"
                          :items="optionsAddSubdistrict"
                          item-value="id"
                          item-text="sub_district"
                          label="ตำบล/แขวง"
                          data-vv-name="select-add-tambon"
                          dense
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>ที่อยู่ปัจจุบัน</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentHouseId"
                          label="รหัสทะเบียนบ้าน"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentHouseNumber"
                          label="บ้านเลขที่"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentVillageNumber"
                          label="หมู่ที่"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentTrok"
                          label="ตรอก"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentSoi"
                          label="ซอย"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentStreet"
                          label="ถนน"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.currentProvinceID"
                          v-on:change="getCurrentDistrict"
                          :items="optionsCurrentProvince"
                          item-value="id"
                          item-text="province"
                          label="จังหวัด"
                          data-vv-name="select-cur-province"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.currentDistrictID"
                          v-on:change="getCurrentSubdistrict"
                          :items="optionsCurrentDistrict"
                          item-value="id"
                          item-text="district"
                          label="อำเภอ/เขต"
                          data-vv-name="select-cur-amphur"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.currentSubdistrictCode"
                          :items="optionsCurrentSubdistrict"
                          item-value="id"
                          item-text="sub_district"
                          label="ตำบล/แขวง"
                          data-vv-name="select-cur-tambon"
                          dense
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>ที่อยู่ปัจจุบัน</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentHouseId"
                          label="รหัสทะเบียนบ้าน"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="currentHouseNumber"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-text-field
                            v-model="form.currentHouseNumber"
                            :error-messages="errors"
                            :success="valid"
                            label="บ้านเลขที่"
                            dense
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentVillageNumber"
                          label="หมู่ที่"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentTrok"
                          label="ตรอก"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentSoi"
                          label="ซอย"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.currentStreet"
                          label="ถนน"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <ValidationProvider
                          name="currentProvinceID"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.currentProvinceID"
                            v-on:change="getCurrentDistrict"
                            :items="optionsCurrentProvince"
                            item-value="id"
                            item-text="province"
                            :error-messages="errors"
                            :success="valid"
                            label="จังหวัด"
                            data-vv-name="select-cur-province"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="currentDistrictID"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.currentDistrictID"
                            v-on:change="getCurrentSubdistrict"
                            :items="optionsCurrentDistrict"
                            item-value="id"
                            item-text="district"
                            :error-messages="errors"
                            :success="valid"
                            label="อำเภอ/เขต"
                            data-vv-name="select-cur-amphur"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="currentSubdistrictCode"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.currentSubdistrictCode"
                            :items="optionsCurrentSubdistrict"
                            item-value="id"
                            item-text="sub_district"
                            :error-messages="errors"
                            :success="valid"
                            label="ตำบล/แขวง"
                            data-vv-name="select-cur-tambon"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>ใบประกอบวิชาชีพ</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.teacherCertificateCode"
                          :items="optionsTeacherCertificateCode"
                          item-value="id"
                          item-text="title"
                          label="ใบอนุญาต"
                          data-vv-name="select-license"
                          dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.licenseNumber"
                          label="เลขที่ใบอนุญาต"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-autocomplete
                          v-model="form.licenseRenew"
                          :items="optionsLicenseRenew"
                          label="ต่ออายุแล้ว"
                          data-vv-name="select-licenserenew"
                          dense
                        ></v-autocomplete>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuLicenseStartDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.licenseStartDate"
                              label="วันเดือนปีที่ออกบัตร"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.licenseStartDate"
                            locale="TH-th"
                            @input="menuLicenseStartDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menuLicenseExpiredDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.licenseExpiredDate"
                              label="วันเดือนปีบัตรหมดอายุ"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.licenseExpiredDate"
                            locale="TH-th"
                            @input="menuLicenseExpiredDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="form.licenseCancel"
                          label="สาเหตุที่เพิกถอน"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item> -->

            <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>การศึกษา</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn color="purple darken-3" fab small @click="addEdu">
                    <v-icon>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <v-simple-table fixed-header height="300px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            ระดับการศึกษา
                          </th>
                          <th class="text-left">
                            วุฒิการศึกษา
                          </th>
                          <th class="text-left">
                            ประเภทวิชา
                          </th>
                          <th class="text-left">
                            สาขาวิชาเอก
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- <pre> {{teacherEdu}} </pre> -->
                        <tr v-for="edu in teacherEdu" :key="edu._id">
                          <td>{{ edu.educationLevelName }}</td>
                          <td>{{ edu.otherDegree }}</td>
                          <td>{{ edu.otherMajor }}</td>
                          <td>{{ edu.otherProgram }}</td>
                          <td>
                            <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                  v-bind="attrs"
                                  v-on="on"
                                  small
                                  @click="editEdu(edu)"
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
                                  @click="deleteEdu(edu)"
                                >
                                  mdi-delete
                                </v-icon>
                              </template>
                              <span>ลบข้อมูล</span>
                            </v-tooltip>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- <v-tab-item>
              <v-card class="elevation-3">
                <v-toolbar dark dense color="light-blue darken-1">
                  <v-toolbar-title>การสอน</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <ValidationProvider
                          name="teachSubjectCode"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.teachSubjectCode"
                            :items="optionsTeachSubjectCode"
                            v-on:change="getGroupSubjectById"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="กลุ่มสาระการเรียนรู้"
                            data-vv-name="select-teachSubjectCode"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="groupSubject"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.groupSubjectCode"
                            :items="optionsGroupSubject"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="วิชาที่สอน"
                            data-vv-name="select-optionsGroupSubject"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="4">
                        <ValidationProvider
                          name="teachAcademicLevelCode"
                          v-slot="{ errors, valid }"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="form.teachAcademicLevelCode"
                            :items="optionsTeachAcademicLevelCode"
                            item-value="id"
                            item-text="title"
                            :error-messages="errors"
                            :success="valid"
                            label="ระดับที่สอน"
                            data-vv-name="select-teachAcademicLevelCode"
                            required
                            dense
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item> -->
          </v-tabs>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mr-4"
            :disabled="invalid"
            @click="handleSubmit(onSubmit)"
            >บันทึก</v-btn
          >
          <v-btn color="info" @click="validate()">ตรวจสอบ</v-btn>
          <v-btn color="warning" text @click="loadPagePrev">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { standardcodeService } from "@/_services/standardcode.service";
import { teacherService } from "@/_services/teacher.service";
import { schoolService } from "@/_services/school.service";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import th from "vee-validate/dist/locale/th.json";
import * as rules from "vee-validate/dist/rules";

export default {
  name: "personelForm",

  components: {
    ValidationObserver,
    ValidationProvider
  },

  props: {
    title: String,
    form: {
      required: true
    },
    teacherEdu: {
      required: true
    },
    readonly: Boolean
  },

  data: () => ({
    disabled: true,

    menuPassportStartDate: false,
    menuPassportExpireDate: false,
    menuBirthday: false,
    menuLicenseExpiredDate: false,
    menuLicenseStartDate: false,

    menuStartDate: false,
    menuBeginDate: false,
    menuRetireDate: false,
    menuProCurrentDate: false,
    menuCurrentDepartmentDate: false,
    menuDateAcademics: false,
    menuAssistanceDateStart: false,
    menuAssistanceDateEnd: false,
    menuAddDateDuty: false,
    menuGpfDate: false,

    optionsSchools: [],
    optionsPrefix: [],
    optionsPrefixEn: ["Mr.", "Mrs.", "Miss"],
    optionsGender: [],
    optionsNationality: [],
    optionsAddSubdistrict: [],
    optionsAddProvince: [],
    optionsAddDistrict: [],
    optionsCurrentSubdistrict: [],
    optionsCurrentProvince: [],
    optionsCurrentDistrict: [],

    optionsPersonTypeCode: [],
    optionsPositionCode: [],
    optionsPositionStatus: [],
    optionsAddPosition: [],
    optionsTeachAcademicLevelCode: [],
    optionsTeachSubjectCode: [],
    optionsGroupSubject: [],
    optionsAcademicStandingCode: [],
    optionsCurrentOrderLevel: [],
    optionsOriOrderLevel: [],
    optionsTeacherCertificateCode: [],

    optionsSemester: [
      { id: "1", title: "ภาคเรียนที่ 1" },
      { id: "2", title: "ภาคเรียนที่ 2" }
    ],
    optionsPersonBlood: ["โอ", "เอ", "บี", "เอบี", "ไม่ระบุหมู่เลือด"],
    optionsMarryStatus: ["โสด", "สมรส", "หย่าร้าง", "หม้าย"],
    optionsPersonStatus: ["ปกติ", "ช่วยราชการ"],
    optionsDepartment: [],
    // optionsDepartment: [
    //   "กลุ่มบริการทั่วไป",
    //   "กลุ่มบริหารงานวิชาการ",
    //   "กลุ่มบริหารงานบุคคล",
    //   "กลุ่มบริหารแผนงานและงบประมาณ"
    // ],
    optionsLicenseRenew: ["ต่อแล้ว", "ยังไม่ต่อ"],
    optionsGpfStatus: [
      { id: "1", title: "เป็นสมาชิก" },
      { id: "0", title: "ไม่เป็นสมาชิก" }
    ],
    optionsGpfCollect: [
      { id: "1", title: "สะสม" },
      { id: "0", title: "ไม่สะสม" }
    ]
  }),

  computed: {
    ...mapState({
      account: state => state.account
    })
  },

  created() {},

  mounted() {
    // this.getTeacher();

    this.getSchools();
    this.getPrefix();
    this.getGender();
    this.getNationality();
    this.getPersonTypeCode();
    this.getPositionById();
    this.getPositionStatus();
    this.getAddPosition();
    this.getDepartment();
    this.getAcademicLevelCode();
    this.getTeachSubjectCode();
    this.getGroupSubjectById();
    this.getAcademicStandingCode();
    this.getOrderLevelById();
    this.getTeacherCertificateCode();
    this.getAddProvince();
    this.getAddDistrict();
    this.getAddSubdistrict();
    this.getCurrentProvince();
    this.getCurrentDistrict();
    this.getCurrentSubdistrict();

    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  watch: {
    //ตรวจสอบหมายเลขบัตรประชาชน
    // personId: function(value) {
    //   if (value.length === 13) {
    //     this.getTeacher();
    //   }
    // },
    "form.personId": {
      handler: function(value) {
        if (!this.readonly) {
          if (value.length >= 6 && value.length <= 13) {
            this.disabled = false;
          } else {
            this.disabled = true;
          }

          if (value.length === 13) {
            this.handleCheckPersonId();
          }
        }
      }
    },

    "form.addProvinceID": function() {
      this.getAddDistrict();
    },

    "form.addDistrictID": function() {
      this.getAddSubdistrict();
    },

    "form.currentProvinceID": function() {
      this.getCurrentDistrict();
    },

    "form.currentDistrictID": function() {
      this.getCurrentSubdistrict();
    },

    "form.groupSubjectCode": function() {
      this.getGroupSubjectById();
    },

    "form.personTypeCode": function() {
      this.getPositionById();
      this.getOrderLevelById();
    }
  },

  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

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
    getPositionById() {
      standardcodeService
        .getPositionById(this.form.personTypeCode)
        .then(response => {
          this.optionsPositionCode = response;
        });
    },

    //ดึงข้อมูลสถานะตำแหน่ง
    getPositionStatus() {
      standardcodeService.getPositionStatus().then(response => {
        this.optionsPositionStatus = response;
      });
    },

    //ดึงข้อมูลหน้าที่เพิ่มเติม
    getAddPosition() {
      standardcodeService.getAddPosition().then(response => {
        this.optionsAddPosition = response;
      });
    },

    //ดึงข้อมูลฝ่าย กลุ่มงาน
    getDepartment() {
      standardcodeService.getDepartment().then(response => {
        this.optionsDepartment = response;
      });
    },

    //ดึงข้อมูลระดับที่สอน-ระดับการศึกษา
    getAcademicLevelCode() {
      standardcodeService.getAcademicLevelCode().then(response => {
        this.optionsTeachAcademicLevelCode = response;
      });
    },

    //ดึงข้อมูลกลุ่มสาระฯ
    getTeachSubjectCode() {
      standardcodeService.getTeachSubjectCode().then(response => {
        this.optionsTeachSubjectCode = response;
      });
    },

    //ดึงข้อมูลวิชา/สาระการเรียนรู้
    getGroupSubjectById() {
      standardcodeService
        .getGroupSubjectById(this.form.teachSubjectCode)
        .then(response => {
          this.optionsGroupSubject = response;
        });
    },

    //ดึงข้อมูลวิทยฐานะ
    getAcademicStandingCode() {
      standardcodeService.getAcademicStandingCode().then(response => {
        this.optionsAcademicStandingCode = response;
      });
    },

    //ดึงข้อมูลอันดับหรือระดับ
    getOrderLevelById() {
      standardcodeService
        .getOrderLevelById(this.form.personTypeCode)
        .then(response => {
          this.optionsCurrentOrderLevel = response;
          this.optionsOriOrderLevel = response;
        });
    },

    //ดึงข้อมูลใบอนุญาตประกอบวิชาชีพ
    getTeacherCertificateCode() {
      standardcodeService.getTeacherCertificateCode().then(response => {
        this.optionsTeacherCertificateCode = response;
      });
    },

    //ดึงข้อมูลตำบล
    getAddSubdistrict() {
      if (this.form.addDistrictID) {
        standardcodeService
          .getSubdistrict(this.form.addDistrictID)
          .then(response => {
            this.optionsAddSubdistrict = response;
          });
      }
    },

    //ดึงข้อมูลอำเภอ
    getAddDistrict() {
      if (this.form.addProvinceID) {
        standardcodeService
          .getDistrict(this.form.addProvinceID)
          .then(response => {
            this.optionsAddDistrict = response;
          });
      }
    },

    //ดึงข้อมูลจังหวัด
    getAddProvince() {
      standardcodeService.getProvince().then(response => {
        this.optionsAddProvince = response;
      });
    },

    //ดึงข้อมูลตำบล
    getCurrentSubdistrict() {
      if (this.form.currentDistrictID) {
        standardcodeService
          .getSubdistrict(this.form.currentDistrictID)
          .then(response => {
            this.optionsCurrentSubdistrict = response;
          });
      }
    },

    //ดึงข้อมูลอำเภอ
    getCurrentDistrict() {
      if (this.form.currentProvinceID) {
        standardcodeService
          .getDistrict(this.form.currentProvinceID)
          .then(response => {
            this.optionsCurrentDistrict = response;
          });
      }
    },

    //ดึงข้อมูลจังหวัด
    getCurrentProvince() {
      standardcodeService.getProvince().then(response => {
        this.optionsCurrentProvince = response;
      });
    },

    //รีโหลดหน้าก่อนนี้
    loadPagePrev() {
      this.$router.go(-1);
    },

    //ยืนยันฟอร์ม
    onSubmit() {
      console.log("Save");
      // alert(JSON.stringify(this.form));
      this.$emit("updateForm", this.form);
    },

    //ตรวจสอบเลขประจำตัวประชาชน
    handleCheckPersonId() {
      let value = this.form.personId;
      if (value) {
        console.log("Check PersonId");
        this.$emit("handleCheckPersonId", this.form);
      }
    },

    addEdu() {
      console.log(`Add Edu`);
      this.$emit("insertEdu");
    },

    editEdu(item) {
      console.log(`Edit: ${item._id}`);
      this.$emit("updateEdu", item);
    },

    deleteEdu(item) {
      console.log(`Delete: ${item._id}`);
      this.$emit("deleteEdu", item);
    }
  }
};
</script>

<style scoped>
.v-tab {
  justify-content: left;
}
</style>
