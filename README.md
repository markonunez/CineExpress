# CineExpress

CineExpress es una aplicación web para la gestión de un catálogo de películas, desarrollada como trabajo práctico de Programación I.

El proyecto cuenta con un **frontend** desarrollado con HTML, CSS y JavaScript, y un **backend** desarrollado con C# y ASP.NET Core que expone una API REST.

## Funcionalidades

- Listar películas.
- Buscar películas por título.
- Filtrar películas por género.
- Agregar películas.
- Eliminar películas.
- Consultar la cantidad de copias disponibles.

## Tecnologías utilizadas

- C#
- .NET
- ASP.NET Core
- HTML
- CSS
- JavaScript
- API REST

## Estructura del proyecto

```text
CineExpress/
├── backend/
│   └── CineExpressApi/
│       ├── Controllers/
│       ├── Models/
│       ├── Properties/
│       ├── Program.cs
│       ├── appsettings.json
│       ├── appsettings.Development.json
│       ├── CineExpressApi.csproj
│       └── CineExpressApi.http
│
├── frontend/
│   ├── index.html
│   ├── estilos.css
│   └── app.js
│
├── .gitignore
└── README.md
```

## Cómo ejecutar el proyecto

Para ejecutar CineExpress se necesita tener instalado:

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Visual Studio Code](https://code.visualstudio.com/)
- La extensión **Live Server** para Visual Studio Code.

### 1. Clonar el repositorio

Desde una terminal, ejecutar:

```bash
git clone https://github.com/markonunez/CineExpress.git
cd CineExpress
```

### 2. Ejecutar el backend

Ingresar a la carpeta del backend:

```bash
cd backend/CineExpressApi
```

Ejecutar la API:

```bash
dotnet run
```

Si la ejecución es correcta, el backend quedará disponible en:

```text
http://localhost:5000
```

La terminal debe permanecer abierta mientras se utiliza la aplicación.

### 3. Abrir el frontend

Abrir la carpeta `CineExpress` con Visual Studio Code.

Luego ingresar a la carpeta:

```text
frontend
```

Hacer clic derecho sobre `index.html` y seleccionar:

**Open with Live Server**

El navegador abrirá automáticamente la aplicación.

### 4. Utilizar la aplicación

Una vez que el backend esté ejecutándose y el frontend esté abierto en el navegador, CineExpress estará listo para utilizarse.

Desde la interfaz se pueden consultar las películas, buscar por título, filtrar por género, agregar nuevas películas y eliminarlas.

## Contexto académico

Trabajo práctico realizado para la materia **Programación I** de la carrera **Ingeniería en Informática**.
