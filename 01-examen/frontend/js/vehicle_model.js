const model_msg = document.getElementById("model_msg");
const model_inp_name = document.getElementById("model_inp_name");
const modelDTO = {
  id: 0,
  name: "",
};
const model_tbl_body = document.getElementById("model_tbl_body");
var _modelos = [];
const model_add = () => {
  model_msg.innerHTML = "";
  modelDTO.name = model_inp_name.value.trim();
  modelDTO.id = Math.floor(Math.random() * 1000);
  $.ajax({
    url: api + "model/add",
    type: "POST",
    data: JSON.stringify(modelDTO),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      model_msg.innerHTML = `registrado ID ${modelDTO.id}, nombre : ${modelDTO.name}`;
      model_inp_name.value = "";
      model_get();
    },
    error: (erro) => {
      model_msg.innerHTML = erro.responseText;
    },
  });
};
const model_get = () => {
  $.ajax({
    url: api + "model/",
    type: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      let datos = "";
      document.getElementById("_modelos_count").innerHTML = resp.length;
      resp.forEach((element) => {
        datos += `<tr><th scope="row">${element.id}</th>
        <td>
        <div class="input-group input-group-sm">
        <input type="text" class="form-control" value="${element.name}" id="model_update_${element.id}"/>
        </div>
        </td>
        <td>
        <button onclick="model_update_confirm(${element.id})" class="btn btn-link"><i class="fa-solid fa-file-pen"></i></button>
        <button onclick="model_del_confirm(${element.id})" class="btn btn-link"><i class="fa-solid fa-trash text-danger"></i></button>
        </td>
        </tr>`;
      });
      model_tbl_body.innerHTML = datos;
    },
    error: (erro) => {
      model_msg.innerHTML = erro.responseText;
    },
  });
};
const model_update_confirm = (id) => {
  if (confirm("estas seguro/a de actualizar el modelo de vehículo?") == true) {
    model_update(id);
  } else {
    model_get();
  }
};
const model_update = (_id) => {
  const model_update = document.getElementById(`model_update_${_id}`);
  modelDTO.id = _id;
  modelDTO.name = model_update.value.trim();
  $.ajax({
    url: api + "model/update/" + modelDTO.id,
    type: "PUT",
    data: JSON.stringify(modelDTO),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      model_msg.innerHTML = `actualizado id ${modelDTO.id}`;
      model_get();
    },
    error: (erro) => {
      model_msg.innerHTML = erro.responseText;
    },
  });
};

const model_del_confirm = (id) => {
  if (confirm("estas seguro/a de eliminar el modelo de vehículo?") == true) {
    model_del(id);
  }
};
const model_del = (_id) => {
  modelDTO.id = _id;
  $.ajax({
    url: api + "model/delete/" + modelDTO.id,
    type: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      model_msg.innerHTML = `eliminado id ${modelDTO.id}`;
      model_get();
    },
    error: (erro) => {
      model_msg.innerHTML = erro.responseText;
    },
  });
};

model_get();
