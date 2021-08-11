import HttpRequest from "./http_request";
class StandardCodeController extends HttpRequest {
  getPrefix() {
    return this.create(`/api/standardcode/prefix/`);
  }

  getGender() {
    return this.fetch(`/api/standardcode/gender/`);
  }

  getNationality() {
    return this.fetch(`/api/standardcode/nationality/`);
  }

  getSubdistrict() {
    return this.fetch(`/api/standardcode/subdistrict/`);
  }

  getDistrict() {
    return this.fetch(`/api/standardcode/district/`);
  }

  getProvince() {
    return this.fetch(`/api/standardcode/province/`);
  }

  getPersonTypeCode() {
    return this.fetch(`/api/standardcode/persontype/`);
  }

  getPositionCode() {
    return this.fetch(`/api/standardcode/position/`);
  }
  getPositionById(id) {
    return this.fetch(`/api/standardcode/position/${id}`);
  }

  getPositionStatus() {
    return this.fetch(`/api/standardcode/positionStatus/`);
  }

  getAcademicLevelCode() {
    return this.fetch(`/api/standardcode/academicLevel/`);
  }

  getEducationLevel() {
    return this.fetch(`/api/standardcode/educationLevel/`);
  }

  getDegree() {
    return this.fetch(`/api/standardcode/degree/`);
  }

  getMajor() {
    return this.fetch(`/api/standardcode/major/`);
  }

  getMajorProgram() {
    return this.fetch(`/api/standardcode/majorProgram/`);
  }

  getAcademicStandingCode() {
    return this.fetch(`/api/standardcode/academicStanding/`);
  }

  getOrderLevel() {
    return this.fetch(`/api/standardcode/orderLevel/`);
  }

  getOrderLevelById(id) {
    return this.fetch(`/api/standardcode/orderLevel/${id}`);
  }

  getTeacherCertificateCode() {
    return this.fetch(`/api/standardcode/teacherCertificate/`);
  }

  getTeachSubjectCode() {
    return this.fetch(`/api/standardcode/teachSubject/`);
  }

  getGroupSubject() {
    return this.fetch(`/api/standardcode/groupSubject/`);
  }

  getGroupSubjectById(id) {
    return this.fetch(`/api/standardcode/groupSubject/${id}`);
  }

  getSchoolType() {
    return this.fetch(`/api/standardcode/schoolType/`);
  }

  getSchoolSpecial() {
    return this.fetch(`/api/standardcode/schoolSpecial/`);
  }

  getSchoolPosition() {
    return this.fetch(`/api/standardcode/schoolPosition/`);
  }

  getAddPosition() {
    return this.fetch(`/api/standardcode/addPosition/`);
  }

  getDepartment() {
    return this.fetch(`/api/standardcode/department/`);
  }
}

export default StandardCodeController;
