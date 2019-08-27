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
            var ads = AdvertisingTable.Read(Condition.Ctrue, TypeAd.Buy);
            //var ads = AdvertisingTable.Read(Condition.Ctrue);
            var area = AdvertisingTable.GetBuyAdArea();
            var price = AdvertisingTable.GetBuyAdPric();
            return View(new AdvertisingObject { area_o = area, ads_o = ads, price_o = price });
        }
        public ActionResult Details_Buy(int id)
        {
            var ad = AdvertisingTable.FindById(id);
            var similarAds = AdvertisingTable.GetSimilarAds(ad);
            var adWithCreator = AdvertisingTable.FindByIdWithCreator(id);
            return View(new AdvertisingObject { ad_o = adWithCreator, ads_o = similarAds});
        }
        public ActionResult Rent()
        {
            var ads = AdvertisingTable.Read(Condition.Ctrue, TypeAd.Rent);
            //var ads = AdvertisingTable.Read(Condition.Ctrue);
            var area = AdvertisingTable.GetRentAdArea();
            var price = AdvertisingTable.GetRentAdPric();
            return View(new AdvertisingObject { area_o = area, ads_o = ads, price_o = price });
        }
        public ActionResult Details_Rent(int id)
        {
            return View(AdvertisingTable.FindByIdWithCreator(id));
        }

    }
}