// CSIP6833 (2024)
// KE. Makhooane (2020102527)
using System.Text;
using API.Data;
using API.Entities;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson();


builder.Services.AddControllers().AddNewtonsoftJson();
// var connString="";
// if (builder.Environment.IsDevelopment()) 
//     connString = builder.Configuration.GetConnectionString("DefaultConnection");
// else 
// {
// // Use connection string provided at runtime by Fly.io
//         var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
// }
builder.Services.AddDbContext<DataContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddScoped<ITokenService,TokenService>();
builder.Services.AddScoped<IBookRepository,BookRepository>();

builder.Services.AddIdentityCore<AppUser>(opt => 
{
    opt.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<DataContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => 
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(userManager);
}
catch (Exception ex)
{
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
