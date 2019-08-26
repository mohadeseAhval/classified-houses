using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib.Enums
{
    public enum TypeNews
    {
        [Display(Name = "خرید")]
        Buy = 0,
        [Display(Name = "رهن و اجاره")]
        Rent = 1,
        [Display(Name = "فروش")]
        Sell = 2
    }

    public enum CatNews
    {
        [Display(Name = "اسلایدر")]
        Slider = 3,
        [Display(Name = "خبر")]
        News = 1
    }
}
