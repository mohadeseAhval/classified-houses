using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib.Enums
{
    public enum numberOfRooms
    {
        [Display(Name = "0")]
        zero = 0,
        [Display(Name = "1")]
        one = 1,
        [Display(Name = "2")]
        tow = 2,
        [Display(Name = "3")]
        tree = 3,
        [Display(Name = "4")]
        four = 4,
        [Display(Name = "5")]
        five = 5
    }
}
