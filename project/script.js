document.getElementById("generarPDF").addEventListener("click", function () {
  // Obtener los datos del formulario
  const empresa = document.getElementById("empresa").value;
  const direccion = document.getElementById("direccion").value;
  const modelo = document.getElementById("modelo").value;
  const anio = document.getElementById("anio").value;
  const horasMotor = document.getElementById("horasMotor").value;
  const capacidadTanque = document.getElementById("capacidadTanque").value;
  const volumenPromedio = document.getElementById("volumenPromedio").value;
  const velocidadPromedio = document.getElementById("velocidadPromedio").value;
  const distanciaBoquillas =
    document.getElementById("distanciaBoquillas").value;
  const clasificacion = document.getElementById("clasificacion").value;
  const control = document.getElementById("control").value; // Obtener el número de control

  // Llenar la plantilla con los datos del formulario
  document.getElementById("empresaNombre").innerText = empresa;
  document.getElementById("direccionInfo").innerText = direccion;
  document.getElementById("detalleMaquina").innerHTML = `
    <p><strong>Modelo:</strong> ${modelo}</p>
    <p><strong>Año:</strong> ${anio}</p>
    <p><strong>Horas de motor:</strong> ${horasMotor}</p>
    <p><strong>Capacidad del tanque:</strong> ${capacidadTanque} L</p>
    <p><strong>Volumen promedio:</strong> ${volumenPromedio} L/ha</p>
    <p><strong>Velocidad promedio:</strong> ${velocidadPromedio} km/h</p>
    <p><strong>Distancia entre boquillas:</strong> ${distanciaBoquillas} cm</p>
  `;

  // Mostrar la clasificación resultante
  const clasificacionContainer = document.getElementById(
    `clasificacionContainer${clasificacion}`
  );
  const valorClasificacion = document.getElementById(
    `valorClasificacion${clasificacion}`
  );
  clasificacionContainer.style.display = "flex";
  valorClasificacion.style.display = "block";
  valorClasificacion.innerText = clasificacion;

  // Obtener la fecha actual
  const fechaActual = new Date().toLocaleDateString();
  document.getElementById("fecha").innerText = fechaActual;

  // Mostrar el número de control en la plantilla
  document.getElementById("controlNumero").innerText = `${control}`;

  // Mostrar la plantilla para generar el PDF
  const plantilla = document.getElementById("plantilla");
  plantilla.style.display = "block";

  // Generar el PDF usando html2canvas y jsPDF
  html2canvas(plantilla, { scale: 2 })
    .then(function (canvas) {
      // Crear el PDF con jsPDF
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("portrait", "pt", "a4"); // Configurar A4 en puntos

      // Dimensiones de la página A4 en puntos
      const pageWidth = 595.28;
      const pageHeight = 841.89;

      // Dimensiones de la imagen generada por html2canvas
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calcular la escala para que la imagen se ajuste a la página A4 manteniendo proporción
      const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      // Nuevas dimensiones de la imagen escalada
      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      // Centramos la imagen en la página A4
      const xOffset = (pageWidth - scaledWidth) / 2;
      const yOffset = (pageHeight - scaledHeight) / 2;

      // Convertir la imagen a datos PNG
      const imgData = canvas.toDataURL("image/png");

      // Agregar la imagen escalada al PDF
      pdf.addImage(imgData, "PNG", xOffset, yOffset, scaledWidth, scaledHeight);

      // Descargar el PDF generado
      pdf.save(`${empresa}_clasificacion.pdf`);

      // Ocultar la plantilla después de la descarga
      plantilla.style.display = "none";
    })
    .catch(function (error) {
      console.error("Error al generar el PDF: ", error);
    });
});
