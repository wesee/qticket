using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace prj.Models
{
    public class MainViewModel
    {
        public List<Event> Events { get; set; }
    }
}
