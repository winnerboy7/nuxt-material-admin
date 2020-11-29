import HttpRequest from './http_request'

class MessageProvider extends HttpRequest {
  sendMessage (data) {
    return this.create('/api/standardcode/prefix', data)
  }

  getPrefix () {
    return this.fetch('/api/standardcode/prefix')
  }

  getUsers () {
    return this.fetch('/api/users')
  }

  createUser (data) {
    return this.create('', data)
  }
}

export default MessageProvider
