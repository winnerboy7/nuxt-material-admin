import HttpRequest from './http_request'

class UserController extends HttpRequest {
  getById(id) {
    return this.fetch(`/api/users/${id}`)
  }
  getUsers() {
    return this.fetch(`/api/users/`)
  }
  getProfile(username) {
    return this.fetch(`/api/users/`, username)
  }
  insert (user) {
    return this.create(`/api/users`, user)
  }
  update (user) {
    return this.update(`/api/users/${user.username}`, user)
  }
  updatePassword (user) {
    return this.update(`/api/users/password/${user.username}`, user)
  }
  delete (id) {
    return this.delete(`/api/users/${id}`, id)
  }
}

export default UserController