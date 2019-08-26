using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib.Enums
{
    public enum PropertyType
    {
        [Display(Name = "آپارتمان")]
        apartment = 0,
        [Display(Name = "اداری")]
        Official = 1,
        [Display(Name = "ویلا")]
        Villa = 2
    }
}
