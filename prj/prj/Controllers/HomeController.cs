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
using prj.Models.BookingViewModels;
using prj.Abstract;

namespace prj.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IPropertyRepository propertyRepisotory;

        public HomeController(
          UserManager<ApplicationUser> _userManager,
          IPropertyRepository _propertyRepository)
        {
            userManager = _userManager;
            propertyRepisotory = _propertyRepository;
        }


        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Properties()
        {
            ViewData["Message"] = "Your Properties";
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            }

            string ownerId;


            return View();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Properties(PropertyViewModel model)
        {
            ViewData["Message"] = "Your Properties";

            return View();
        }

        [Authorize]
        public IActionResult Bookings()
        {
            ViewData["Message"] = "Your Bookings";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
