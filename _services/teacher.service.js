import { authHeader } from "@/middleware/auth-header";
import axios from "axios";

export const teacherService = {
  countTeacher,
  countTeacherArea,
  getById,
  getBySchoolId,
  getByName,
  getTeachers,
  getByArea,
  insert,
  update,
  delete: _delete
};

function countTeacher(areaCode, personTypeCode) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      areaCode,
      personTypeCode
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/function/countTeacher/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function countTeacherArea(areaCode, personTypeCode) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      areaCode,
      personTypeCode
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/function/countTeacherArea/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/${id}`, {
        headers: authHeader()
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getBySchoolId(schoolId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/school/${schoolId}`, {
        headers: authHeader()
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getByName(firstName) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      firstName
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getTeachers(areaCode, filter) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      areaCode,
      filter
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getByArea(areaCode) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/area/${areaCode}`, {
        headers: authHeader()
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function insert(teacher) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/teachers`, teacher, {
        headers: authHeader()
      })
      .then(response => {
        // console.log(response.data)
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function update(teacher) {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/teachers/${teacher.personId}`, teacher, {
        headers: authHeader()
      })
      .then(response => {
        // console.log(response.data)
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/teachers/${id}`, {
        headers: authHeader()
      })
      .then(response => {
        // console.log(response.data)
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function handleError(error) {
  // console.log({...error});

  let errMessage = error;
  if (error.response) {
    errMessage = error.response.data.message || error.response.data.errmsg || error.response.statusText

    if (error.response.status === 401) {
      // logout();
      // this.$router.push("/login");
      location.href = "/login";
    }
  }

  // console.log("Error: " + errMessage);
  return errMessage;
}
