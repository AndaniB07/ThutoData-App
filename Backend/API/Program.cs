using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Thuto.Data;
using Thuto.Services;
using Resend;

var builder = WebApplication.CreateBuilder(args);


// =========================
// CORS
// =========================

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowFrontend", policy =>
  {
    policy
        .WithOrigins(
    "http://localhost:8100",
    "https://thutodata-web-hafzhxd8gmbggsfs.centralindia-01.azurewebsites.net")
        .AllowAnyHeader()
        .AllowAnyMethod();
  });
});

// =========================
// EMAIL SERVICE
// =========================

builder.Services.AddOptions<ResendClientOptions>()
    .Configure<IConfiguration>((options, configuration) =>
    {
      options.ApiToken =
          configuration["Resend:ApiKey"];
    });

builder.Services.AddHttpClient<ResendClient>();

builder.Services.AddTransient<IResend>(serviceProvider =>
{
  return serviceProvider.GetRequiredService<ResendClient>();
});

builder.Services.AddScoped<EmailService>();


// =========================
// DATABASE
// =========================

builder.Services.AddDbContext<ThutoDataContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));


// =========================
// JWT AUTHENTICATION
// =========================

var jwtKey = builder.Configuration["Jwt:Key"];

if (string.IsNullOrWhiteSpace(jwtKey))
{
  throw new InvalidOperationException(
      "JWT Key is missing from configuration."
  );
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      options.TokenValidationParameters =
          new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,

            IssuerSigningKey =
                  new SymmetricSecurityKey(
                      Encoding.UTF8.GetBytes(jwtKey)
                  ),

            ValidateIssuer = true,

            ValidIssuer =
                  builder.Configuration["Jwt:Issuer"],

            ValidateAudience = true,

            ValidAudience =
                  builder.Configuration["Jwt:Audience"],

            ValidateLifetime = true,

            ClockSkew = TimeSpan.Zero
          };
    });

builder.Services.AddAuthorization();


// =========================
// CONTROLLERS
// =========================

builder.Services.AddControllers();


// =========================
// SWAGGER
// =========================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
  options.AddSecurityDefinition(
      "Bearer",
      new OpenApiSecurityScheme
      {
        Name = "Authorization",

        Type = SecuritySchemeType.Http,

        Scheme = "bearer",

        BearerFormat = "JWT",

        In = ParameterLocation.Header,

        Description =
              "Enter your JWT token below.\n\n" +
              "Example: Bearer eyJhbGciOiJIUzI1NiIs..."
      }
  );

  options.AddSecurityRequirement(
      new OpenApiSecurityRequirement
      {
            {
                new OpenApiSecurityScheme
                {
                    Reference =
                        new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                },

                Array.Empty<string>()
            }
      }
  );
});


// =========================
// BUILD APPLICATION
// =========================

var app = builder.Build();


// =========================
// CORS
// =========================

app.UseCors("AllowFrontend");


// =========================
// SWAGGER
// =========================

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();

  app.UseSwaggerUI();
}


// =========================
// HTTPS
// =========================

app.UseHttpsRedirection();


// =========================
// AUTHENTICATION
// =========================

app.UseAuthentication();


// =========================
// AUTHORIZATION
// =========================

app.UseAuthorization();


// =========================
// CONTROLLERS
// =========================

app.MapControllers();


app.Run();
