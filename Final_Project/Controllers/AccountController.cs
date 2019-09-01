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
            bool isValid = true;
            var errors = new List<KeyValuePair<string, string>>();

            if (!ModelState.IsValid)
            {
                isValid = false;
                errors.AddRange(
                    ModelState
                        .Where(entry => entry.Value.Errors.Count() > 0)
                        .Where(entry => entry.Key != "role_id")
                        .Select(entry =>
                        new KeyValuePair<string, string>(entry.Key, entry.Value.Errors.FirstOrDefault()?.ErrorMessage)).ToList()
                );
            }

            // Password comparition
            if (record.password != record.repeadPassword)
            {
                isValid = false;
                errors.Add(
                    new KeyValuePair<string, string>(key: "repeadPassword", value: "تکرار رمز عبور با رمز وارد شده مطابقت ندارد")
                );
            }

            // Email should be unique
            if (!Usertable.IsEmailUnique(record.email))
            {
                isValid = false;
                errors.Add(
                    new KeyValuePair<string, string>(key: "email", value: "ایمیل تکراری است")
                );
            }

            // Username should be unique
            if (!Usertable.IsFirstNameAndLastNameUnique(record.firstNameAndLastName))
            {
                isValid = false;
                errors.Add(
                    new KeyValuePair<string, string>(key: "firstNameAndLastName", value: "نام کاربری تکراری است")
                );
            }

            if (!isValid)
            {
                result.Data = new { result = errors, success = false, code = "1" };
                return result;
            }

            var created = Usertable.Create(record);
            result.Data = new { result = created, success = created == "done", code = "100" };
            return result;
        }
        public ActionResult logout()
        {
            //Session["USER"] = null;
            //Session.Abandon();
            FormsAuthentication.SignOut();
            return Redirect("~/Account/Login");
        }
    }
}