const vehicle_msg = document.getElementById("vehicle_msg");
const vehicle_inp_patent = document.getElementById("vehicle_inp_patent");
const vehicle_inp_brand = document.getElementById("vehicle_inp_brand");
const vehicle_inp_model = document.getElementById("vehicle_inp_model");
const vehicle_inp_category = document.getElementById("vehicle_inp_category");
const vehicleDTO = {
  patent: "",
  brand: "",
  model: 0,
  category: 0,
};
var models = [];
const vehicle_tbl_body = document.getElementById("vehicle_tbl_body");
var _vehicleos = [];
const vehicle_add = () => {
  vehicle_msg.innerHTML = "";
  vehicleDTO.patent = vehicle_inp_patent.value.trim();
  vehicleDTO.brand = vehicle_inp_brand.value.trim();
  vehicleDTO.model = vehicle_inp_model.value.trim();
  vehicleDTO.category = vehicle_inp_category.value.trim();
  $.ajax({
    url: api + "vehicle/add",
    type: "POST",
    data: JSON.stringify(vehicleDTO),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      vehicle_msg.innerHTML = `registrado ID ${vehicleDTO.patent}, nombre : ${vehicleDTO.patent}`;
      vehicle_inp_patent.value = "";
      vehicle_inp_brand.value = "";
      vehicle_inp_category.value = "";
      vehicle_inp_model.value = "";
      vehicle_get();
    },
    error: (erro) => {
      vehicle_msg.innerHTML = erro.responseText;
    },
  });
};
const vehicle_get = () => {
  $.ajax({
    url: api + "vehicle/",
    type: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      let datos = "";
      document.getElementById("_vehicles_count").innerHTML = resp.length;
      resp.forEach((element) => {
        model_get_select(element.patent, element.model);
        category_get_select(element.patent, element.category);
        datos += `<tr>
        <td scope="row">${element.patent}</td>
        <td>
        <div class="input-group input-group-sm">
            <input type="text" class="form-control" value="${element.brand}" id="vehicle_update_brand_${element.patent}"/>
        </div>
        </td>
        <td>
        <div class="input-group input-group-sm">
            <select class="form-select form-select-sm" id="vehicle_update_model_${element.patent}"> </select>
        </div>
        </td>
        <td>
        <div class="input-group input-group-sm">
        <select class="form-select form-select-sm" id="vehicle_update_category_${element.patent}"> </select>
        </div>
        </td>
        <td>
        <button onclick="vehicle_update_confirm('${element.patent}')" class="btn btn-link"><i class="fa-solid fa-file-pen"></i></button>
        <button onclick="vehicle_del_confirm('${element.patent}')" class="btn btn-link"><i class="fa-solid fa-trash text-danger"></i></button>
        </td>
        </tr>`;
      });
      vehicle_tbl_body.innerHTML = datos;
    },
    error: (erro) => {
      vehicle_msg.innerHTML = erro.responseText;
    },
  });
};
const vehicle_update_confirm = (id) => {
  if (
    confirm("estas seguro/a de actualizar el vehicleo de vehículo?") == true
  ) {
    vehicle_update(id);
  } else {
    vehicle_get();
  }
};
const vehicle_update = (_id) => {
  const vehicle_update_brand = document.getElementById(
    `vehicle_update_brand_${_id}`
  );
  const vehicle_update_model = document.getElementById(
    `vehicle_update_model_${_id}`
  );
  const vehicle_update_category = document.getElementById(
    `vehicle_update_category_${_id}`
  );

  vehicleDTO.patent = _id;
  vehicleDTO.brand = vehicle_update_brand.value.trim();
  vehicleDTO.model = vehicle_update_model.value.trim();
  vehicleDTO.category = vehicle_update_category.value.trim();

  $.ajax({
    url: api + "vehicle/update/" + vehicleDTO.patent,
    type: "PUT",
    data: JSON.stringify(vehicleDTO),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      vehicle_msg.innerHTML = `actualizado id ${vehicleDTO.patent}`;
      vehicle_get();
    },
    error: (erro) => {
      vehicle_msg.innerHTML = erro.responseText;
    },
  });
};

const vehicle_del_confirm = (id) => {
  if (confirm("estas seguro/a de eliminar el vehicleo de vehículo?") == true) {
    vehicle_del(id);
  }
};
const vehicle_del = (_id) => {
  vehicleDTO.patent = _id;
  $.ajax({
    url: api + "vehicle/delete/" + vehicleDTO.patent,
    type: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      vehicle_msg.innerHTML = `eliminado id ${vehicleDTO.patent}`;
      vehicle_get();
    },
    error: (erro) => {
      vehicle_msg.innerHTML = erro.responseText;
    },
  });
};

vehicle_get();

const model_get_select = (patent, model) => {
  $.ajax({
    url: api + "model/",
    type: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      resp.forEach((element) => {
        models.push(element);
        var option = document.createElement("option");
        option.text = `${element.name}`;
        option.value = `${element.id}`;
        var select = document.getElementById("vehicle_inp_model");
        select.appendChild(option);
        if (model > 0) {
          if (model == option.value) {
            option.selected = true;
          }
          var select = document.getElementById(
            `vehicle_update_model_${patent}`
          );
          select.appendChild(option);
        }
      });
    },
    error: (erro) => {
      vehicle_msg.innerHTML = erro.responseText;
    },
  });
};

model_get_select(0, 0);

const category_get_select = (patent, category) => {
  $.ajax({
    url: api + "category/",
    type: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      resp.forEach((element) => {
        var option = document.createElement("option");
        option.text = `${element.name}`;
        option.value = `${element.id}`;
        var select = document.getElementById("vehicle_inp_category");
        select.appendChild(option);
        if (category > 0) {
          if (category == option.value) {
            option.selected = true;
          }
          var select = document.getElementById(
            `vehicle_update_category_${patent}`
          );
          select.appendChild(option);
        }
      });
    },
    error: (erro) => {
      vehicle_msg.innerHTML = erro.responseText;
    },
  });
};
category_get_select(0, 0);
