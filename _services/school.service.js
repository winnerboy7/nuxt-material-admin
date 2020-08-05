import { authHeader } from "@/middleware/auth-header";
import axios from "axios";

export const schoolService = {
  countSchool,
  getById,
  getByName,
  getByArea,
  insert,
  update,
  delete: _delete
};

function countSchool(areaCode) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      areaCode
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/function/countSchool/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/schools/${id}`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getByName(schoolName) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      schoolName
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/schools/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getByArea(areaCode) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      areaCode
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/schools/area/${areaCode}`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function insert(school) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/schools`, school, {
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

function update(school) {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/schools/${school.schId}`, school, {
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
      .delete(`/api/schools/${id}`, {
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
    errMessage = error.response.data.errmsg;

    if (error.response.status === 401) {
      // logout();
      // this.$router.push("/login");
      location.href = "/#/login";
    }
  }

  // console.log("Error: " + errMessage);
  return errMessage;
}
