using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prj.Models;
using prj.Abstract;
using prj.Migrations;

namespace prj.Implementations
{
    public class EFEventRepository : IEventRepository
    {
        private readonly EventDbContext db;

        public EFEventRepository(EventDbContext _db)
        {
            db = _db;
        }

        public Event FindEvent(string name)
        {
            return db.Events.FirstOrDefault(t => t.Name.Contains(name));
        }

        public List<Event> FindEventsByOwnerId(string ownerId)
        {
            return db.Events.Where(t => t.OwnerId == ownerId).ToList();
        }

        public bool AddEvent(Event eve)
        {
            //TODO: CHECK IF ITS POSSIBLE TO ADD
            db.Add(eve);
            db.SaveChanges();
            return true;
        }
    }
}
