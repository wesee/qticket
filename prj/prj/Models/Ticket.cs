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
        public uint TicketId { get; set; }

        [Required]
        public uint EventId { get; set; }

        [Required]
        public string Owner { get; set; }

        [Required]
        public uint Price { get; set; }
    }
}
