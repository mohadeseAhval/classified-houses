using ModelLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class CityController : BaseAdminController
    {
        //ProvincesTb ProvincesTable = new ProvincesTb();
        EF_DataBase db = new EF_DataBase();
        City CityTable = new City();
        // GET: Admin/City
        public ActionResult Index()
        {
            ViewBag.userName = User.Identity.Name;
            return View(model: CityTable.Read());
        }
        [HttpGet]
        public ActionResult Operation(int? id)
        {
            ViewBag.userName = User.Identity.Name;
            if (id != null)
            {
                //Update Mode
                return View(model: CityTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new City());
            }
        }

        [HttpPost]
        public ActionResult Operation(City inputs)
        {
            ViewBag.userName = User.Identity.Name;
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create City
                ViewBag.msg = CityTable.Create(inputs);
                ViewBag.namePrv = new SelectList(db.ProvincesTb, "id", "title");
                #endregion
            }
            else
            {
                //Update Mode
                #region Update City
                CityTable.Update(inputs);
                #endregion
            }

            return Redirect("/Admin/City");
        }

        public ActionResult Delete(int id)
        {

            CityTable.Delete(id);
            return Redirect("~/Admin/City");
        }
       
    }
}