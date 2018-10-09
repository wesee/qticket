using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace prj.Models
{
    public class Event
    {
        [Required]
        public uint Id { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public uint TicketAmount { get; set; }
        [Required]
        public uint TicketPrice { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public bool IsTicketTradable { get; set; }
        [Required]
        public bool IsTicketCancelable { get; set; }
        [Required]
        public DateTime LastCancelDate { get; set; }
        [Required]
        public uint TicketsBought { get; set; }
        [Required]
        public uint TicketsCanceled { get; set; }
        [Required]
        public string Owner { get; set; }
        [Required]
        public bool Verified { get; set; }

        public byte[] Poster { get; set; }

    }
}
