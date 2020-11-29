import HttpRequest from './http_request'

class SettingController extends HttpRequest {
  getSetting() {
    return this.fetch(`/api/settings/`)
  }
  getById(id) {
    return this.fetch(`/api/settings/${id}`)
  }
  getByTitle(title) {
    return this.fetch(`/api/settings/`, title)
  }
  insert (setting) {
    return this.create(`/api/settings/`, setting)
  }
  update (setting) {
    return this.update(`/api/settings/${setting.title}`, setting)
  }
  delete (id) {
    return this.delete(`/api/settings/${id}`, id)
  }
}

export default SettingController