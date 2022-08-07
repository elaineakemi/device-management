using DeviceManagement.Models;

namespace DeviceManagement.Services {
  public interface IDeviceService {
    Task<IResult> GetDevices ();
    Task<IResult> GetDeviceById (long id);
    Task<IResult> CreateDevice (Device device);
    Task<IResult> UpdateDevice (long id, Device device);
    Task<IResult> DeleteDevice (long id);
  }
}