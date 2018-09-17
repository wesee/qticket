﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using prj.Migrations;

namespace prj.Migrations.EventDb
{
    [DbContext(typeof(EventDbContext))]
    partial class EventDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.2-rtm-30932")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("prj.Models.Event", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<bool>("IsTicketCancelable");

                    b.Property<bool>("IsTicketTradable");

                    b.Property<DateTime>("LastCancelDate");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Owner")
                        .IsRequired();

                    b.Property<long>("TicketAmount");

                    b.Property<long>("TicketPrice");

                    b.Property<long>("TicketsBought");

                    b.Property<long>("TicketsCanceled");

                    b.Property<bool>("Verified");

                    b.HasKey("Id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("prj.Models.Ticket", b =>
                {
                    b.Property<long>("TicketId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("EventId");

                    b.Property<string>("Owner")
                        .IsRequired();

                    b.Property<long>("Price");

                    b.HasKey("TicketId");

                    b.ToTable("Tickets");
                });
#pragma warning restore 612, 618
        }
    }
}
