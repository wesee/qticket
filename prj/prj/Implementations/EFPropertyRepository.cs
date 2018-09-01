using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prj.Models;
using prj.Abstract;
using prj.Migrations;

namespace prj.Implementations
{
    public class EFPropertyRepository : IPropertyRepository
    {
        private readonly PropertyDbContext db;

        public EFPropertyRepository(PropertyDbContext _db)
        {
            db = _db;
        }

        public Property FindProperty(string id)
        {
            return db.Properties.FirstOrDefault(t => t.Id == id);
        }

        public bool AddProperty(Property pr)
        {
            //TODO: CHECK IF ITS POSSIBLE TO ADD
            db.Add(pr);
            db.SaveChanges();
            return true;
        }
    }
}
