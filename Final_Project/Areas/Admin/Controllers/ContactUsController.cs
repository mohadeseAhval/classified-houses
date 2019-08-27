using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class ContactUsController : BaseAdminController
    {
        ContactUs ContactUsTable = new ContactUs();
        // GET: Admin/ContactUs
        public ActionResult Index()
        {
            ViewBag.userName = User.Identity.Name;
            return View(model: ContactUsTable.Read());
        }
        [HttpGet]
        public ActionResult Operation(int? id)
        {
            if (id != null)
            {
                //Update Mode
                return View(model: ContactUsTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new ContactUs());
            }
        }
        [HttpPost]
        //public ActionResult Operation(ContactUs inputs)
        //{
        //    if (inputs.id == 0)
        //    {
        //        //Create Mode
        //        #region Create ContactUs
        //        ViewBag.msg = ContactUsTable.Create(inputs);
        //        #endregion
        //    }
        //    else
        //    {
        //        //Update Mode
        //        #region Update ContactUs
        //        ContactUsTable.Update(inputs);
        //        #endregion
        //    }
        //    return Redirect("~/admin/ContactUs");
        //}
        public ActionResult Delete(int id)
        {

            ContactUsTable.Delete(id);
            return Redirect("~/Admin/ContactUs");
        }
    }
}