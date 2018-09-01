using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace prj.Models.ManageViewModels
{
    public class GenerateWalletViewModel
    {
        public string Wif { get; set; }
        public string PublicAddress { get; set; }
        public string StatusMessage { get; set; }
    }
}
