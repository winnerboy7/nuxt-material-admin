import { authHeader } from "@/middleware/auth-header";
import axios from "axios";

export const settingService = {
  getSetting,
  getById,
  getByTitle,
  insert,
  update,
  delete: _delete
};

function getSetting() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/settings`, {
        headers : authHeader(),
      })
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
      .get(`/api/settings/${id}`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getByTitle(title) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/settings/${title}`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function insert(setting) {
  return new Promise((resolve, reject) => {    
    axios
      .post(`/api/settings`, setting, {
        headers : authHeader(),
      })
      .then(response => {
        // console.log(response.data)
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error))
      });     
  });
}

function update(setting) {
  return new Promise((resolve, reject) => {    
    axios
      .put(`/api/settings/${setting.title}`, setting, {
        headers : authHeader(),
      })
      .then(response => {
        // console.log(response.data)
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error))
      });     
  });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return new Promise((resolve, reject) => {    
    axios
      .delete(`/api/settings/${id}`, {
        headers : authHeader(),
      })
      .then(response => {
        // console.log(response.data)
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error))
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