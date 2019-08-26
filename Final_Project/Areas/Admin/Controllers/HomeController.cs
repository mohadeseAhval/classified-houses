using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        // GET: Admin/Home
        public ActionResult Index()
        {
            ViewBag.userName = Session["USER"].ToString();

            return View();
        }
    }
}