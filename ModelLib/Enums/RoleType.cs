using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib.Enums
{
   public enum RoleType
    {
        [Display(Name = "مدیر سایت")]
        Admin = 123484627,
        [Display(Name = "کاربر عادی")]
        User = 100
    }
}
