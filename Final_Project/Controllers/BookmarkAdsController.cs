using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Controllers
{
    public class BookmarkAdsController : Controller
    {
        Advertising AdvertisingTable = new Advertising();
        Users UsersTable = new Users();
        Bookmark BookmarkTable = new Bookmark();

        // GET: BookmarkAds
        [Authorize]
        [HttpGet]
        public ActionResult Index()
        {
            var loggenInUser = UsersTable.GetByfirstNameAndLastName(User.Identity.Name);
            var ads = AdvertisingTable.GetBookmarderAds(loggenInUser.id);

            return View(ads);
        }

        [Authorize]
        public ActionResult Delete(int id)
        {
            var loggenInUser = UsersTable.GetByfirstNameAndLastName(User.Identity.Name);
            var bookmarkForDelete = BookmarkTable.FindByUserIdAndAdId(loggenInUser.id, id);
            BookmarkTable.Delete(bookmarkForDelete.id);

            return RedirectToAction("Index");
        }
    }
}