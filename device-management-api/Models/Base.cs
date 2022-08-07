namespace DeviceManagement.Models {
  public abstract class Base {

    public virtual long Id { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string? LastUpdatedBy { get; set; }
    public DateTime? LastUpdatedDate { get; set; }

    protected Base () {
      CreatedDate = DateTime.Now;
    }
  }
}