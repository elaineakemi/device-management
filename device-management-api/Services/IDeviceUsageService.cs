using DeviceManagement.Models;

namespace DeviceManagement.Services {
  public interface IDeviceUsageService {
    Task<IResult> GetDeviceUsages ();
    Task<IResult> GetUsagesByUserId (long id);
    Task<IResult> GetUsagesByDeviceId (long id);
    Task<IResult> CreateDeviceUsage (DeviceUsage usage);
  }
}