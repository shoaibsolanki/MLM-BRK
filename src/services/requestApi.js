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



  //new customesite⬇ start from here⬇⬇⬇⬇⬇⬇⬇⬇❌
  GetrecommendedItemByPage(saasid,storeid,page){
    return http.get(`/search/recommended-item/${saasid}/${storeid}/${page}`)
  }


  getReferName(ID){
    return http.get(`/search/recommended-item/${ID}`)
  }
  getProductbyitemId(ID){
    return http.get(`/item/view-item-detil/${ID}`)
  }
}
export default new DataService();
