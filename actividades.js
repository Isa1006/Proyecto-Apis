class activities {
 constructor(data){
    const apiDataElement = document.getElementById('api-data');
      apiDataElement.innerHTML = ''; // Limpiar el contenido existente
      
      data.actividades.forEach(actividad => {
        const actividadElement = document.createElement('div');
        actividadElement.classList.add('actividad');

        const nombreElement = document.createElement('h3');
        nombreElement.textContent = actividad.nombre;
        actividadElement.appendChild(nombreElement);

        const descripcionElement = document.createElement('p');
        descripcionElement.textContent = actividad.descripcion;
        actividadElement.appendChild(descripcionElement);

        const ubicacionElement = document.createElement('p');
        ubicacionElement.textContent = `Ubicación: ${actividad.ubicacion}`;
        actividadElement.appendChild(ubicacionElement);

        const horarioElement = document.createElement('p');
        horarioElement.textContent = `Horario: ${actividad.horario}`;
        actividadElement.appendChild(horarioElement);

        const precioElement = document.createElement('p');
        precioElement.textContent = `Precio: ${actividad.precio}`;
        actividadElement.appendChild(precioElement);

        const categoriaElement = document.createElement('p');
        categoriaElement.textContent = `Categoría: ${actividad.categoria}`;
        actividadElement.appendChild(categoriaElement);

        const masSobreLaActividadElement = document.createElement('a');
        masSobreLaActividadElement.textContent = 'Más sobre la actividad';
        masSobreLaActividadElement.href = actividad.mas_sobre_la_actividad;
        actividadElement.appendChild(masSobreLaActividadElement);

        apiDataElement.appendChild(actividadElement);
 })

}
}

export default activities;