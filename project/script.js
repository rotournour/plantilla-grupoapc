document.getElementById('generarPDF').addEventListener('click', function () {
	// Obtener los datos del formulario
	const empresa = document.getElementById('empresa').value;
	const direccion = document.getElementById('direccion').value;
	const modelo = document.getElementById('modelo').value;
	const anio = document.getElementById('anio').value;
	const horasMotor = document.getElementById('horasMotor').value;
	const capacidadTanque = document.getElementById('capacidadTanque').value;
	const volumenPromedio = document.getElementById('volumenPromedio').value;
	const velocidadPromedio =
		document.getElementById('velocidadPromedio').value;
	const distanciaBoquillas =
		document.getElementById('distanciaBoquillas').value;
	const clasificacion = document.getElementById('clasificacion').value;

	// Llenar la plantilla con los datos del formulario
	document.getElementById('empresaNombre').innerText = empresa;
	document.getElementById('direccionInfo').innerText = direccion;
	document.getElementById('detalleMaquina').innerText = `
    ${modelo} ${anio}
    Horas de motor: ${horasMotor}
    Capacidad del tanque: ${capacidadTanque} L
    Volumen promedio: ${volumenPromedio} L/ha
    Velocidad promedio: ${velocidadPromedio} km/h
    Distancia entre boquillas: ${distanciaBoquillas} cm
  `;

	// Muestra la clasificación resultante
	document.getElementById(
		`clasificacionContainer${clasificacion}`
	).style.display = 'flex';

	document.getElementById(
		`valorClasificacion${clasificacion}`
	).style.display = 'block';

	document.getElementById(`valorClasificacion${clasificacion}`).innerText =
		clasificacion;

	// Obtener la fecha actual
	const fechaActual = new Date().toLocaleDateString();
	document.getElementById('fecha').innerText = fechaActual;

	// Mostrar la plantilla para generar el PDF
	const plantilla = document.getElementById('plantilla');
	plantilla.style.display = 'block';

	// Usar html2canvas para capturar la plantilla y convertirla en una imagen
	html2canvas(plantilla)
		.then(function (canvas) {
			// Crear el PDF con jsPDF
			const { jsPDF } = window.jspdf;
			const pdf = new jsPDF();

			// Agregar la imagen del canvas al PDF
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 180, 0); // Ajusta la posición y el tamaño según sea necesario

			// Descargar el PDF generado
			pdf.save(`${empresa}_clasificacion.pdf`);

			// Ocultar la plantilla después de la descarga
			plantilla.style.display = 'none';
		})
		.catch(function (error) {
			console.error('Error al generar el PDF: ', error);
		});
});
