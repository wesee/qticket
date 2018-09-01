using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace prj.Models.BookingViewModels
{
    public class PropertyViewModel
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string OwnerId { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public double Price { get; set; }

        public List<Property> Properties { get; set; }
    }
}
