import HttpRequest from './http_request'

class AuthenController extends HttpRequest {
  login(username, password) {
    return this.create(`/api/auth/login`, { username, password })
  }
  logout() {
    localStorage.removeItem("user")
  }
}

export default AuthenController