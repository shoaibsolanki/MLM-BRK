import http from "./http-common";

class DataService {
  //Api For Port 8089 / 8088
  Login(data) {
    return http.post("/auth/user-login", data);
  }
  GetMasterCategory(saasid, storeid){
    return http.get(`/Master-category/get-list-master/${saasid}/${storeid}`)
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



  //Old Api ⬇ start from here⬇⬇⬇⬇⬇⬇⬇⬇❌

}
export default new DataService();
