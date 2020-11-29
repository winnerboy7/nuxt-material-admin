import HttpRequest from './http_request'

class PersonelController extends HttpRequest {
  countPersonel() {
    return this.fetch(`/api/function/countPersonel/`)
  }
  getById(id) {
    return this.fetch(`/api/personels/${id}`)
  }
  getByName(firstName) {
    return this.fetch(`/api/personels/`, firstName)
  }
  getPersonels(areaCode, filter) {
    let params = {
      areaCode,
      filter
    }
    return this.fetch(`/api/personels/`, params)
  }
  getByArea(areaCode) {
    return this.fetch(`/api/personels/`, areaCode)
  }
  insert (teacher) {
    return this.create(`/api/personels/`, teacher)
  }
  update (teacher) {
    return this.update(`/api/personels/${teacher.personId}`, teacher)
  }
  delete (id) {
    return this.delete(`/api/personels/${id}`, id)
  }
}

export default PersonelController