import { useEffect, useState } from "react";

//Hook personalizado que retorna un array con valores directo desde una API del gorbierno nacional
let API_URL='https://www.cultura.gob.ar/api/v2.0/museos/?format=json'

export function useMuseos (busqueda) {
  const [museos, setMuseos] = useState(null);

  /*Funcion asincrona que se conecta a la API y retorna un ARRAY[] de valores
  En este caso la API para no devolver el conjunto total de datos en cada respuesta
  envia un atributo 'next' el cual contiene la siguiente "paginacion" de los resultados totales.
  Es por eso que la peticion se hace en un bucle while y se ejecuta mientras que la API
  devuelva un atributo next,ademas de los resultados.
  */
  const getMuseos = async () => {
    let resultados=[];
    let next=true
    let url=API_URL
    while (next) {
      try {
        const peticion = await fetch(url);

        switch (peticion.status) {
        case 200:
          const valores = await peticion.json();
          //Agrego los museos al array general 'resultados'
          valores.results.map((museo)=>resultados.push(museo))

          //Si existe 'next' cambio la url de la peticion para obtener los museos restantes
          if(valores.next){
            url=valores.next
          }else{
            next=false
          }
          break;
        default:
          console.log("Error desconocido");
          return null;
        }
      } catch {
        console.log("No se pudo conectar al servidor para obtener los museos");
        return null;
      }
    }

    return resultados;
  }


  /*En el useEffect,se va hacer la llamada al fetching de datos de manera asincrona
  la primera vez que se monte el componente,y cada vez que reciba un nuevo parametro de busqueda
  */
  useEffect(()=>{
    const fetchMuseos = async () => {
      //Hago la llamada a la funcion asincrona de arriba para el fecthing de datos
      const museos_nacionales = await getMuseos();
      console.log("MUSEOS NACIONALES:")
      console.log(museos_nacionales)

      //Si hubo un parametro de busqueda filtro entre todos los registros,sino asigno el total de los
      //resultados al array mappedMuseos
      if (museos_nacionales) {
        let mappedMuseos;

        if (busqueda === "") {
          mappedMuseos = museos_nacionales
        } else {
          mappedMuseos = museos_nacionales.filter(museo =>
            museo.nombre.toLowerCase().includes(busqueda.toLowerCase())
          );
        }
        //seteo en el estado que es el que se va a enviar
        setMuseos(mappedMuseos);
      }
    };

    fetchMuseos();
  //indico la dependencia del useEffect
  },[busqueda])

  return { museos };
}