
   function CreateJob() {
      return (
         <div className="container-fluid mt-3 bg-primary-subtle border border-primary rounded-4  p-3">
               <h3 className="display-2 text-center">Tạo mới công việc</h3>
   
      
               <form action="/action_page.php" className="was-validated">
                     <div className="mb-4 mt-4 row">
                        <label for="uname" className="col-sm-2 col-form-label ">Tên Công ty:</label>
                        <div class="col-sm-10">
                           <input type="text" className="form-control" maxlength="100" id="uname" placeholder=" " name="uname" required/>
                        </div>
                     </div> 
                     <div className="mb-4 mt-4 row">
                        <label for="uname" className="col-sm-2 col-form-label ">Vị trí cần tuyển:</label>
                        <div class="col-sm-10">
                           <input type="text" className="form-control" id="uname" placeholder=" " name="uname" required/>
                        </div>
                     </div> 
                     <div className="mb-4 mt-4 row">
                        <label for="uname" className="col-sm-2 col-form-label ">Mức lương:</label>
                        <div class="col-sm-10">
                           <input type="text" className="form-control" maxlength="100" id="uname" placeholder=" " name="uname" required/>
                        </div>
                     </div> 
                     <div className="mb-4 mt-4 row">
                        <label for="uname" className="col-sm-2 col-form-label ">Kinh nghiệm làm việc:</label>
                        <div class="col-sm-10">
                           <input type="text" className="form-control" maxlength="5000" id="uname" placeholder=" " name="uname" required/>
                        </div>
                     </div> 
                     <div className="mb-4 mt-4 row">
                        <label for="uname" className="col-sm-2 col-form-label ">Nội dung chi tiết:</label>
                        <div class="col-sm-10">
                           <input type="text" className="form-control" id="uname" placeholder=" " name="uname" required/>
                        </div>
                     </div> 
                     <div className="mb-4 mt-4 row">
                        <label for="uname" className="col-sm-2 col-form-label ">Địa điểm làm việc:</label>
                        <div class="col-sm-10">
                           <input type="text" className="form-control" maxlength="300" id="uname" placeholder=" " name="uname" required/>
                        </div>
                     </div> 
               </form>
               <div className="d-flex justify-content-center">
                     <button type="button" className="btn btn-success btn-lg text-black">Đăng tải</button>
                     </div>
         </div>        



      )
   }

   export default CreateJob;




