using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PeliculasController : ControllerBase
{
    private static List<Pelicula> _peliculas = new()
    {

        new Pelicula { Id = 1,Titulo = "Volver al futuro",Genero = "Ciencia Ficcion", Duracion = 230, CopiasDisponibles = 7 },
        new Pelicula { Id = 2, Titulo = "iron man",    Genero = "Acción",          Duracion = 80, CopiasDisponibles = 1 },
        new Pelicula { Id = 3, Titulo = "Son como niños",      Genero = "Comedia",         Duracion = 150,  CopiasDisponibles = 3 },
        new Pelicula { Id = 4, Titulo = "Chuky",    Genero = "Terror",          Duracion = 200, CopiasDisponibles = 5 },
        new Pelicula { Id = 5, Titulo = "Forrest Gump",     Genero = "Drama",           Duracion = 150, CopiasDisponibles = 2 },
    };
    [HttpGet]
    public ActionResult<IEnumerable<Pelicula>> GetTodas()
    {
        return Ok(_peliculas);
    }

    [HttpPost]
    public ActionResult<Pelicula> Crear([FromBody] Pelicula nueva)
    {
        nueva.Id = _peliculas.Max(p => p.Id) + 1;

        _peliculas.Add(nueva);

        return CreatedAtAction(nameof(GetTodas), nueva);
    
    
    
    }
}
