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
  DeleteCategory(id){
    return http.delete(`/Master-category/delete-detail/${id}`)
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
  AddImages(id, formData){
    return http.post(`/item/add-item-images/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
  GetRpData(saasid){
    return http.get(`RpBonus/get-rpBonusValue/${saasid}`)
  }
  BonusType(){
    return http.get(`RpBonus/get-rpBonusType`)
  }
  CreateBonus(data){
    return http.post(`RpBonus/create-rpBonusValue`,data)
  }
  DeleteRp(id){
    return http.put(`RpBonus/inactive-rpBonusValue/${id}`)
  }
  GetDistributor(page,size,saasid, storeid){
    return http.get(`/user-master/get-distributer/${page}/${size}/${saasid}/${storeid}`)
  }
  CreateDistributor(data){
    return http.post(`auth/user-registration`,data)
  }
  EditDistributor(id,data){
    return http.put(`register/update-user/${id}`, data)
  }
  
  GetRpTransaction(saasid){
    return http.get(`transactions/rp/get-all/${saasid}`)
  }

  GetRpBonusvalue(saasid){
    return http.get(`RpBonus/get-rp-value-list/${saasid}`)
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
