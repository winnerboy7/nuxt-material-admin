import axios from 'axios'
import { authHeader } from "@/middleware/auth-header";

class UploadController {
  upload(file, formInfo, onUploadProgress) {
    const formData = new FormData()
    formData.append('areaCode', formInfo.areaCode)
    formData.append('personType', formInfo.personType)
    formData.append('personInfo', formInfo.personInfo)
    formData.append('cgdFile', file)
    
    return axios.post(`/api/uploads/upload`, formData, {
      headers: authHeader(),
      onUploadProgress
    })

    // return axios.post(api_url, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   onUploadProgress
    // })
  }

  getFiles(areaCode) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/uploads/${areaCode}`, {
          headers: authHeader()
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(this.handleError(error))
        })
    })
  }

  handleError(error) {
    // console.log({...error})

    let errMessage = error
    if (error.response) {
      errMessage = error.response.data.errmsg

      if (error.response.status === 401) {
        location.href = '/login'
      }
    }
    return errMessage
  }
}

export default new UploadController()
