using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class AboutUsController : Controller
    {
        AboutUs AboutUsTable = new AboutUs();
        // GET: Admin/AboutUs
        public ActionResult Index()
        {
            ViewBag.userName = Session["USER"].ToString();
            return View(model:AboutUsTable.Read());
        }
        [HttpGet]
        public ActionResult Operation(int? id)
        {
            if (id != null)
            {
                //Update Mode
                return View(model: AboutUsTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new AboutUs());
            }
        }

        [HttpPost]
        public ActionResult Operation(AboutUs inputs)
        {
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create AboutUs
                ViewBag.msg = AboutUsTable.Create(inputs);
                #endregion
            }
            else
            {
                //Update Mode
                #region Update AboutUs
                AboutUsTable.Update(inputs);
                #endregion
            }

            return Redirect("/Admin/AboutUs");
        }

        public ActionResult Delete(int id)
        {

            AboutUsTable.Delete(id);
            return Redirect("~/Admin/AboutUs");
        }
    }
}