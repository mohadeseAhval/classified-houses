using ModelLib;
using ModelLib.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using X.PagedList.Mvc;
using X.PagedList;

namespace Final_Project.Controllers
{
    public class AdvertisingController : Controller
    {
        Advertising AdvertisingTable = new Advertising();
        // GET: Advertising
        public ActionResult Buy(int? page)
        {
            var ads = AdvertisingTable.Read(Condition.Ctrue, TypeAd.Buy);
            var pageNumber = page ?? 1;
            var onePageOfAds = ads.ToPagedList(pageNumber, 2);
            var area = AdvertisingTable.GetBuyAdArea();
            var price = AdvertisingTable.GetBuyAdPric();
            return View(new AdvertisingObject { area_o = area, pagedAds_o = onePageOfAds, price_o = price });
        }
        public ActionResult Details_Buy(int id)
        {
            var ad = AdvertisingTable.FindById(id);
            var similarAds = AdvertisingTable.GetSimilarAds(ad);
            var adWithCreator = AdvertisingTable.FindByIdWithCreator(id);
            return View(new AdvertisingObject { ad_o = adWithCreator, ads_o = similarAds});
        }
        public ActionResult Rent(int? page)
        {
            var ads = AdvertisingTable.Read(Condition.Ctrue, TypeAd.Rent);
            var pageNumber = page ?? 1;
            var onePageOfAds = ads.ToPagedList(pageNumber, 2);
            var area = AdvertisingTable.GetRentAdArea();
            var price = AdvertisingTable.GetRentAdPric();
            return View(new AdvertisingObject { area_o = area, pagedAds_o = onePageOfAds, price_o = price });
        }
        public ActionResult Details_Rent(int id)
        {
            return View(AdvertisingTable.FindByIdWithCreator(id));
        }

    }
}