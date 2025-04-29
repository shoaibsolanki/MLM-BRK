import http from "./http-common";

class DataService {
  //Api For Port 8089 / 8088
  Login(data) {
    return http.post("/auth/user-login", data);
  }
  DashBoardDataGet(saasId){
    return http.get(`dashboard/get-dashboard-details/${saasId}`)
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
  GetSubCategorybycatgoryid(saasid,storeid,categoryid){
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
   
  GetSubCategory(saasid, storeid){
    return http.get(`category/get-list/${saasid}/${storeid}`)
  }
  EditSubCategory(id,data){
    return http.put(`/category/update-detil/${id}`,data)
  }
  AddSubCategory(data){
    return http.post(`category/store/category`,data)
  }
  AddSubCatImage(id, file){
    return http.post(`category/save-image-by-category/${id}`,file ,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  }

  DeleteSubCat(id){
    return http.delete(`category/delete-detail/${id}`)
  }
  
  GetAllCustomer(saasId){
    return http.get(`/customer/get-custm-detail/${saasId}`)
  }
  
 GetComplain(saasId){
  return http.get(`/complaints/get-complaint-list/${saasId}`)
 }
 GetRewardPoint(customerId){
  return http.get(`/customer/get-points/${customerId}`)
 }

 GetGifts(saasId){
  return http.get(`gifts/get-gift-list/${saasId}`)
 }
 CreateGifts(data){
  return http.post(`/gifts`, data)
 }
 AddThumbnailImage(id, file){
  return http.post(`/item/save-image/${id}
`,file , {
  headers: { "Content-Type": "multipart/form-data"}
})
 }

 EditGift(id, data){
  return http.put(`gifts/${id}`, data)
 }
 DeleteGift(id){
  return http.delete(`/gifts/${id}`)
 }

 UpdateItem(id,data){
  return http.put(`/item/update-item/${id}`,data)
 }
 
 ImagesUpdate(id , formData){
  return http.patch(`/item/update-item-images/${id}`, formData, {
    headers:{
      "Content-Type":"multipart/form-data"
    }
  })
 }

 GetMLMTree(id){
  return http.get(`customer/getMLMTree/${id}`)
 }

 UpdateSlider(saasId,formData){
  return http.post(`saas-master/save-brandlogo/${saasId}`, formData, {
    headers:{
      "Content-Type":"multipart/form-data"
    }
  })
 }
 
 GetAllOrderBypage(saasId, page, size){
  return http.get(`/order/retailler-view-order/${saasId}/${page}/${size}`)
 }

 GetIncomeByDesignations(saasId, designation){
  return http.get(`/customer/designations/${saasId}/${designation}`)
 }
  
 UpdateRpValue(data){
  return http.post(`/RpBonus/create-rp-value`, data)
 }

 UpdateRpBounse(id,data){
  return http.put(`RpBonus/upadte-rpBonusValue/${id}`,data)
 }
 
 ViewOrderDetail(id){
  return http.get(`/order/viewOrderDetails/${id}`)
 }
  
 GetListkyc(saasId){
  return http.get(`/kyc/get-kyc/${saasId}`)
 }

 GetCustomerKycDetail(saasId, storeId, id){
  return http.get(`kyc/get-AllkycDetail-customer/${saasId}/${storeId}/${id}`)
 }

 UpdateKycForCutomer(saasId, storeId, customerId, status){
  return http.patch(`/kyc/update-kyc-customer/${saasId}/${storeId}/${customerId}/${status}`)
 } 
//Add gallery image
Addgallery(saasId, storeId, formData) {
  return http.post(`item/add-gallery-image/${saasId}/${storeId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

 GetOrderDetail(saasId,storeId,orderId){
  return http.get(`/order/get-ordermaster-details/${saasId}/${storeId}/${orderId}`)
}

GetAddress(saasId, storeId, addressId){
  return http.get(`/customer/get-address/${saasId}/${storeId}/${addressId}`)
}

GetOrderItemData(saasId,storeId,orderId){
  return http.get(`/order/view-order-detail-web/${storeId}/${saasId}/${orderId}`)
}

OnlineTransaction(data) {
  return http.post("/transaction/save-transaction-omni", data);
}

UpdateOrderByid(storeId, saasId, orderId, status){
  return http.put(`/order/update-status/${storeId}/${saasId}/${orderId}/${status}`)
}

UpdateUser(id,data){
  return http.put(`customer/update/${id}`,data)
}

UpdateSponsor(customerId, referId){
  return http.put(`/customer/update-refer-by/${customerId}/${referId}`)
} 

GetUom(saasId, storeId){
  return http.get(`/omni/get-uom/${saasId}/${storeId}`)
}

AddUom(data)
{
  return http.post(`/omni/create_uom`,data)
}
EditUom(id,uom)
{
  return http.patch(`/omni/update_uom/${id}/${uom}`)
} 
DeleteUom(id) {
  return http.patch(`/omni/delete_uom/${id}`);
}
 
//testimonial

Addtestimonial(saasId,storeId,data){
  return http.post(`testimonial/add-image/${saasId}/${storeId}`,data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    
  )
}
 
GetTestimonial(saasId,storeId){
  return http.get(`testimonial/get-date/${saasId}/${storeId}`)
}
GetTestimonialforcustomer(){
  return http.get(`testimonial/get-date`)
}

DeleteTestimonial(id){
  return http.delete(`testimonial/delete/${id}`)
}

EditTestimonail(id,data){
  return http.patch(`testimonial/update/${id}` , data ,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

  )
}









  //new customesite⬇ start from here⬇⬇⬇⬇⬇⬇⬇⬇❌
 
  GetrecommendedItemByPage(saasid,storeid,page){
    return http.get(`/search/recommended-item/${saasid}/${storeid}/${page}`)
  }

  GetAllCategory(saasid, storeid){
    return http.get(`/category/get-list/${saasid}/${storeid}`)
  }
 
  getProductbyitemId(ID,storeid){
    return http.get(`/item/view-item-detil/${ID}/${storeid}`)
  }
  getReferName(ID){
    return http.get(`/customer/getReferName/${ID}`)
  }
  getRefercode(ID){
    return http.get(`/customer/get-points/${ID}`)
  }

  createCustomer(data){
    return http.post(`/customer/create/v2`,data)
  }
  getImgbyItemId(ID){
    return http.get(`/item/get-item-images/${ID}`)
  }
 
  GetAllBanner(saasid){
    return http.get(`/saas-master/get-brandlogos/${saasid}`)
  }
  GetrecommendedItemByKeyword(storeid,saasid,Keyword){
    return http.get(`/search/get-result/${storeid}/${saasid}/${Keyword}`)
  }
  AddItemsToCart(item, saasId, storeId, id) {
    return http.post(
      `/price-check/addproduct/${saasId}/${storeId}/${id}`,
      item
    );
  }
  GetCartItems(saasId, storeId, id) {
    return http.get(`/price-check/getcart/${saasId}/${storeId}/${id}`);
  }
  DeleteItemsFromCart(saasId, storeId, id, itemid) {
    return http.delete(
      `/price-check/deleteproduct/${saasId}/${storeId}/${id}/${itemid}`
    );
  }
  DeleteAllItemsFromCart(saasId, storeId, id) {
    return http.delete(
      `price-check/delete-all-products/${saasId}/${storeId}/${id}`
    );
  }
  DeleteAddress (saasId, storeId, id) {
    return http.delete(
      `customer/delete-customer-address-app/${saasId}/${storeId}/${id}`
    );
  }
  GetSavedAddress(id, saasId, storeId) {
    return http.get(
      `customer/get-all-customer-address-app/${id}/${saasId}/${storeId}`
    );
  }
  Getkycstatus(saasId, storeId,id) {
    return http.get(
      `kyc/get-kyc-customer/${saasId}/${storeId}/${id}`
    );
  }
  OrderHistory(storeId, saasId, id) {
    return http.get(
      `order/view-order-detail-fastside/${storeId}/${saasId}/${id}`
    );
  }
  CreateOrder(data) {
    return http.post(`/order/create/order/master`, data);
  }
  addreview(data) {
    return http.post(`/review/add`, data);
  }
  CreateKYC(data) {
    return http.post(`/kyc/create`, data);
  }
  SaveAddress(data, id) {
    return http.post(`customer/create-address/${id}`, data);
  }
  SaveComplaint(data, id) {
    return http.post(`/complaints`, data);
  }
  GetPointHistory(customerId){
    return http.get(`/customer/get-rp-by-custm/${customerId}`)
   }
   GetGalleryLink(saasId, storeId) {
    return http.get(
      `item/get-gallery-image/${saasId}/${storeId}`
    );
  }
  GetTeamHistory(customerId){
    return http.get(`/customer/mlm-level/${customerId}`)
   }

   Getreview(itemid){
    return http.get(`/review/item/${itemid}`)
   }
   GetwalletByCustomId(storeid,customerId){
    return http.get(`/wallet/get-customer-wallet/${storeid}/${customerId}`)
   }
   kycDocumentUpload(saasId, storeId, customerId, formData) {
    return http.patch(`/kyc/add-documentImg/${saasId}/${storeId}/${customerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
export default new DataService();
