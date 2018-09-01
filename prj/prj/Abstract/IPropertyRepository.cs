using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prj.Models;

namespace prj.Abstract
{
    public interface IPropertyRepository
    {
        Property FindProperty(string id);

        bool AddProperty(Property pr);
    }
}
