using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace prj.Models
{
    public class Event
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string OwnerId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Location { get; set; }

        public List<Ticket> Tickets { get; set; }
    }
}
