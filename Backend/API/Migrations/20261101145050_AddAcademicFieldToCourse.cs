using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Thuto.Migrations
{
    public partial class AddAcademicFieldToCourse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // AcademicField was already added manually to the database.
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Do not remove AcademicField because the database already contains data.
        }
    }
}