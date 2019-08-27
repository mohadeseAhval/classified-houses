using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Controllers
{
    [Authorize]
    public class PanelUserController : Controller
    {

        // GET: PanelUser
        public ActionResult UserPanel()
        {

            ViewBag.userName = User.Identity.Name;
            return View();
        }
    }
}