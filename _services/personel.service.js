import { authHeader } from "@/middleware/auth-header";
import axios from "axios";

export const personelService = {
  countPersonel,
  getById,
  getByName,
  getPersonels,
  getByArea,
  insert,
  update,
  delete: _delete
};

function countPersonel(areaCode, personTypeCode) {
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
      .get(`/api/function/countPersonel/`, requestOptions)
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
      .get(`/api/personels/${id}`, {
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
      .get(`/api/personels/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getPersonels(areaCode, filter) {
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
      .get(`/api/personels/`, requestOptions)
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
      .get(`/api/personels/area/${areaCode}`, {
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

function insert(personel) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/personels`, personel, {
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

function update(personel) {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/personels/${personel.personId}`, personel, {
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
      .delete(`/api/personels/${id}`, {
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
