using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prj.Models;

namespace prj.Abstract
{
    public interface IEventRepository
    {
        Event FindEvent(string name);

        List<Event> FindEventsByOwnerId(string ownerId);

        bool AddEvent(Event pr);
    }
}
