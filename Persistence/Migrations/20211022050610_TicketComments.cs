using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class TicketComments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetUserRoles_RoleUserId_RoleId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_RoleUserId_RoleId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RoleUserId",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "TicketComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Body = table.Column<string>(type: "TEXT", nullable: true),
                    AuthorId = table.Column<string>(type: "TEXT", nullable: true),
                    TicketId = table.Column<Guid>(type: "TEXT", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketComments_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TicketComments_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_RoleId",
                table: "AspNetUsers",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketComments_AuthorId",
                table: "TicketComments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketComments_TicketId",
                table: "TicketComments",
                column: "TicketId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_RoleId",
                table: "AspNetUsers",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_RoleId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "TicketComments");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_RoleId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "RoleUserId",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_RoleUserId_RoleId",
                table: "AspNetUsers",
                columns: new[] { "RoleUserId", "RoleId" });

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetUserRoles_RoleUserId_RoleId",
                table: "AspNetUsers",
                columns: new[] { "RoleUserId", "RoleId" },
                principalTable: "AspNetUserRoles",
                principalColumns: new[] { "UserId", "RoleId" },
                onDelete: ReferentialAction.Restrict);
        }
    }
}
