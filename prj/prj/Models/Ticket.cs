using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace prj.Models
{
    public class Ticket
    {
        [Required]
        public string TicketId { get; set; }

        [Required]
        public string OwnerId { get; set; }

        [Required]
        public double Price { get; set; }
    }
}
