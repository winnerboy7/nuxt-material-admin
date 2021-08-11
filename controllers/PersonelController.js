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
  insert (personel) {
    return this.create(`/api/personels/`, personel)
  }
  update (personel) {
    return this.update(`/api/personels/${personel.personId}`, personel)
  }
  delete (id) {
    return this.delete(`/api/personels/${id}`, id)
  }
}

export default PersonelController