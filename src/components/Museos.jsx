import { useEffect, useRef, useState } from "react";
import { useMuseos } from "../hooks/useMuseos";

function Museos () {

  const [museoElegido, setMuseoElegido] = useState({
    id: null,
    url: '',
    link: '',
    nombre: '',
    direccion: '',
    telefono: '',
    descripcion: '',
    email: '',
    provincia: '',
    depende_de: '',
    autoridad: ''
  });

  const [nombre,setNombre]=useState('')
  const inputRef=useRef()

  function handleNombre (){
    setNombre(inputRef.current.value)
    setMuseoElegido({...museoElegido,id:null})
  }

  const {museos}=useMuseos(nombre)

  //Utilizo el useEffect para hacer un focus ni bien se cargue la pagina
  useEffect(()=>{
    inputRef.current.focus()
  },[])

  return (
    <>
      <form onSubmit={(event)=>(event.preventDefault())} style={{marginTop:"12px"}}>
        <input type='text' name='nombre' ref={inputRef} size={38} placeholder='Ingrese nombre del museo...'/>
        <button type='button' onClick={handleNombre}>Buscar</button>
      </form>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "2%" }}>
        {museos ? (
          <>
            {museos.length > 0 ? <>
              <ul style={{ flex: "1", listStyleType: "none", paddingRight: "2%" }}>
                {museos.map((museo) => (
                  <li key={museo.id} className={museo.id === museoElegido.id ? 'boxselected' : ''}>
                    <p style={{ fontWeight: "bold" }}>{museo.nombre}</p>
                    <p style={{ fontStyle: "italic" }}>
                      {museo.direccion}
                      {museo.provincia}
                    </p>
                    {museo.link && <a href={museo.link} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
                      <i className="fa fa-globe"></i>&nbsp;Ver sitio web
                    </a>}
                    <button style={{ marginLeft: "2%" }} onClick={() =>
                      museo.id === museoElegido.id
                        ? setMuseoElegido({ ...museoElegido, id: null })
                        : setMuseoElegido(museo)
                    }>
                      {museo.id === museoElegido.id ? 'Ver menos' : 'Ver más'}
                    </button>
                  </li>
                ))}
              </ul>
            </>:
              <>
                <p><i className="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;No se encontraron resultados</p>
              </>}
          </>
        ) : (
          <>
            <p><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;Cargando</p>
          </>
        )}

        {museoElegido.id && (
          <div style={{ flex: "1", borderTop: "2px solid #614051", padding: "5px", maxWidth: "45%" }}>
            <h4 style={{ textDecoration: "underline", textAlign: "center" }}>{museoElegido.nombre}</h4>
            {museoElegido.descripcion && <p style={{ fontStyle: 'italic', textAlign: "justify", padding: "2%" }} dangerouslySetInnerHTML={{ __html: museoElegido.descripcion }}></p>}
            <div style={{ marginLeft: "1%" }}>
              {museoElegido.direccion && <p><strong>Dirección:</strong> {museoElegido.direccion}</p>}
              {museoElegido.telefono && <p><strong>Teléfono:</strong> {museoElegido.telefono}</p>}
              {museoElegido.email && <p><strong>Email:</strong> {museoElegido.email}</p>}
            </div>
            <button onClick={() => setMuseoElegido({ ...museoElegido, id: null })} style={{ marginRight: "2%", marginLeft: "1%" }}>Cerrar</button>
            {museoElegido.link && <a href={museoElegido.link} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              <i className="fa fa-globe"></i>&nbsp;Ver sitio web
            </a>}
          </div>
        )}
      </div>
    </>
  );
}

export default Museos;