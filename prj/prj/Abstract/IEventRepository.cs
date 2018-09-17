using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prj.Models;

namespace prj.Abstract
{
    public interface IEventRepository
    {
        List<Event> Events();

        Event FindEvent(uint id);

        List<Event> FindEventsByOwnerId(string ownerId);

        List<Ticket> FindTicketByOwnerId(string ownerId);

        bool AddEvent(Event pr);

        bool AddTicket(Ticket pr);
    }
}
