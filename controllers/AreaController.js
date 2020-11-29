
import HttpRequest from './http_request'

class AreaController extends HttpRequest {
  countArea() {
    return this.fetch(`/api/function/countArea/`)
  }
  getAreas() {
    return this.fetch(`/api/areas/`)
  }
  getById(id) {
    return this.fetch(`/api/areas/${id}`)
  }
  getByName(areaName) {
    return this.fetch(`/api/areas/`, areaName)
  }
  getByProvincename(provinceName) {
    return this.fetch(`/api/areas/`, provinceName)
  }
  insert (area) {
    return this.create(`/api/areas/`, area)
  }
  update (area) {
    return this.update(`/api/areas/${area.areaId}`, area)
  }
  delete (id) {
    return this.delete(`/api/areas/${id}`)
  }
}

export default AreaController