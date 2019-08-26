using ModelLib;
using ModelLib.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Controllers
{
    public class AdvertisingController : Controller
    {
        Advertising AdvertisingTable = new Advertising();
        // GET: Advertising
        public ActionResult Buy()
        {
            var ads = AdvertisingTable.Read(Condition.Ctrue);
            return View(ads);
        }
        public ActionResult Details_Buy(int id)
        {
            return View(AdvertisingTable.FindById(id));
        }
        public ActionResult Rent()
        {
            var ads = AdvertisingTable.Read(Condition.Ctrue);
            return View(ads);
        }
        public ActionResult Details_Rent(int id)
        {
            return View(AdvertisingTable.Read(id));
        }

    }
}