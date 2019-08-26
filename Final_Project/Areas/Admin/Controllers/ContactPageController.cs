using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class ContactPageController : Controller
    {
        ContactPage ContactPageTable = new ContactPage();
        // GET: Admin/ContactPage
        public ActionResult Index()
        {
            //ViewBag.userName = Session["USER"].ToString();
            return View(model: ContactPageTable.Read());
        }
        [HttpGet]
        public ActionResult Operation(int? id)
        {
            if (id != null)
            {
                //Update Mode
                return View(model: ContactPageTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new ContactPage());
            }
        }

        [HttpPost]
        public ActionResult Operation(ContactPage inputs)
        {
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create ContactPage
                ViewBag.msg = ContactPageTable.Create(inputs);
                #endregion
            }
            else
            {
                //Update Mode
                #region Update ContactPage
                ContactPageTable.Update(inputs);
                #endregion
            }

            return Redirect("/Admin/ContactPage");
        }

        public ActionResult Delete(int id)
        {

            ContactPageTable.Delete(id);
            return Redirect("~/Admin/ContactPage");
        }
    }
}