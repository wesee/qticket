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

        public List<Event> Events()
        {
            return db.Events.ToList();
        }

        public Event FindEvent(uint id)
        {
            return db.Events.FirstOrDefault(t => t.Id == id);
        }

        public List<Event> FindEventsByOwnerId(string ownerId)
        {
            return db.Events.Where(t => t.Owner == ownerId).ToList();
        }

        public List<Ticket> FindTicketByOwnerId(string ownerId)
        {
            return db.Tickets.Where(t => t.Owner == ownerId).ToList();
        }

        public bool AddTicket(Ticket t)
        {
            try
            {
                db.Add(t);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool AddEvent(Event eve)
        {
            try
            {
                db.Add(eve);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
