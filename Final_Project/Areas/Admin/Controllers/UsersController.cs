using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class UsersController : BaseAdminController
    {
        Users UserTable = new Users();
        // GET: Admin/Users
        public ActionResult Index()
        {
            ViewBag.userName = User.Identity.Name;
            return View(model: UserTable.Read());
        }
        [HttpGet]
        public ActionResult Operation(int? Id)
        {
            ViewBag.userName = User.Identity.Name;
            if (Id != null)
            {
                //Update Mode
                return View(model: UserTable.Read(Id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new Users());
            }
        }
        [HttpPost]
        public ActionResult Operation(Users inputs)
        {
            ViewBag.userName = User.Identity.Name;
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create Users
                inputs.role_id = 1;
                ViewBag.msg = UserTable.Create(inputs);
                #endregion
            }
            else
            {
                //Update Mode
                #region Update Users
                UserTable.Update(inputs);
                #endregion
            }
            return Redirect("~/Admin/Users");
        }
        public ActionResult Delete(int Id)
        {

            UserTable.Delete(Id);
            return Redirect("~/Admin/Users");
        }
    }
}