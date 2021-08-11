<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="typeSelected"
            :items="personTypes"
            item-value="item"
            item-text="name"
            label="เลือกประเภทบุคคล :"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="infoSelected"
            :items="personInfos"
            item-value="item"
            item-text="name"
            label="เลือกประเภทข้อมูล :"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-row
      no-gutters
      justify="center"
      align="center"
    >
      <v-col cols="8">
        <v-file-input
          show-size
          label="เลือกไฟล์ :"
          @change="selectFile"
          accept=".txt"
        ></v-file-input>
      </v-col>

      <v-col
        cols="4"
        class="pl-2"
      >
        <v-btn
          color="success"
          dark
          small
          @click="upload"
        >
          อัพโหลด
          <v-icon
            right
            dark
          >mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="currentFile">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>

      <p class="mt-2">
        ไฟล์: <b>{{ currentFile ? currentFile.name : "" }}</b> :
        <i>{{ message }}</i>
      </p>
    </div>

    <v-alert
      v-if="message"
      border="left"
      color="blue-grey"
      dark
    >
      {{ message }}
    </v-alert>

    <v-card
      v-if="fileInfos.length > 0"
      class="mx-auto"
    >
      <v-list>
        <v-subheader>#รายการไฟล์</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(file, index) in fileInfos"
            :key="index"
          >
            <a :href="file.url">{{ index+1 }}. {{ file.name }}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- <template>
        <v-card
          class="mx-auto"
        >
          <v-toolbar
            color="indigo"
            dark
          >
            <v-toolbar-title>รายการไฟล์ที่อัพโหลด</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container fluid>
            <v-row dense>
              <v-col>                              
                <ol>
                  <li v-for="(file, index) in fileInfos" :key="index">
                    <a :href="file.url">{{ file.name }}</a>
                  </li>
                </ol>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </template> -->
    </v-card>
  </div>
</template>

<script>
// import UploadService from "../services/UploadFilesService";
import { mapState, mapActions } from "vuex";
import UploadService from "@/_services/upload.service";

export default {
  name: "upload-files",
  data() {
    return {
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
      items: [],

      personTypes: [
        { item: 42, name: "ครูและบุคลากรทางการศึกษา" },
        { item: 43, name: "ผู้บริหาร สพท./สถานศึกษา" },
        { item: 45, name: "บุคลากรในสำนักงานเขตพื้นที่การศึกษา" },
        { item: 46, name: "ลูกจ้าง" },
      ],
      typeSelected: 42,
      personInfos: [
        { item: 1, name: "ข้อมูลทั่วไป" },
        { item: 2, name: "บุคคล" },
        { item: 3, name: "การศึกษา" },
        { item: 4, name: "ครอบครัว" },
        { item: 5, name: "ที่อยู่" },
      ],
      infoSelected: 1,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.account.user,
    }),
  },

  methods: {
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },

    upload() {
      if (!this.currentFile) {
        this.message = "กรุณาเลือกไฟล์!";
        return;
      }

      this.message = "";

      const formInfo = {
        areaCode: this.user.areaCode,
        personType: this.typeSelected,
        personInfo: this.infoSelected,
      };

      UploadService.upload(this.currentFile, formInfo, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          this.items = response.data.data.content;
          this.$emit("load-items", this.items);

          return UploadService.getFiles(this.user.areaCode);
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "ไม่สามารถอัพโหลดไฟล์ได้!";
          this.currentFile = undefined;
        });
    },
  },
  mounted() {
    UploadService.getFiles(this.user.areaCode).then((response) => {
      this.fileInfos = response.data;
    });
  },
};
</script>