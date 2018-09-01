using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using prj.Models;

namespace prj.Migrations
{
    public class PropertyDbContext : DbContext
    {
        public PropertyDbContext(DbContextOptions<PropertyDbContext> options) : base(options)
        {

        }

        //on cascade delete was set mannualy to the database
        public DbSet<Property> Properties { get; set; }
    }
}
