using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Security;
using Microsoft.AspNetCore.Http;

namespace prj.Models.AccountViewModels
{
    public class EventViewModel
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public uint TicketAmount { get; set; }
        [Required]
        public uint TicketPrice { get; set; }
        [Required]
        public string Info { get; set; }
        [Required]
        public bool IsTicketTradable { get; set; }
        [Required]
        public bool IsTicketCancelable { get; set; }
        [Required]
        public DateTime LastCancelDate { get; set; }
        public string Owner { get; set; }
        [Required]
        public string Wif { get; set; }

        public List<Event> Events { get; set; }

        public string Link { get; set; }

        public IFormFile Poster { get; set; }
    }
}
