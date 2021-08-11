import { authHeader } from "@/middleware/auth-header";
import axios from "axios";

export const manpowerService = {
  getById,
  getBySchoolId,
  getByArea,
  getByAreaPerson,
  insert,
  update,
  delete: _delete
};

function getById(id) {
  // console.log(`POSITION ID : ${id}`)
  // console.log(`/api/manpowers/${id}`)
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/manpowers/${id}`, {
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
      .get(`/api/manpowers/school/${schoolId}`, {
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

function getByArea(areaCode) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/manpowers/area/${areaCode}`, {
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

function getByAreaPerson(areaCode, personTypeCode) {
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
      .get(`/api/manpowers/`, requestOptions)
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
      .post(`/api/manpowers`, teacher, {
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
      .put(`/api/manpowers/${teacher._id}`, teacher, {
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
      .delete(`/api/manpowers/${id}`, {
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
