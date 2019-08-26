using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Data.Entity;

namespace Final_Project.Controllers
{
    public class AccountController : Controller
    {
        EF_DataBase entity = new EF_DataBase();
        Users Usertable = new Users();
        // GET: Account
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult login(string firstNameAndLastName, string password)
        {
            Users UserTable = new Users();
            if (UserTable.Authentication(firstNameAndLastName, password))
            {
                Session.Remove("User");
                Session.Remove("Admin");

                if (UserTable.GetByfirstNameAndLastName(firstNameAndLastName).role_id == 1)
                {
                    Session.Add("Admin", firstNameAndLastName);
                    FormsAuthentication.SetAuthCookie(firstNameAndLastName, true);
                    Users Current = entity.Users.Where(item => item.firstNameAndLastName == firstNameAndLastName).FirstOrDefault();
                    Session.Add("USER", firstNameAndLastName);
                    Session["userid"] = Current.id;
                    return Redirect("~/Admin");
                }
                else if (UserTable.GetByfirstNameAndLastName(firstNameAndLastName).role_id == 2)
                {
                    Session.Add("User", firstNameAndLastName);
                    FormsAuthentication.SetAuthCookie(firstNameAndLastName, true);
                    Users Current = entity.Users.Where(item => item.firstNameAndLastName == firstNameAndLastName).FirstOrDefault();
                    Session.Add("USER", firstNameAndLastName);
                    Session["userid"] = Current.id;
                    return Redirect("~/");
                }
                
             
                return Redirect("/Account/Login");
            }
            else
            {
                return View(model: "نام کاربری یا رمزعبور نامعتبر است !!!");
            }


        }

        public JsonResult Adduser(Users record)
        {
            //record.RoleId = 1;
            //UserTable.GetBtRole(RoleId).RoleId = 1;
            JsonResult result = new JsonResult();
            result.Data = Usertable.Create(record);
            return result;
        }
    }
}