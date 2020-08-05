import { settingService } from "@/_services/setting.service";

export const config = {
  namespaced: true,
  state: {
    config: {},
    academicYear: '',
    semester: '',
    systemConfig: {
      academicYear: '',
      semester: '',
    }
  },

  getters: {
    getConfig(state) {
      return state.config;
    },
    getAcademicYear(state) {
      return state.academicYear;
    },
    getSemester(state) {
      return state.semester;
    },
    getSystemConfig(state) {
      return state.systemConfig;
    },
  },

  mutations: {
    SET_CONFIG_REQUEST(state) {
      state.config = { loading: true };
    },
    SET_CONFIG_SUCCESS(state, config) {
      state.config =  config ;
    },
    SET_CONFIG_FAILURE(state, error) {
      state.config = { error };
    },

    SET_ACADEMIC_YEAR_REQUEST(state) {
      state.academicYear = { loading: true };
    },
    SET_ACADEMIC_YEAR_SUCCESS(state, config) {
      state.systemConfig.academicYear = config.value;
      state.academicYear =  config ;
    },
    SET_ACADEMIC_YEAR_FAILURE(state, error) {
      state.academicYear = { error };
    },

    SET_SEMESTER_REQUEST(state) {
      state.semester = { loading: true };
    },
    SET_SEMESTER_SUCCESS(state, config) {
      state.systemConfig.semester = config.value;
      state.semester =  config ;
    },
    SET_SEMESTER_FAILURE(state, error) {
      state.semester = { error };
    },
  },

  actions: {
    setConfig({ commit }) {
      commit("SET_CONFIG_REQUEST");

      settingService.getSetting().then(
        config => commit("SET_CONFIG_SUCCESS", config),
        error => commit("SET_CONFIG_FAILURE", error)
      );
    },
    
    setAcademicYear({ commit }) {
      commit("SET_ACADEMIC_YEAR_REQUEST");

      settingService.getByTitle('academicYear').then(
        config => commit("SET_ACADEMIC_YEAR_SUCCESS", config),
        error => commit("SET_ACADEMIC_YEAR_FAILURE", error)
      );
    },

    setSemester({ commit }) {
      commit("SET_SEMESTER_REQUEST");

      settingService.getByTitle('semester').then(
        config => commit("SET_SEMESTER_SUCCESS", config),
        error => commit("SET_SEMESTER_FAILURE", error)
      );
    },
  }
};
