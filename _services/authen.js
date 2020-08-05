import { authHeader } from "@/middleware/auth-header";
import axios from "axios";

export const authen = {
  login,
  logout,
  register,
  getById,
  update,
  delete: _delete
};

function login(username, password) {
  console.log("LOGIN");
  console.log(`/api/auth/authenticate`);

  return new Promise((resolve, reject) => {
    axios
      .post(
        `/api/auth/authenticate`,
        { username, password },
        {
          headers: authHeader()
        }
      )
      .then(response => {
        let user = response.data;
        console.log("User :", user);
        if (user.token) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        resolve(user);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function register(user) {
  console.log("REGISTER");

  return new Promise((resolve, reject) => {
    axios
      .post(`/api/users`, user, {
        headers: authHeader()
      })
      .then(response => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function logout() {
  console.log("LOGOUT");
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getById(id) {
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

function update(user) {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/users/${user.username}`, user, {
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
      .delete(`/api/users/${id}`, {
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
      logout();
    }
  }

  console.log("Error: " + errMessage);
  return errMessage;
}
