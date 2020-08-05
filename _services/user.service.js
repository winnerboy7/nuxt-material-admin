import { authHeader } from "@/middleware/auth-header";
import axios from "axios";

export const userService = {
  getById,
  getAll,
  getProfile,
  insert,
  update,
  updatePassword,
  delete: _delete
};

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/users/${id}`, requestOptions)
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
    headers: authHeader(),
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/users/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getProfile(username) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      username
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/users/`,
        requestOptions
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function insert(user) {
  return new Promise((resolve, reject) => {    
    axios
      .post(`/api/users`, user, {
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

function update(user) {
  return new Promise((resolve, reject) => {    
    axios
      .put(`/api/users/${user.username}`, user, {
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

function updatePassword(user) {
  return new Promise((resolve, reject) => {    
    axios
      .put(`/api/users/password/${user.username}`, user, {
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
      .delete(`/api/users/${id}`, {
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