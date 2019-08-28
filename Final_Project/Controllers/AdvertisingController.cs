using ModelLib;
using ModelLib.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using X.PagedList.Mvc;
using X.PagedList;
using System.Globalization;

namespace Final_Project.Controllers
{
    public class AdvertisingController : Controller
    {
        Advertising AdvertisingTable = new Advertising();
        Users UsersTable = new Users();
        Bookmark BookmarkTable = new Bookmark();
              
        [Authorize]
        [HttpPost]
        public ActionResult AddToBookmark(int adId, string actionName)
        {
            var loggenInUser = UsersTable.GetByfirstNameAndLastName(User.Identity.Name);
            var pc = new PersianCalendar();
            var pcString = pc.GetYear(DateTime.Now) + "/" + pc.GetMonth(DateTime.Now) + "/" + pc.GetDayOfMonth(DateTime.Now);
            var bookmark = new Bookmark
            {
                Ad_id = adId,
                Users_id = loggenInUser.id,
                date = DateTime.Now,
                qdate = pcString
            };
            BookmarkTable.Create(bookmark);

            return RedirectToAction(actionName, new { id = adId });
        }

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