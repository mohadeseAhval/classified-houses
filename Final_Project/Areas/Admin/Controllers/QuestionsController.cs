using ModelLib;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class QuestionsController : BaseAdminController
    {
        Questions QuestionsTable = new Questions();
        // GET: Admin/Questions
        public ActionResult Index()
        {
            ViewBag.userName = User.Identity.Name;
            return View(model: QuestionsTable.Read());
        }

        [HttpGet]
        public ActionResult Operation(int? id)
        {
            ViewBag.userName = User.Identity.Name;
            if (id != null)
            {
                //Update Mode
                return View(model: QuestionsTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new Questions());
            }
        }

        [HttpPost]
        public ActionResult Operation(Questions inputs)
        {
            ViewBag.userName = User.Identity.Name;
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create Questions
                ViewBag.msg = QuestionsTable.Create(inputs);
                #endregion
            }
            else
            {
                //Update Mode
                #region Update Questions
                QuestionsTable.Update(inputs);
                #endregion
            }

            return Redirect("/Admin/Questions");
        }

        public ActionResult Delete(int id)
        {

            QuestionsTable.Delete(id);
            return Redirect("~/Admin/Questions");
        }

    } 
}