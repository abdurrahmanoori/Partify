
using Partify.Domain.Entities.Base;

namespace Partify.Domain.Entities
{
    public  class Customer : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? CarModel { get; set; }
        public string? PlateNumber { get; set; }
    }
}
