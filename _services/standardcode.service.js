import { authHeader } from "@/middleware/auth-header";
import axios from "axios";

export const standardcodeService = {
  getPrefix,
  getGender,
  getNationality,
  getSubdistrict,
  getDistrict,
  getProvince,
  getPersonTypeCode,
  getPositionCode,
  getTeachAcademicLevelCode,
  getAcademicStandingCode,
  getTeachSubjectCode,
  getSchoolType,
  getSchoolSpecial,
  getSchoolPosition,
};
function getPrefix() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/prefix/`, {
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

function getGender() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/gender/`, {
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

function getNationality() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/nationality/`, {
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

function getSubdistrict(district_id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      district_id
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/subdistrict/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getDistrict(province_id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      province_id
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/district/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getProvince() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/province/`, {
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

function getPersonTypeCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/persontype/`, {
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

function getPositionCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/position/`, {
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

function getTeachAcademicLevelCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/academicLevel/`, {
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

function getAcademicStandingCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/academicStanding/`, {
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

function getTeachSubjectCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/teachSubject/`, {
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

function getSchoolType() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/schoolType/`, {
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

function getSchoolSpecial() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/schoolSpecial/`, {
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

function getSchoolPosition() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/schoolPosition/`, {
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