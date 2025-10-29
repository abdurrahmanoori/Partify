using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Partify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPlateNumberToCustomer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PlateNumber",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlateNumber",
                table: "Customers");
        }
    }
}
