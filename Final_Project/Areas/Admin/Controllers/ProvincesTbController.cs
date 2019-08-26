using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class ProvincesTbController : Controller
    {
        ProvincesTb ProvinceTable = new ProvincesTb();
        // GET: Admin/Province
        public ActionResult Index()
        {
            ViewBag.userName = Session["USER"].ToString();
            return View(model: ProvinceTable.Read());
        }
        [HttpGet]
            
        public ActionResult Operation(int? id)
        {
            if (id != null)
            {
                //Update Mode
                return View(model: ProvinceTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new ProvincesTb());
            }
        }

        [HttpPost]
        public ActionResult Operation(ProvincesTb inputs)
        {
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create ProvincesTb
                ViewBag.msg = ProvinceTable.Create(inputs);
                #endregion
            }
            else
            {
                //Update Mode
                #region Update ProvincesTb
                ProvinceTable.Update(inputs);
                #endregion
            }

            return Redirect("/Admin/ProvincesTb");
        }

        public ActionResult Delete(int id)
        {

            ProvinceTable.Delete(id);
            return Redirect("~/Admin/ProvincesTb");
        }
    }
}