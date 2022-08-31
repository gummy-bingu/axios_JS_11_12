// function getProjects
getProjects();

function getProjects(){
    apiGetProjects()
    .then((respone) => {
        console.log('API projects:', respone.data);
        let projects = respone.data.map(project =>{
            return new Project(project.id, project.account, project.name, project.password, project.email, project.image, project.type, project.language, project.description);
        })
        
        display(projects)
    })
    .catch((error)=>{
        console.log(error);
    });
}

function addProject(project){
    apiAddProject(project)
    .then(()=>{
       getProjects();
    })
    .catch((error)=>{
        console.log(error);
    });

    let isValid = validateForm();
    // Kiểm tra nếu form không hợp lệ => kết thúc hàm
    if (!isValid) {
      return;
    }
}

function deleteProject(projectId) {
    apiDeleteProject(projectId)
      .then(() => {
        getProjects();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateProject(projectId, project){
    apiUpdateProject(projectId, project)
    .then(()=>{
      getProjects
    })
    .catch((error) => {
      console.log(error);
    });
  }
  function resetForm(){
   dom("#MaDA").value ="";
   dom("#TaiKhoan").value="";
   dom("#MatKhau").value="";
   dom("#HoTen").value="";
   dom("#Email").value="";
   dom("#HinhAnh").value="";
   dom("#loaiNgonNgu").value="";
   dom("#loaiNguoiDung").value="";
  }
//**************
function display(projects){
    let output = projects.reduce((result, project, index) => {
     return ( result + `
     <tr> 
      <td>${index +1}</td>
      <td>${project.account}</td>
      <td>${project.password}</td>
      <td>${project.name}</td>
      <td>${project.email}</td>
      <td>${project.language}</td>
      <td>${project.type}</td>
      <td>
      <button 
      class="btn btn-danger" 
      data-id = "${project.id}"
      data-type = "delete"
      >
      Xóa
      </button>
      <button class="btn btn-success"
      data-id = "${project.id}"
      data-type = "update"
      data-toggle ="modal"
      data-target ="#myModal"
      >Cập nhật
      </button>
      </td>
     `
     );
    }, "")
    dom('#tblDanhSachNguoiDung').innerHTML = output
}

function dom(selector){
    return document.querySelector(selector)
}

dom('#btnThemNguoiDung').addEventListener("click", () => {

    dom(".modal-title").innerHTML = "Thêm sản phẩm"
    dom(".modal-footer").innerHTML =
    `
    <button class="btn btn-danger" data-dismiss ="modal">Hủy</button>
    <button class="btn btn-primary" data-type="add">Thêm</button>

    `;
    resetForm();
});


dom(".modal-footer").addEventListener("click",(evt) => {
  console.log(evt.target.innerHTML === "Thêm");
  let elementType = evt.target.getAttribute("data-type");
  let id = dom("#MaDA").value;
  let account = dom("#TaiKhoan").value;
  let password = dom("#MatKhau").value;
  let name = dom("#HoTen").value;
  let email = dom("#Email").value;
  let image= dom("#HinhAnh").value;
  let language = dom("#loaiNgonNgu").value;
  let type = dom("#loaiNguoiDung").value;
  let project = new Project (null, account, password, name, email, image, type, language)


  if(elementType === "add"){
    addProject(project);
  }
  else if (elementType === 'update')
  {
    updateProject(id, project)
  }

});


dom("#tblDanhSachNguoiDung").addEventListener("click", (evt) => {
    console.log(evt.target)
    let id = evt.target.getAttribute('data-id');
  
    let elType = evt.target.getAttribute('data-type');
    if (elType === 'delete') {
      deleteProject(id);
    }
    else if( elType === 'update'){
    dom(".modal-title").innerHTML = "Cập nhật sản phẩm"
    dom(".modal-footer").innerHTML =
    `
    <button class="btn btn-danger" data-dismiss ="modal">Hủy</button>
    <button class="btn btn-primary" data-type="update">Cập nhật</button>
    `;
    
    apiGetProjectById(id)
    .then((response)=> {
      let project = response.data
      dom("#MaDA").value = project.id;
      dom("#TaiKhoan").value = project.account;
      dom("#MatKhau").value = project.password;
      dom("#HoTen").value = project.name;
      dom("#Email").value = project.email;
      dom("#loaiNgonNgu").value = project.language;
      dom("#loaiNguoiDung").value = project.type;
      

    })
    .catch((error)=> {
      console.log(error);
    })
    }
})
////
function validateAccount() {
  let acc = dom("#TaiKhoan").value;
  let spanEl = dom("#Account");
  // Kiểm tra rỗng
  if (!acc) {
    spanEl.innerHTML = "Tài khoản không được để trống";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}
function validateName() {
  let name = dom("#HoTen").value;
  let spanEl = dom("#Name");
  let regex = /^[a-zA-Z'-'\sáàảãạăâắằấầặẵẫậéèẻ ẽẹêếềểễệóòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ ÊỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$/;
  
  // Kiểm tra rỗng
  if (!name) {
    spanEl.innerHTML = "Tên không được để trống";
    return false;
  }
  else if (!regex.test(name)){
    spanEl.innerHTML =" Tên không được để kí tự đặc biệt hoặc số";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
function validatePassword(){
  let password = dom("#MatKhau").value;
  let spanEl = dom("#Password");
  let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,8}$/;
  if (!password) {
    spanEl.innerHTML = "Mật khẩu không được để trống";
    return false;
  }
  if (!regex.test(password)) {
    spanEl.innerHTML =
      "Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8";
    return false;
}
spanEl.innerHTML = "";
return true;
}
function validateEmail(){
  let email = dom("#Email").value;
  let spanEl = dom("#email");
  let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
    spanEl.innerHTML = "Mật khẩu không được để trống";
    return false;
  }
  else if (!regex.test(email)) {
    spanEl.innerHTML =
      "Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8";
    return false;
}
spanEl.innerHTML ="";
return true;
}
function validateUserType(){
  let user = dom("#loaiNguoiDung").value;
  let spanEl = dom("#userType");
  if(!user){
    spanEl.innerHTML = "Phải chọn loại người dùng";
    return false;
  }
  spanEl.innerHTML ="";
  return true;
}
function validateLanguage(){
  let language = dom("#loaiNgonNgu").value;
  let spanEl = dom("#languageType");
if(!language){
  spanEl.innerHTML ="Phải chọn ngôn ngữ";
  return false;
}
spanEl.innerHTML = "";
return true;
}
function validateImage(){
  let img = dom("#HinhAnh").value;
  let spanEl = dom("#image");
  if (!img) {
    spanEl.innerHTML = "Hình ảnh không được để trống";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
function validateDescription(){
  let des = dom("#MoTa").value;
  let spanEl =dom("#Description");
  if(!des)
  {
    spanEl.innerHTML = "Mô tả không được để trống";
    return false;
  }
  else if (des.length > 60){
    spanEl.innerHTML ="Không được vượt quá 60 kí tự ";
    return false;
  }
  spanEl.inner = "";
  return true;
}

function validateForm() {
  // Kĩ thuật đặt cờ hiệu, mặc định ban đầu xem như form hợp lệ
  let isValid = true;

  isValid =
    validateAccount() & validateName()  & validatePassword()  & validateEmail() &validateImage() & validateUserType() & validateLanguage() &validateDescription();

  if (!isValid) {
    alert("Form không hợp lệ");
    return false;
  }

  return true;
}
