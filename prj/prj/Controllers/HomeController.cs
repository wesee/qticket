using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using prj.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using prj.Models.AccountViewModels;
using prj.Abstract;
using prj.Implementations;

namespace prj.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IEventRepository eventRepository;
        private readonly IBlockchainRepository blockchainRepository;

        public HomeController(
          UserManager<ApplicationUser> _userManager,
          IEventRepository _propertyRepository,
          IBlockchainRepository _blockchainRepository)
        {
            userManager = _userManager;
            eventRepository = _propertyRepository;
            blockchainRepository = _blockchainRepository;
        }


        public IActionResult Index()
        {

            var model = new MainViewModel
            {
                Events = eventRepository.Events()
            };
            return View(model);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Events()
        {
            ViewData["DbAddresult"] = "";
            ViewData["Message"] = "Your Events";
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            string ownerId = user.PublicAddress;

            List<Event> events = eventRepository.FindEventsByOwnerId(ownerId);
            var model = new EventViewModel
            {
                Events = events
            };

            return View(model);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Events(EventViewModel model)
        {
            ViewData["DbAddresult"] = "";
            ViewData["Message"] = "Add a new event!";

            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            var res = await blockchainRepository.CreateEvent(model.Date.ToTimestamp(), model.TicketAmount,
                    model.TicketPrice, model.Info, model.IsTicketTradable, model.IsTicketCancelable, model.LastCancelDate.ToTimestamp(), model.Wif);

            string owner = await blockchainRepository.GetAddress(model.Wif);

            var eventId = await blockchainRepository.GetEventCount();

            bool addedToDb = false;
            if (res != "smth failed" && eventId != 1000000)
            {
                Event eve = new Event
                {
                    Id = ++eventId,
                    Date = model.Date,
                    TicketAmount = model.TicketAmount,
                    TicketPrice = model.TicketPrice,
                    Name = model.Info,
                    IsTicketCancelable = model.IsTicketCancelable,
                    IsTicketTradable = model.IsTicketTradable,
                    LastCancelDate = model.LastCancelDate,
                    TicketsBought = 0,
                    TicketsCanceled = 0,
                    Owner = owner,
                    Verified = false
                };
                addedToDb = eventRepository.AddEvent(eve);
            }

            if (res != "smth failed")
            {
                model.Link = "https://testnet.qtum.info/tx/" + res;
            }

            ViewData["Message"] = "Transaction ID:" + res;
            if (addedToDb)
            {
                ViewData["DbAddresult"] = "Added to DB";
            }
            else
            {
                ViewData["DbAddresult"] = "Failed to add to DB";
            }
            model.Events = eventRepository.FindEventsByOwnerId(owner);

            return View(model);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Tickets()
        {
            ViewData["Message"] = "Your Tickets";
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            string ownerId = user.PublicAddress;

            List<Ticket> tickets = eventRepository.FindTicketByOwnerId(ownerId);
            var model = new TicketViewModel
            {
                Tickets = tickets
            };

            return View(model);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Tickets(TicketViewModel model)
        {
            ViewData["Message"] = "Add a ticket!";
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            var ticketPrice = await blockchainRepository.GetTicketPrice(model.EventId);
            var res = await blockchainRepository.BuyTicket(model.EventId, ticketPrice, model.Wif);
            ViewData["Message"] = res;
            string owner = await blockchainRepository.GetAddress(model.Wif);
            model.Tickets = eventRepository.FindTicketByOwnerId(owner);
            bool addedToDb = false;
            var ticketId = await blockchainRepository.GetTicketCount();
            if (res != "smth failed" && ticketPrice != 0)
            {
                Ticket t = new Ticket
                {
                    TicketId = ++ticketId,
                    EventId = model.EventId,
                    Owner = owner,
                    Price = ticketPrice
                };
                addedToDb = eventRepository.AddTicket(t);
            }

            if (res != "smth failed")
            {
                model.Link = "https://testnet.qtum.info/tx/" + res;
            }

            ViewData["Message"] = "Transaction ID:" + res;
            if (addedToDb)
            {
                ViewData["DbAddresult"] = "Added to DB";
            }
            else
            {
                ViewData["DbAddresult"] = "Failed to add to DB";
            }
            model.Tickets = eventRepository.FindTicketByOwnerId(owner);

            return View(model);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Resell()
        {
            ViewData["Message"] = "Resell Ticket";
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            string ownerId = user.PublicAddress;

            List<Ticket> tickets = eventRepository.FindTicketByOwnerId(ownerId);
            var model = new ResellTicketViewModel
            {
                Tickets = tickets
            };

            return View(model);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Resell(ResellTicketViewModel model)
        {
            ViewData["Message"] = "Your Tickets";
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            var res = await blockchainRepository.ResellTicket(model.TicketId, model.Price, model.Wif);
            if (res != "smth failed")
            {
                model.Link = "https://testnet.qtum.info/tx/" + res;
            }
            string ownerId = user.PublicAddress;
            ViewData["Message"] = res;
            List<Ticket> tickets = eventRepository.FindTicketByOwnerId(ownerId);
            model.Tickets = tickets;
            return View(model);
        }

        [HttpPost]
        public IActionResult EventPersonalInfo(uint id)
        {
            Event eve = eventRepository.FindEvent(id);

            return View(eve);
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
