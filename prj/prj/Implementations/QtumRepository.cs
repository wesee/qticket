using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prj.Abstract;
using Microsoft.AspNetCore.NodeServices;
using prj.Models;
using System.Security;


namespace prj.Implementations
{
    public class QtumRepository : IBlockchainRepository
    {
        private readonly INodeServices nodeServices;

        public QtumRepository(INodeServices _nodeServices)
        {
            nodeServices = _nodeServices;
        }

        private string GetScriptLocation() => "./Node/qtumchain.js";

        public async Task<double> GetBalance(string wif)
        {
            try
            {
                return await nodeServices.InvokeExportAsync<double>(GetScriptLocation(), "GetBalance", wif);
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public async Task<string> CreateEvent(uint date, uint ticketAmount,
                    uint ticketPrice, string name, bool isTicketTradable, bool isTicketCancelable, uint lastCancelDate, string wif)
        {
            try
            {
                return await nodeServices.InvokeExportAsync<string>(GetScriptLocation(), "CreateEvent", date, ticketAmount,
                   ticketPrice, name, isTicketTradable, isTicketCancelable, lastCancelDate, wif);
            }
            catch (Exception)
            {
                return "smth failed";
            }
        }

        public async Task<string> BuyTicket(uint eventId, uint ticketPrice, string wif)
        {
            try
            {
                return await nodeServices.InvokeExportAsync<string>(GetScriptLocation(), "BuyTicket", eventId, ticketPrice, wif);
            }
            catch (Exception)
            {
                return "smth failed";
            }
        }

        public async Task<string> ResellTicket(uint ticketId, uint ticketPrice, string wif)
        {
            return await nodeServices.InvokeExportAsync<string>(GetScriptLocation(), "ResellTicket", ticketId, ticketPrice, wif);
        }

        public async Task<uint> GetEventCount()
        {
            try
            {
                return await nodeServices.InvokeExportAsync<uint>(GetScriptLocation(), "GetEventCount");
            }
            catch (Exception)
            {
                return 1000000;
            }
        }

        public async Task<uint> GetTicketCount()
        {
            try
            {
                return await nodeServices.InvokeExportAsync<uint>(GetScriptLocation(), "GetTicketCount");
            }
            catch (Exception)
            {
                return 0;
            }
        }


        public async Task<uint> GetTicketPrice(uint eventId)
        {
            try
            {
                return await nodeServices.InvokeExportAsync<uint>(GetScriptLocation(), "GetTicketPrice", eventId);
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public async Task<string> GetAddress(string wif)
        {
            try
            {
                return await nodeServices.InvokeExportAsync<string>(GetScriptLocation(), "GetAddress", wif);
            }
            catch (Exception)
            {
                return "failed";
            }
        }
    }
}
