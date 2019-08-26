using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class MenuOneController : Controller
    {
        MenuOne MenuOneTable = new MenuOne();
        // GET: Admin/MenuOne
        public ActionResult Index()
        {
            ViewBag.userName = Session["USER"].ToString();
            return View(model: MenuOneTable.Read());
        }
        [HttpGet]
        public ActionResult Operation(int? id)
        {
            if (id != null)
            {
                //Update Mode
                return View(model: MenuOneTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new MenuOne());
            }
        }

        [HttpPost]
        public ActionResult Operation(MenuOne inputs)
        {
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create MenuOne
                ViewBag.msg = MenuOneTable.Create(inputs);
                #endregion
            }
            else
            {
                //Update Mode
                #region Update MenuOne
                MenuOneTable.Update(inputs);
                #endregion
            }

            return Redirect("/Admin/MenuOne");
        }

        public ActionResult Delete(int id)
        {

            MenuOneTable.Delete(id);
            return Redirect("~/Admin/MenuOne");
        }
    }
}