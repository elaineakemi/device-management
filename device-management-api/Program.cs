using DeviceManagement.Data;
using DeviceManagement.Models;
using DeviceManagement.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder (args);

builder.Services.AddDbContext<ApiContext> (options => options.UseInMemoryDatabase ("api"));
builder.Services.AddScoped<IDeviceService, DeviceService> ();
builder.Services.AddScoped<IDeviceUsageService, DeviceUsageService> ();

builder.Services.AddEndpointsApiExplorer ();
builder.Services.AddSwaggerGen ();

builder.Services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer (JwtBearerDefaults.AuthenticationScheme, c => {
    c.Authority = $"https://{builder.Configuration["Auth0:Domain"]}";
    c.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters {
      ValidAudience = builder.Configuration["Auth0:Audience"],
      ValidIssuer = builder.Configuration["Auth0:Domain"]
    };
  });

builder.Services.AddAuthorization (o => {
  o.AddPolicy ("device:read-write", p => p.RequireAuthenticatedUser ().RequireClaim ("scope", "device:read-write"));
});

var app = builder.Build ();

using (var scope = app.Services.CreateScope ()) {
  var dbContext = scope.ServiceProvider.GetRequiredService<ApiContext> ();
  dbContext.Database.EnsureCreated ();

}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment ()) {
  app.UseSwagger ();
  app.UseSwaggerUI ();
  app.UseDeveloperExceptionPage ();
}

app.UseAuthentication ();
app.UseAuthorization ();

app.MapGet ("/", () => "Hello World!");

app.MapGet ("/api/devices", async (IDeviceService deviceService) => await deviceService.GetDevices ()).RequireAuthorization ();
app.MapGet ("/api/devices/{id}", async (long id, IDeviceService deviceService) => await deviceService.GetDeviceById (id)).RequireAuthorization ();
app.MapPost ("/api/devices", async (Device device, IDeviceService deviceService) => await deviceService.CreateDevice (device)).RequireAuthorization ();
app.MapPut ("/api/devices/{id}", async (long id, Device device, IDeviceService deviceService) => await deviceService.UpdateDevice (id, device)).RequireAuthorization ();
app.MapDelete ("/api/devices/{id}", async (long id, IDeviceService deviceService) => await deviceService.DeleteDevice (id)).RequireAuthorization ();

app.MapGet ("/api/deviceusages", async (IDeviceUsageService deviceUsageService) => await deviceUsageService.GetDeviceUsages ()).RequireAuthorization ();
app.MapGet ("/api/deviceusagesByUserId/{id}", async (long id, IDeviceUsageService deviceUsageService) => await deviceUsageService.GetUsagesByUserId (id)).RequireAuthorization ();
app.MapGet ("/api/deviceusagesByDeviceId/{id}", async (long id, IDeviceUsageService deviceUsageService) => await deviceUsageService.GetUsagesByDeviceId (id)).RequireAuthorization ();
app.MapPost ("/api/deviceusages", async (DeviceUsage deviceUsage, IDeviceUsageService deviceUsageService) => await deviceUsageService.CreateDeviceUsage (deviceUsage)).RequireAuthorization ();

app.Run ();