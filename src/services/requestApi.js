import http from "./http-common";

class DataService {
  //Api For Port 8089 / 8088
  Login(data) {
    return http.post("/auth/user-login", data);
  }
  GetMasterCategory(saasid, storeid){
    return http.get(`/Master-category/get-list-master/${saasid}/${storeid}`)
  }
  updateMasterCategory(id, name){
    return http.put(`Master-category/update-detail/${id}/${name}`)
  }
  AddMasterCategory(data){
    return http.post(`/Master-category/master/category`,data)
  }
  // GetSubCategory(saasid,storeid,categoryid){
  //   return http.get(`/Master-category/get-list/${saasid}/${storeid}/${categoryid}`)
  // }
  GetSubCategory(saasid,storeid,categoryid){
    return http.get(`/Master-category/get-list/${saasid}/${storeid}/${categoryid}`)
  }
  AddProduct(data){
    return http.post('/item/add-item',data)
  }
  AddCombo(data){
    return http.post('/combo/create',data)
  }
  
  GetItemByPage(saasid,storeid,page){
    return http.get(`/item/get-item-list-nextgen/${saasid}/${storeid}/${page}`)
  }
   
  GetItembySubcategory(saasid, storeid,SubCategory){
    return http.get(`/item/getitem-category/${saasid}/${storeid}/${SubCategory}`)
  }
  
  GetCombolist(saasid,storeid){
    return http.get(`/combo/get-combo/${saasid}/${storeid}`)
  }
   
  AddComboimage(id, formData) {
    return http.post(`combo/add-image/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  DeleteCombo(id){
    return http.delete(`combo/delete/${id}`)
  }

  EditCombo(id,data){
    return http.put(`combo/update/${id}`, data)
  }
  


  //Old Api ⬇ start from here⬇⬇⬇⬇⬇⬇⬇⬇❌

}
export default new DataService();
