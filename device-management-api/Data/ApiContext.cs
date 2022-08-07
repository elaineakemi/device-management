using DeviceManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace DeviceManagement.Data {
  public class ApiContext : DbContext {
    public ApiContext (DbContextOptions<ApiContext> options) : base (options) { }

    public DbSet<Device> Devices { get; set; }
    public DbSet<DeviceUsage> DeviceUsages { get; set; }

    protected override void OnModelCreating (ModelBuilder modelBuilder) {
      modelBuilder.Entity<Device> ()
        .HasData (
          new Device { Id = 1, Name = "Cadeira de Rodas", Identification = "#CR001", Category = (CategoryEnum) 0, Status = (StatusEnum) 0, IsDeleted = false },
          new Device { Id = 2, Name = "Nebulizador", Identification = "#NB003", Category = (CategoryEnum) 0, Status = (StatusEnum) 0, IsDeleted = false },
          new Device { Id = 3, Name = "Tanque de Oxigênio", Identification = "#TQ005", Category = (CategoryEnum) 0, Status = (StatusEnum) 0, IsDeleted = false },
          new Device { Id = 4, Name = "Andador", Identification = "#AA347", Category = (CategoryEnum) 0, Status = (StatusEnum) 0, IsDeleted = false },
          new Device { Id = 5, Name = "Laser Médico", Identification = "#LS052", Category = (CategoryEnum) 2, Status = (StatusEnum) 0, IsDeleted = false },
          new Device { Id = 6, Name = "Bomba de Infusão", Identification = "#BI006", Category = (CategoryEnum) 2, Status = (StatusEnum) 0, IsDeleted = false },
          new Device { Id = 7, Name = "Ventilador Mecânico", Identification = "#VT067", Category = (CategoryEnum) 3, Status = (StatusEnum) 0, IsDeleted = false },
          new Device { Id = 8, Name = "Máquina de Diálise", Identification = "#DL007", Category = (CategoryEnum) 3, Status = (StatusEnum) 0, IsDeleted = false },
          new Device { Id = 9, Name = "Incubadora", Identification = "#IC042", Category = (CategoryEnum) 3, Status = (StatusEnum) 0, IsDeleted = false },
          new Device { Id = 10, Name = "Cadeira de Rodas", Identification = "#CR002", Category = (CategoryEnum) 0, Status = (StatusEnum) 1, IsDeleted = false },
          new Device { Id = 11, Name = "Nebulizador", Identification = "#NB004", Category = (CategoryEnum) 0, Status = (StatusEnum) 2, IsDeleted = false },
          new Device { Id = 12, Name = "Andador", Identification = "#AD031", Category = (CategoryEnum) 0, Status = (StatusEnum) 3, IsDeleted = false },
          new Device { Id = 13, Name = "Laser Médico", Identification = "#LM021", Category = (CategoryEnum) 2, Status = (StatusEnum) 4, IsDeleted = false },
          new Device { Id = 14, Name = "Ventilador Mecânico", Identification = "#VT008", Category = (CategoryEnum) 3, Status = (StatusEnum) 2, IsDeleted = false },
          new Device { Id = 15, Name = "Máquina de Diálise", Identification = "#DL010", Category = (CategoryEnum) 3, Status = (StatusEnum) 3, IsDeleted = false }
        );

      modelBuilder.Entity<DeviceUsage> ()
        .HasData (
          new DeviceUsage { Id = 1, UserId = 1, DeviceId = 1, Identification = "Cadeira de Rodas #CR001", DeviceLocation = "Recepção I", Notes = "", UsageType = (TypeEnum) 0, CreatedDate = DateTime.Parse ("2022-05-01") },
          new DeviceUsage { Id = 2, UserId = 2, DeviceId = 7, Identification = "Ventilador Mecânico #VT067", DeviceLocation = "Quarto 522", Notes = "", UsageType = (TypeEnum) 0, CreatedDate = DateTime.Parse ("2022-05-01") },
          new DeviceUsage { Id = 3, UserId = 2, DeviceId = 3, Identification = "Tanque de Oxigênio #TQ005", DeviceLocation = "Sala de Emergência, Bloco A", Notes = "", UsageType = (TypeEnum) 0, CreatedDate = DateTime.Parse ("2022-05-01") },
          new DeviceUsage { Id = 4, UserId = 1, DeviceId = 1, Identification = "Cadeira de Rodas #CR001", DeviceLocation = "Recepção I", Notes = "", UsageType = (TypeEnum) 1, CreatedDate = DateTime.Parse ("2022-05-02") },
          new DeviceUsage { Id = 5, UserId = 2, DeviceId = 1, Identification = "Cadeira de Rodas #CR001", DeviceLocation = "Recepção I", Notes = "", UsageType = (TypeEnum) 0, CreatedDate = DateTime.Parse ("2022-05-03") },
          new DeviceUsage { Id = 6, UserId = 2, DeviceId = 1, Identification = "Cadeira de Rodas #CR001", DeviceLocation = "Recepção III", Notes = "Roda esquerda necessita revisão", UsageType = (TypeEnum) 1, CreatedDate = DateTime.Parse ("2022-05-05") },
          new DeviceUsage { Id = 7, UserId = 2, DeviceId = 1, Identification = "Cadeira de Rodas #CR001", DeviceLocation = "Recepção III", Notes = "", UsageType = (TypeEnum) 0, CreatedDate = DateTime.Parse ("2022-05-08") },
          new DeviceUsage { Id = 8, UserId = 1, DeviceId = 8, Identification = "Máquina de Diálise #DL007", DeviceLocation = "Quarto 906", Notes = "", UsageType = (TypeEnum) 0, CreatedDate = DateTime.Parse ("2022-05-08") },
          new DeviceUsage { Id = 9, UserId = 1, DeviceId = 8, Identification = "Máquina de Diálise #DL007", DeviceLocation = "Sala de Equipamentos, Bloco A", Notes = "Necessita manutenção, não está funcionando corretamente", UsageType = (TypeEnum) 1, CreatedDate = DateTime.Parse ("2022-05-08") },
          new DeviceUsage { Id = 10, UserId = 2, DeviceId = 1, Identification = "Cadeira de Rodas #CR001", DeviceLocation = "Laboratório de Exames, Sala 307", Notes = "", UsageType = (TypeEnum) 1, CreatedDate = DateTime.Parse ("2022-05-09") },
          new DeviceUsage { Id = 11, UserId = 2, DeviceId = 1, Identification = "Cadeira de Rodas #CR001", DeviceLocation = "Sala de Espera, Bloco C", Notes = "", UsageType = (TypeEnum) 0, CreatedDate = DateTime.Parse ("2022-05-09") },
          new DeviceUsage { Id = 12, UserId = 2, DeviceId = 12, Identification = "Andador #AD031", DeviceLocation = "Quarto 193", Notes = "", UsageType = (TypeEnum) 0, CreatedDate = DateTime.Parse ("2022-05-12") },
          new DeviceUsage { Id = 13, UserId = 2, DeviceId = 12, Identification = "Andador #AD031", DeviceLocation = "Recepção II", Notes = "Paciente reportou desnível no lado esquerdo", UsageType = (TypeEnum) 1, CreatedDate = DateTime.Parse ("2022-05-15") },
          new DeviceUsage { Id = 14, UserId = 1, DeviceId = 1, Identification = "Cadeira de Rodas #CR001", DeviceLocation = "Quarto 377", Notes = "", UsageType = (TypeEnum) 0, CreatedDate = DateTime.Parse ("2022-05-18") },
          new DeviceUsage { Id = 15, UserId = 1, DeviceId = 1, Identification = "Cadeira de Rodas #CR001", DeviceLocation = "Recepção I", Notes = "", UsageType = (TypeEnum) 1, CreatedDate = DateTime.Parse ("2022-05-20") }

        );
    }

  }
}