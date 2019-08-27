using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class RulesController : BaseAdminController
    {
        Rules RulesTable = new Rules();
        // GET: Admin/Rules
        public ActionResult Index()
        {
           ViewBag.userName = User.Identity.Name;
            return View(model: RulesTable.Read());
        }
        [HttpGet]
        public ActionResult Operation(int? id)
        {
           ViewBag.userName = User.Identity.Name;
            if (id != null)
            {
                //Update Mode
                return View(model: RulesTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new Rules());
            }
        }

        [HttpPost]
        public ActionResult Operation(Rules inputs)
        {
           ViewBag.userName = User.Identity.Name;
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create Rules
                ViewBag.msg = RulesTable.Create(inputs);
                #endregion
            }
            else
            {
                //Update Mode
                #region Update Rules
                RulesTable.Update(inputs);
                #endregion
            }

            return Redirect("/Admin/Rules");
        }

        public ActionResult Delete(int id)
        {

            RulesTable.Delete(id);
            return Redirect("~/Admin/Rules");
        }
    }
}