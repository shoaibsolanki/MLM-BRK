import http from "./http-common";

class DataService {
  //Api For Port 8089 / 8088
  Login(data) {
    return http.post("/auth/user-login", data);
  }
  GetMasterCategory(saasid, storeid){
    return http.get(`/Master-category/get-list-master/${saasid}/${storeid}`)
  }
  GetSubCategoryByItem(saasid,storeid,categoryname,page){
    return http.get(`/item/get-category-list/${saasid}/${storeid}/${categoryname}/${page}`)
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
  


  //new customesite⬇ start from here⬇⬇⬇⬇⬇⬇⬇⬇❌
  GetrecommendedItemByPage(saasid,storeid,page){
    return http.get(`/search/recommended-item/${saasid}/${storeid}/${page}`)
  }

  GetAllCategory(saasid, storeid){
    return http.get(`/category/get-list/${saasid}/${storeid}`)
  }
 
  getProductbyitemId(ID){
    return http.get(`/item/view-item-detil/${ID}`)
  }
  getReferName(ID){
    return http.get(`/customer/getReferName/${ID}`)
  }

  createCustomer(data){
    return http.post(`/customer/create/v2`,data)
  }
  getImgbyItemId(ID){
    return http.get(`/item/get-item-images/${ID}`)
  }
 
}
export default new DataService();
