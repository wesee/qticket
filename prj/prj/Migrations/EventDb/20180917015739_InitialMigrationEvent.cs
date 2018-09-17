using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace prj.Migrations.EventDb
{
    public partial class InitialMigrationEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    TicketAmount = table.Column<long>(nullable: false),
                    TicketPrice = table.Column<long>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    IsTicketTradable = table.Column<bool>(nullable: false),
                    IsTicketCancelable = table.Column<bool>(nullable: false),
                    LastCancelDate = table.Column<DateTime>(nullable: false),
                    TicketsBought = table.Column<long>(nullable: false),
                    TicketsCanceled = table.Column<long>(nullable: false),
                    Owner = table.Column<string>(nullable: false),
                    Verified = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    TicketId = table.Column<long>(nullable: false),
                    EventId = table.Column<long>(nullable: false),
                    Owner = table.Column<string>(nullable: false),
                    Price = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.TicketId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Tickets");
        }
    }
}
