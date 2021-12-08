using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class WebsiteUpdateToOneUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Website",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Website_UserId",
                table: "Website",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Website_AspNetUsers_UserId",
                table: "Website",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Website_AspNetUsers_UserId",
                table: "Website");

            migrationBuilder.DropIndex(
                name: "IX_Website_UserId",
                table: "Website");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Website");
        }
    }
}
