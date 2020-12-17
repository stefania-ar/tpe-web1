document.addEventListener("DOMContentLoaded", function(){

    //botones
    document.getElementById("AgregarFilaID").addEventListener("click", agregar1); //btn Agregar
    document.getElementById("Agregar3pelisID").addEventListener("click", agregar_3); //btn Agregar3
    document.getElementById("ResetTablaID").addEventListener("click", vaciar); //btn Vaciar
    document.getElementById("buttonfiltrar").addEventListener("click", filtrar); //btn Filtrar
    mostrar_linea ();

    async function filtrar(){
        let value = document.getElementById("idinput").value.toLowerCase();
        let lista = document.getElementById("tableID");
        let url = "https://web-unicen.herokuapp.com/api/groups/105/peliculas/";
        try{
            let auxr = await fetch (url);
            let json = await auxr.json();
            console.log(json);
            lista.innerHTML= "";
            for (const elem of json.peliculas) {
              let nombre = elem.thing.nombre.toLowerCase();
              if (nombre.includes(value)){
                lista.innerHTML +=
                  `<tr>
                      <td>${elem.thing.año}</td>
                      <td>${elem.thing.nombre}</td>
                      <td>${elem.thing.nacionalidad}</td>
                      <td>
                        <button class="bfila" id=${elem._id}>Borrar Fila</button>
                        <button class="efila" id=${elem._id}>Editar Fila</button>
                      </td>
                  </tr>`
                  document.querySelectorAll('.bfila').forEach(item => {
                            item.addEventListener('click', function() {
                              eliminar(this.id);
                            })
                        })
                  document.querySelectorAll('.efila').forEach(item => {
                            item.addEventListener('click', function() {
                              editar(this.id);
                            })
                        })
                    }
                }
        }
        catch(e){
            console.log(e);
        }
      }


    async function agregar1(){
        let objeto = {
            "thing": {
                "año": document.getElementById("inputAñoID").value,
                "nombre": document.getElementById ("inputPelisID").value,
                "nacionalidad": document.getElementById ("inputPaisID").value,
            }
        };
        agregar(objeto);
    };

    async function agregar_3 (){
        let objeto1 = {
            "thing": {
                "año": "2017",
                "nombre": "Coco",
                "nacionalidad": "Estados Unidos",
            }};
        let objeto2 = {
            "thing": {
              "año": "2009",
              "nombre": "Robando Vidas",
              "nacionalidad": "Estados Unidos",
            }};
        let objeto3 = {
            "thing": {
              "año": "2009",
              "nombre": "El Secreto de sus Ojos",
              "nacionalidad": "Argentina",
            },
        };
        agregar(objeto1);
        agregar(objeto2);
        agregar(objeto3);
    };

    async function editar (id){
        let objeto = {
            "thing": {
                "año": document.getElementById("inputAñoID").value,
                "nombre": document.getElementById ("inputPelisID").value,
                "nacionalidad": document.getElementById ("inputPaisID").value,
            }
        };
        try {
            let url = "https://web-unicen.herokuapp.com/api/groups/105/peliculas/";
            let r = await fetch (url);
            let json = await r.json();
            let url_edit = id;
            console.log(url_edit+"dentro de editar")
            let urleditada = "https://web-unicen.herokuapp.com/api/groups/105/peliculas/"+url_edit;
            console.log(urleditada)
            await fetch (urleditada,{
                "method":"PUT",
                "headers":{"Content-Type": "application/json"},
                "body": JSON.stringify(objeto)
            });
            mostrar_linea ();
        }
        catch(e){
            console.log(e);
        }
    };

    async function eliminar (id){
        try {
            let url = "https://web-unicen.herokuapp.com/api/groups/105/peliculas/";
            let r = await fetch (url);
            let json = await r.json();
            let url_del = id
            console.log(id+'Dentro de eliminar');
            let urlborrada = "https://web-unicen.herokuapp.com/api/groups/105/peliculas/"+url_del;
            console.log(urlborrada)
            await fetch (urlborrada,{
                "method":"DELETE"
            });
            mostrar_linea()
        }
        catch(e){
            console.log(e);
        }
    };

    async function vaciar () {
        try {
            let url = "https://web-unicen.herokuapp.com/api/groups/105/peliculas/";
            let r = await fetch (url);
            let json = await r.json();
            for (const elem of json.peliculas){
                let url_del = elem._id;
                console.log(url_del)
                let urlborrada = "https://web-unicen.herokuapp.com/api/groups/105/peliculas/"+url_del;
                console.log(urlborrada)
                await fetch (urlborrada,{
                    "method":"DELETE"
                });
            }
            mostrar_linea()
        }
        catch (e){
            console.log(e);
        }
    };

    async function agregar (objeto){
        try{
            let url = "https://web-unicen.herokuapp.com/api/groups/105/peliculas/";
            let r = await fetch (url, {
                "method": "POST",
                "headers":{"Content-Type": "application/json"},
                "body": JSON.stringify(objeto)
            })
            await r.json();
            mostrar_linea ()
        }
        catch (e){
            console.log(e);
        }
    }

    async function mostrar_linea(){
        let lista = document.getElementById("tableID");
        let url = "https://web-unicen.herokuapp.com/api/groups/105/peliculas/";
        try{
            let auxr = await fetch (url);
            let json = await auxr.json();
            console.log(json);
            lista.innerHTML= "";
            for (const elem of json.peliculas) {
                lista.innerHTML +=
                  `<tr>
                      <td>${elem.thing.año}</td>
                      <td>${elem.thing.nombre}</td>
                      <td>${elem.thing.nacionalidad}</td>
                      <td>
                        <button class="bfila" id=${elem._id}>Borrar Fila</button>
                        <button class="efila" id=${elem._id}>Editar Fila</button>
                      </td>
                  </tr>`
                  document.querySelectorAll('.bfila').forEach(item => {
                            item.addEventListener('click', function() {
                              eliminar(this.id);
                            })
                        })
                  document.querySelectorAll('.efila').forEach(item => {
                            item.addEventListener('click', function() {
                              editar(this.id);
                            })
                        })
                }
        }
        catch(e){
            console.log(e);
        }
    };
})
