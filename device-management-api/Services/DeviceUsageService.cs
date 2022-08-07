using DeviceManagement.Data;
using DeviceManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace DeviceManagement.Services {
  public class DeviceUsageService : IDeviceUsageService {
    private readonly ApiContext _context;

    public DeviceUsageService (ApiContext context) {
      _context = context;
    }

    public async Task<IResult> GetDeviceUsages () {
      return Results.Ok (await _context.DeviceUsages.ToListAsync ());
    }

    public async Task<IResult> GetUsagesByUserId (long id) {
      return Results.Ok (await _context.DeviceUsages.Where (x => x.UserId == id).ToListAsync ());
    }

    public async Task<IResult> GetUsagesByDeviceId (long id) {
      return Results.Ok (await _context.DeviceUsages.Where (x => x.DeviceId == id).ToListAsync ());
    }

    public async Task<IResult> CreateDeviceUsage (DeviceUsage usage) {

      var created = _context.DeviceUsages.Add (usage);

      await _context.SaveChangesAsync ();

      return Results.Created ($"/deviceusages/{created.Entity.Id}", usage);

    }
  }
}