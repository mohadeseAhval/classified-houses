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
            var adbuy = AdvertisingTable.Read(Condition.Ctrue, TypeAd.Buy);
            //var ads = AdvertisingTable.Read(Condition.Ctrue);
            return View(adbuy);
        }
        public ActionResult Details_Buy(int id)
        {
            return View(AdvertisingTable.FindById(id));
        }
        public ActionResult Rent()
        {
            var adRent = AdvertisingTable.Read(Condition.Ctrue, TypeAd.Rent);
            //var ads = AdvertisingTable.Read(Condition.Ctrue);
            return View(adRent);
        }
        public ActionResult Details_Rent(int id)
        {
            return View(AdvertisingTable.FindById(id));
        }

    }
}