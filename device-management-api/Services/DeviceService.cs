using DeviceManagement.Data;
using DeviceManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace DeviceManagement.Services {
  public class DeviceService : IDeviceService {
    private readonly ApiContext _context;

    public DeviceService (ApiContext context) {
      _context = context;
    }

    public async Task<IResult> GetDevices () {
      return Results.Ok (await _context.Devices.Where (x => x.IsDeleted == false).ToListAsync ());
    }

    public async Task<IResult> GetDeviceById (long id) {
      var device = await _context.Devices.FindAsync (id);

      return device != null ? Results.Ok (device) : Results.NotFound ();
    }

    public async Task<IResult> CreateDevice (Device device) {
      var created = _context.Devices.Add (device);

      await _context.SaveChangesAsync ();

      return Results.Created ($"/devices/{created.Entity.Id}", device);
    }

    public async Task<IResult> UpdateDevice (long id, Device device) {
      if (id != device.Id) {
        return Results.BadRequest ();
      }

      _context.Entry (device).State = EntityState.Modified;
      await _context.SaveChangesAsync ();

      return Results.NoContent ();
    }

    public async Task<IResult> DeleteDevice (long id) {
      var device = await _context.Devices.FindAsync (id);
      if (device == null) {
        return Results.NotFound ();
      }

      _context.Entry (device).State = EntityState.Modified;
      _context.Entry (device).CurrentValues["IsDeleted"] = true;
      await _context.SaveChangesAsync ();

      return Results.NoContent ();
    }
  }
}