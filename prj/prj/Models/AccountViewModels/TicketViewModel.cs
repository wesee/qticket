using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Security;


namespace prj.Models.AccountViewModels
{
    public class TicketViewModel
    {
        [Required]
        public uint EventId { get; set; }

        [Required]
        public string Wif { get; set; }
        public string Link { get; set; }

        public List<Ticket> Tickets { get; set; }
    }
}
