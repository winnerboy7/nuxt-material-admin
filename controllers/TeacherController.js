import HttpRequest from './http_request'

class TeacherController extends HttpRequest {
  countTeacher(areaCode, personTypeCode) {
    let params = {
      areaCode,
      personTypeCode
    }
    return this.fetch(`/api/function/countTeacher/`, params)
  }
  countTeacherArea() {
    return this.fetch(`/api/function/countTeacherArea/`)
  }
  getById(id) {
    return this.fetch(`/api/teachers/${id}`)
  }
  getBySchoolId(schoolId) {
    return this.fetch(`/api/teachers/school/${schoolId}`)
  }
  getByName(firstName) {
    return this.fetch(`/api/teachers/`, firstName)
  }
  getTeachers(areaCode, filter) {
    let params = {
      areaCode,
      filter
    }
    return this.fetch(`/api/teachers/`, params)
  }
  getByArea(areaCode) {
    return this.fetch(`/api/teachers/`, areaCode)
  }
  insert (teacher) {
    return this.create(`/api/teachers/`, teacher)
  }
  update (teacher) {
    return this.update(`/api/teachers/${teacher.personId}`, teacher)
  }
  delete (id) {
    return this.delete(`/api/teachers/${id}`, id)
  }
  
  getTeacherEdu(id) {
    return this.fetch(`/api/teachers/edu/${id}`)
  }
  insertTeacherEdu (teacher) {
    return this.create(`/api/teachers/edu/`, teacher)
  }
  updateTeacherEdu (teacher) {
    return this.update(`/api/teachers/edu/${teacher._id}`, teacher)
  }
  deleteTeacherEdu (id) {
    return this.delete(`/api/teachers/edu/${id}`, id)
  }
}

export default TeacherController