import HttpRequest from './http_request'

class SchoolController extends HttpRequest {
  countSchool(areaCode) {
    return this.fetch(`/api/function/countSchool/`, areaCode)
  }
  getById(id) {
    return this.fetch(`/api/schools/${id}`)
  }
  getByName(schoolName) {
    return this.fetch(`/api/schools/`, schoolName)
  }
  getByArea(areaCode) {
    return this.fetch(`/api/schools/`, areaCode)
  }
  insert (school) {
    return this.create(`/api/schools/`, school)
  }
  update (school) {
    return this.update(`/api/schools/${school.schId}`, school)
  }
  delete (id) {
    return this.delete(`/api/schools/${id}`, id)
  }
}

export default SchoolController