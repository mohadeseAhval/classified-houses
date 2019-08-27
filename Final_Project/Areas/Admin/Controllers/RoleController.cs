using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class RoleController : BaseAdminController
    {
        Role RoleTable = new Role();
        // GET: Admin/Role
        public ActionResult Index()
        {
            ViewBag.userName = User.Identity.Name;
            return View(model: RoleTable.Read());
        }
        [HttpGet]
        public ActionResult Operation(int? Id)
        {
            if (Id != null)
            {
                //Update Mode
                return View(model: RoleTable.Read(Id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new Role());
            }
        }
        [HttpPost]
        public ActionResult Operation(Role inputs)
        {
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create Role
                ViewBag.msg = RoleTable.Create(inputs);
                #endregion
            }
            else
            {
                //Update Mode
                #region Update Role
                RoleTable.Update(inputs);
                #endregion
            }
            return Redirect("/Admin/Role");
        }
        public ActionResult Delete(int Id)
        {

            RoleTable.Delete(Id);
            return Redirect("~/Admin/Role");
        }
    }
}