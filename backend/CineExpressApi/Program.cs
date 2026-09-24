var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5500",
                "http://127.0.0.1:5500" 
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    
    });



});

var app = builder.Build();

app.UseCors("PermitirFrontend");

app.UseAuthorization();

app.MapControllers();


app.Run();
