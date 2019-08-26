using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib.Enums
{
   public enum TypeAd
    {
        [Display(Name = "خرید")]
        Buy = 0,
        [Display(Name = "رهن و اجاره")]
        Rent = 1
    }
}
