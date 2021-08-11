import HttpRequest from "./http_request";

class ManpowerController extends HttpRequest {
  getById(id) {
    return this.fetch(`/api/manpowers/${id}`);
  }
  getBySchool(schoolId) {
    return this.fetch(`/api/manpowers/school/${schoolId}`);
  }
  getByArea(areaCode) {
    return this.fetch(`/api/manpowers/area/${areaCode}`);
  }
  getByAreaPerson(areaCode, personTypeCode) {
    let params = {
      areaCode,
      personTypeCode
    };
    return this.fetch(`/api/manpowers/`, params);
  }
  insert(person) {
    return this.create(`/api/manpowers/`, person);
  }
  update(person) {
    return this.update(`/api/manpowers/${person._id}`, person);
  }
  delete(id) {
    return this.delete(`/api/manpowers/${id}`, id);
  }
}

export default ManpowerController;
