import http from "./http-common";

class DataService {
  //Api For Port 8089 / 8088
  Login(data) {
    return http.post("/auth/login", data);
  }


  OtpVarification(data) {
    return http.post("/auth/validate/otp", data);
  }
  CreateUser(data) {
    return http.post("/auth/save", data);
  }

  CreateJobs(data) {
    return http.post("/posts/create", data);
  }
  GetAllJobs(data) {
    return http.get("/posts/all", data);
  }
  uploadJobImage(jobId, formData) {
    return http.post(`/posts/upload-image/${jobId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  updateJob(id,data) {
    return http.put(`posts/update/${id}`, data);
  }
  GetProfiledata(userid,data) {
    return http.get(`/auth/get-user-information/${userid}`, data);
  }

  uploadprofileImage(jobId, formData) {
    return http.post(`/auth/save-profile-image/${jobId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  uploadcvpdf(jobId, formData) {
    return http.post(`/auth/save-cv/${jobId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  Createseekerdetails(id ,data) {
    return http.put(`/auth/add-seeker-details/${id}`, data);
  }


  getcv(id,data) {
    return http.get(`/auth/get-cv/${id}`, data);
  }
  GetAllJobsLead(userId,data) {
    return http.get(`/apply/post/${userId}`, data);
  }

  searchjob(data) {
    return http.put(`/posts/Search`, data);
  }

  buySubsripation(data) {
    return http.post("/user-data/subscribe", data);
  }
  createRazorpayOrder(data) {
    return http.post("/rezar/pay", data);
  }

  getRole(subc,data) {
    return http.get(`/auth/roles/${subc}`, data);
  }

  GetAllPostbyUderId(userId,data) {
    return http.get(`/posts/by-user/${userId}`, data);
  }
  GetAllapplied(status,userId,data) {
    return http.get(`/apply/status/${status}/post/${userId}`, data);
  }

  updateJobStatus(status,userId,data) {
    return http.put(`/apply/update-status/${status}/${userId}`, data);
  }

  getAlluserdatabyrole(role,data) {
    return http.get(`/auth/get-all-user/${role}`, data);
  }
}
export default new DataService();
