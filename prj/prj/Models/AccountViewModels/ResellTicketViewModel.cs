using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace prj.Models
{
    public class ResellTicketViewModel
    {
        [Required]
        public uint TicketId { get; set; }
        [Required]
        public uint Price { get; set; }
        [Required]
        public string Wif { get; set; }
        public string Link { get; set; }
        public List<Ticket> Tickets { get; set; }
    }
}
