using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class HomeController : BaseAdminController
    {
        // GET: Admin/Home baqie hame bashan
        public ActionResult Index()
        {
            ViewBag.userName = User.Identity.Name;
            return View();
        }
    }
}