import HttpRequest from './http_request'

class StandardCodeController extends HttpRequest {
  getPrefix () {
    return this.create('/api/standardcode/prefix/')
  }

  getGender () {
    return this.fetch('/api/standardcode/gender/')
  }

  getNationality () {
    return this.fetch('/api/standardcode/nationality/')
  }

  getSubdistrict () {
    return this.fetch('/api/standardcode/subdistrict/')
  }

  getDistrict () {
    return this.fetch('/api/standardcode/district/')
  }

  getProvince () {
    return this.fetch('/api/standardcode/province/')
  }

  getPersonTypeCode () {
    return this.fetch('/api/standardcode/persontype/')
  }

  getPositionCode () {
    return this.fetch('/api/standardcode/position/')
  }

  getTeachAcademicLevelCode () {
    return this.fetch('/api/standardcode/academicLevel/')
  }

  getAcademicStandingCode () {
    return this.fetch('/api/standardcode/academicStanding/')
  }

  getTeachSubjectCode () {
    return this.fetch('/api/standardcode/teachSubject/')
  }

  getSchoolType () {
    return this.fetch('/api/standardcode/schoolType/')
  }

  getSchoolSpecial () {
    return this.fetch('/api/standardcode/schoolSpecial/')
  }

  getSchoolPosition () {
    return this.fetch('/api/standardcode/schoolPosition/')
  }
}

export default StandardCodeController
