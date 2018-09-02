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
using prj.Models;
using prj.Abstract;

namespace prj.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IEventRepository eventRepository;

        public HomeController(
          UserManager<ApplicationUser> _userManager,
          IEventRepository _propertyRepository)
        {
            userManager = _userManager;
            eventRepository = _propertyRepository;
        }


        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Events()
        {
            ViewData["Message"] = "Your Events";
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            string ownerId = user.Id;

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
            ViewData["Message"] = "Add a new event!";
            //TODO CHECK IF POSSIBLE TO CREATE
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            Event eve = new Event
            {
                Id = model.Id,
                Name = model.Name,
                Location = model.Location,
                OwnerId = user.Id
            };

            string ownerId = user.Id;

            List<Event> events = eventRepository.FindEventsByOwnerId(ownerId);
            model.Events = events;
            

            var res = eventRepository.AddEvent(eve);
            if (res)
                ViewData["Message"] = "Successfully added";
            return View(model);
        }

        [Authorize]
        public IActionResult Tickets()
        {
            ViewData["Message"] = "Your Tickets";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
