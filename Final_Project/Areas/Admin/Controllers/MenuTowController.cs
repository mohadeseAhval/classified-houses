using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class MenuTowController : Controller
    {
        MenuTow MenuTowTable = new MenuTow();
        // GET: Admin/MenuTow
        public ActionResult Index()
        {
            ViewBag.userName = Session["USER"].ToString();
            return View(model: MenuTowTable.Read());
        }

        [HttpGet]
        public ActionResult Operation(int? id)
        {
            if (id != null)
            {
                //Update Mode
                return View(model: MenuTowTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new MenuTow());
            }
        }

        [HttpPost]
        public ActionResult Operation(MenuTow inputs)
        {
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create MenuTow
                ViewBag.msg = MenuTowTable.Create(inputs);
                #endregion
            }
            else
            {
                //Update Mode
                #region Update MenuTow
                MenuTowTable.Update(inputs);
                #endregion
            }

            return Redirect("/Admin/MenuTow");
        }

        public ActionResult Delete(int id)
        {

            MenuTowTable.Delete(id);
            return Redirect("~/Admin/MenuTow");
        }
    }
}