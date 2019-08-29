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
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb { Title = "خرید", Url = Url.Action(nameof(Buy), "Advertising"), Position = 2 }
            };
            var ads = AdvertisingTable.Read(Condition.Ctrue, TypeAd.Buy);            
            var pageNumber = page ?? 1;
            var onePageOfAds = ads.ToPagedList(pageNumber, 2);
            var area = AdvertisingTable.Get8AdAreaByTypeAd(TypeAd.Buy);
            var price = AdvertisingTable.Get8AdPriceByTypeAd(TypeAd.Buy);
            return View(new AdvertisingObject { area_o = area, pagedAds_o = onePageOfAds, price_o = price });
        }
       
        public ActionResult Rent(int? page)
        {
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb { Title = "رهن و اجاره", Url = Url.Action(nameof(Rent), "Advertising"), Position = 2 }
            };
            var ads = AdvertisingTable.Read(Condition.Ctrue, TypeAd.Rent);
            var pageNumber = page ?? 1;
            var onePageOfAds = ads.ToPagedList(pageNumber, 2);
            var area = AdvertisingTable.Get8AdAreaByTypeAd(TypeAd.Rent);
            var price = AdvertisingTable.Get8AdPriceByTypeAd(TypeAd.Rent);
            return View(new AdvertisingObject { area_o = area, pagedAds_o = onePageOfAds, price_o = price });
        }
        public ActionResult Details(int id)
        {
           

            var ad = AdvertisingTable.FindById(id);
            var similarAds = AdvertisingTable.GetSimilarAds(ad);
            var adWithCreator = AdvertisingTable.FindByIdWithCreator(id);

            ViewBag.FormAdTitle = ad.typeOfAd  == TypeAd.Buy ? "خرید" : "رهن و اجاره";
           
            // Breadcrumb
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb {  Title = ViewBag.FormAdTitle, Url = Url.Action(ad.typeOfAd.ToString(), "Advertising"), Position = 2 },
                new Breadcrumb { Title = ad.title, Url = null, Position = 3 },
                
            };
            return View(new AdvertisingObject { ad_o = adWithCreator, ads_o = similarAds });
        }

    }
}