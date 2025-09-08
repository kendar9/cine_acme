Los cinemas Acme requieren de una plataforma que les permita gestionar sucursales, salas, películas y funciones de cine.



Contexto


Cines (Sucursales):
Estos son los lugares donde los clientes de Cine Acme asisten para ver las películas proyectadas. Estos cines tienen los siguientes datos: 

Código, nombre, dirección, ciudad.



Salas:
Las salas de cine son los lugares dentro del cine donde se proyectan las películas. Estas salas tienen los siguientes datos: 

Código (funcionará como el nombre), número de sillas, cine al que pertenece.



Películas:
Las películas son historias que los clientes del cine van a ver. Estas películas tienen los siguientes datos: 

Código, título, sinopsis (breve descripción de la obra), reparto (actores principales que participan), clasificación (para qué tipo de público es apta), idioma, director, duración (en minutos), género, fecha de estreno, tráiler (url con un video introductorio a la película), poster (url con la imagen alusiva a la película).



Funciones:
Son los horarios en que se proyectan las películas en los diferentes cines. Las funciones son programadas con la siguiente información:

Cine, sala, película, fecha y hora.



Requerimientos


Usted tiene la misión de crear una aplicación que permita a los administrativos llevar un control de las películas que se proyectan en los cines Acme.



Se debe poder crear, editar, mostrar y eliminar los registros de cines, salas, películas y funciones. Cabe destacar que los códigos en las entidades deben ser únicos.



Las funciones tienen un manejo particular, ya que no se puede agregar una función que se cruce con otra, es decir, que dos películas no se pueden proyectar en la misma sala, del mismo cine entre las mismas fechas y a la misma hora.



Se necesita también, de los siguientes endpoints que servirán para reportes:

Endpoint que reciba el cine y la película, y retorne la información de las funciones disponibles, es decir, que a la fecha tenga dicha película funciones disponibles.
Dada una fecha, y un cine, devuelva la información de las películas con funciones vigentes.
Dado un rango de fecha, devuelva la información de las películas proyectadas, el cine y el número de salas destinadas a esta en cada cine (La información debe ser por día).


Adicionalmente, debe crear una opción para registros de usuarios, quienes serán las personas encargadas de gestionar la información en el sistema. Los usuarios deben registrarse con una identificación, nombre completo, teléfono, email, cargo y una contraseña. Debe proveer endpoints para CRUD de usuarios.



Es importante que implemente autenticación y autorización de usuarios para seguridad de la API. Una vez se autentique el usuario, debe generar un JWT para la autorización de este a los diferentes endpoints del sistema.




Diseño y Construcción de Front End
Debe crear el flujo de las vistas de la aplicación en figma, draw.io, etc. Debe proporcionar una buena experiencia de usuario.



Se debe construir las siguientes vistas:



Login: Se debe usar email y contraseña.

Usuarios

	Lista de usuarios.

	Formulario para creación y actualización de usuarios.

	Esta vista debe proveer métodos para eliminar un registro.

Cines

	Lista de cines.

	Formulario para creación y actualización de cines.

	Esta vista debe proveer métodos para eliminar un registro.

Salas

	Lista de salas.

	Formulario para creación y actualización de salas.

	Esta vista debe proveer métodos para eliminar un registro.

Películas

	Lista de Películas.

	Formulario para creación y actualización de Películas.

	Esta vista debe proveer métodos para eliminar un registro.

Funciones:

	Lista de Funciones.

	Formulario para creación y actualización de Funciones.

	Esta vista debe proveer métodos para eliminar un registro.	

Puede usar frameworks o librerías como Vue, Angular, React, etc. 





Consideraciones adicionales
Recuerde que debe usar el motor de base de datos MongoDB para persistencia de datos agregando esquemas de validaciones en los esquemas diseñados.
Utilice Express JS junto con el patrón de diseño MVC y POO para la organización del proyecto.
También regule los datos de las transacciones mediante DTO 's.
Recuerde la organización de las rutas en el proyecto.


Resultado esperado

El camper debe hacer uso de todo lo aprendido durante la ruta. El uso de buenas prácticas es de vital importancia.



El proyecto a entregar debe contener los siguiente:


API con los Endpoints para gestión de entidades (CRUD) con sus respectivas rutas, de lo siguiente:

Cines
Salas
Películas
Funciones


Endpoints para generar la data de los informes propuestos.
Endpoints para la gestión de usuarios del sistema (CRUD).
Endpoints para autenticación de usuarios.
Todas las rutas a excepción del login deben estar protegidas.


Proyecto de front end con las vistas necesarias para la gestión de la información.


    
El proyecto debe ser cargado a Github con el nombre "PROYECTO_Gestion_Cine_Apellido_Nombre".



Debe incluir un read me donde se explique el proyecto, las tecnologías (lenguajes, librerias, motores de bases de datos, etc) utilizadas, un breve manual de instrucciones de como ejecutar la aplicación y la documentación de cada end point o servicio construido.