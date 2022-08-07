namespace DeviceManagement.Models {
  public enum CategoryEnum {
    Durable = 0,
    Diagnostic = 1,
    Treatment = 2,
    LifeSupport = 3
  }
  public enum StatusEnum {
    Active = 0,
    Inactive = 1,
    Maintenance = 2,
    Decommissioned = 3,
    Unknown = 4
  }

  public class Device : Base {

    public string? Name { get; set; }
    public string? Identification { get; set; }
    public string? SerialNumber { get; set; }
    public string? Manufacturer { get; set; }
    public string? Supplier { get; set; }

    public CategoryEnum Category { get; set; }
    public StatusEnum Status { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public DateTime? LastMaintenanceDate { get; set; }
    public bool IsDeleted { get; set; }

  }

}