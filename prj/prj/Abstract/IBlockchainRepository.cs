using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prj.Models;
using System.Security;

namespace prj.Abstract
{
    public interface IBlockchainRepository
    {
        Task<double> GetBalance(string wif);
        Task<string> CreateEvent(uint date, uint ticketAmount,
                    uint ticketPrice, string name, bool isTicketTradable, bool isTicketCancelable, uint lastCancelDate, string wif);
        Task<uint> GetEventCount();
        Task<uint> GetTicketCount();
        Task<uint> GetTicketPrice(uint eventId);
        Task<string> BuyTicket(uint eventId, uint ticketPrice, string wif);
        Task<string> GetAddress(string wif);
        Task<string> ResellTicket(uint ticketId, uint ticketPrice, string wif);
    }
}
