using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib.Enums
{
    public enum Condition
    {
        [Display(Name = "تایید شده")]
        Ctrue = 0,
        [Display(Name = "تایید نشده")]
        Cfalse = 1
      
    }
}
