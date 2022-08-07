namespace DeviceManagement.Models {
  public enum TypeEnum {
    Checkout = 0,
    Return = 1,
  }

  public class DeviceUsage : Base {
    public string? Identification { get; set; }
    public long DeviceId { get; set; }
    public long UserId { get; set; }
    public string? DeviceLocation { get; set; }
    public TypeEnum UsageType { get; set; }
    public string? Notes { get; set; }

  }

}