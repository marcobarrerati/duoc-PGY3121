const category_msg = document.getElementById("category_msg");
const category_inp_name = document.getElementById("category_inp_name");
const categoryDTO = {
  id: 0,
  name: "",
};
const category_tbl_body = document.getElementById("category_tbl_body");

const category_add = () => {
  category_msg.innerHTML = "";
  categoryDTO.name = category_inp_name.value.trim();
  categoryDTO.id = Math.floor(Math.random() * 1000);
  $.ajax({
    url: api + "category/add",
    type: "POST",
    data: JSON.stringify(categoryDTO),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      category_msg.innerHTML = `registrado ID ${categoryDTO.id}, nombre : ${categoryDTO.name}`;
      category_inp_name.value = "";
      category_get();
    },
    error: (erro) => {
      category_msg.innerHTML = erro.responseText;
    },
  });
};
const category_get = () => {
  $.ajax({
    url: api + "category/",
    type: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      let datos = "";
      document.getElementById("_categorias_count").innerHTML = resp.length;
      resp.forEach((element) => {
        datos += `<tr><th scope="row">${element.id}</th>
        <td>
        <div class="input-group input-group-sm">
        <input type="text" class="form-control" value="${element.name}" id="category_update_${element.id}"/>
        </div>
        </td>
        <td>
        <button onclick="category_update_confirm(${element.id})" class="btn btn-link"><i class="fa-solid fa-file-pen"></i></button>
        <button onclick="category_del_confirm(${element.id})" class="btn btn-link"><i class="fa-solid fa-trash text-danger"></i></button>
        </td>
        </tr>`;
      });
      category_tbl_body.innerHTML = datos;
    },
    error: (erro) => {
      category_msg.innerHTML = erro.responseText;
    },
  });
};
const category_update_confirm = (id) => {
  if (
    confirm("estas seguro/a de actualizar el categoryo de vehículo?") == true
  ) {
    category_update(id);
  } else {
    category_get();
  }
};
const category_update = (_id) => {
  const category_update = document.getElementById(`category_update_${_id}`);
  categoryDTO.id = _id;
  categoryDTO.name = category_update.value.trim();
  $.ajax({
    url: api + "category/update/" + categoryDTO.id,
    type: "PUT",
    data: JSON.stringify(categoryDTO),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      category_msg.innerHTML = `actualizado id ${categoryDTO.id}`;
      category_get();
    },
    error: (erro) => {
      category_msg.innerHTML = erro.responseText;
    },
  });
};

const category_del_confirm = (id) => {
  if (confirm("estas seguro/a de eliminar el categoryo de vehículo?") == true) {
    category_del(id);
  }
};
const category_del = (_id) => {
  categoryDTO.id = _id;
  $.ajax({
    url: api + "category/delete/" + categoryDTO.id,
    type: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      category_msg.innerHTML = `eliminado id ${categoryDTO.id}`;
      category_get();
    },
    error: (erro) => {
      category_msg.innerHTML = erro.responseText;
    },
  });
};

category_get();
