using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Controllers
{
    public class User_pController : Controller
    {
        Users UserTable = new Users();
        EF_DataBase db = new EF_DataBase();
        // GET: User_p
        public ActionResult Index()
        {
            ViewBag.userName = Session["USER"].ToString();
            String id = Session["userid"].ToString();
            ViewBag.userid = int.Parse(id);           
            return View(model: UserTable.FindByUserId(int.Parse(id))); 

        }
        [HttpGet]
        public ActionResult Operation(int? Id)
        {
            ViewBag.userName = Session["USER"].ToString();
            if (Id != 0)
            {
                ViewBag.userid = Id;
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
            ViewBag.userName = Session["USER"].ToString();
            String sessionUserId = Session["userid"].ToString();
            int loggedInUserId = int.Parse(sessionUserId);

            if (inputs.id == loggedInUserId)
            {
                //Update Mode
                #region Update Users
                UserTable.Update(inputs);
                #endregion
            }
         
            return Redirect("~/User_p");
        }
    }
}