import { authHeader } from "@/middleware/auth-header";
import axios from "axios";

export const areaService = {
  countArea,
  getAll,
  getById,
  getByName,
  getByProvincename,
  insert,
  update,
  delete: _delete
};

function countArea() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/function/countArea/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/areas/`, requestOptions)
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
      .get(`/api/areas/${id}`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getByName(areaName) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      areaName
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/areas/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getByProvincename(provinceName) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      provinceName
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/areas/province/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function insert(area) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/areas`, area, {
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

function update(area) {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/areas/${area.areaId}`, area, {
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
      .delete(`/api/areas/${id}`, {
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