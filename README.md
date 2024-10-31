<h1 align="center">TODO APP FRONTEND </h1>

# Instrucciones de Configuración
1. Al mometo de clonar le repositorio ejecutar el comando npm install la cual va a permitir la instalacion de las dependencias del proyecto..

# Explicación Técnica
- Next.js permite crear un frontend reactivo con una estructura de carpetas para organizar componentes y páginas. TypeScript añade tipado estático, ayudando a evitar errores comunes y mejorar la productividad.
-  Se instaló y configuró Tailwind CSS para el diseño de la interfaz, permitiendo una personalización rápida y flexible del estilo sin escribir CSS desde cero.
-   Se crearon formularios para registrar usuarios e iniciar sesión. Los datos ingresados por el usuario se validan y, al autenticarse, se guarda el token JWT en el almacenamiento local (localStorage).
-   Se creó un componente para mostrar las tareas del usuario en una tabla estilizada con Tailwind CSS. Cada tarea tiene acciones asociadas para ver, editar o eliminar.
-   En el archivo apiServices.ts, se centralizaron las peticiones HTTP utilizando axios para interactuar con el backend. Esto facilita la reutilización de código y simplifica el manejo de headers de autorización para cada solicitud.
-    Se creó un HOC que verifica si el usuario está autenticado antes de renderizar componentes protegidos. Si no hay un token JWT, redirige al usuario a la página de inicio de sesión.
-  Los campos de entrada, como fecha y estado de tarea, se validan antes de enviar al backend, asegurando que la información enviada esté en el formato correcto y completa.
