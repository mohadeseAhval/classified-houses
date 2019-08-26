using ModelLib;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class AdvertisingController : Controller
    {
        Advertising AdvertisingTable = new Advertising();
        City _cityRepository = new City();
        ProvincesTb _provienceRepository = new ProvincesTb();
        // GET: Admin/Advertising
        public ActionResult Index()        
        {
            ViewBag.userName = Session["USER"].ToString();
            return View(model: AdvertisingTable.Read());
        }

        [HttpGet]
        public ActionResult Cities(int id)
        {
            ProvincesTb provience = _provienceRepository.Read(id);

            if (provience == null)
            {
                return Json(new { success = false, errorMessage = "Provience is not found!" },
                    JsonRequestBehavior.AllowGet);
            }

            IList<City> cities = _cityRepository.GetCities(provience.id);

            return Json(new { success = true, result = cities }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Operation(int? id)
        {
            ViewBag.Proviences = _provienceRepository.Read();
            if (id != null)
            {
                var ad = AdvertisingTable.FindById(id.Value);
                var index = 0;
                foreach(ProvincesTb provience in ViewBag.Proviences)
                {
                    if (provience.id.Equals(ad.City_table.Province_id)) {
                        ViewBag.Proviences[index].Selected = "selected";
                    } else
                    {
                        ViewBag.Proviences[index].Selected = "";
                    }
                    index++;
                }

                ViewBag.Cities = _cityRepository.GetCities(ad.City_table.Province_id); ;
                index = 0;
                foreach (City city in ViewBag.Cities)
                {
                    if (city.id.Equals(ad.City_table.id))
                    {
                        ViewBag.Cities[index].Selected = "selected";
                    }
                    else
                    {
                        ViewBag.Cities[index].Selected = "";
                    }
                    index++;
                }
                //Update Mode
                return View(model: ad);
            }
            else
            {
                //Create Mode
                return View(model: new Advertising());
            }
        }
        [HttpPost]
        public ActionResult Operation(Advertising inputs, string oldUrl)
        {
            inputs.nameOfRegistrant = Session["USER"].ToString();
            String id = Session["userid"].ToString();
            inputs.User_id = int.Parse(id);
            inputs.date = DateTime.Now;
            PersianCalendar pc = new PersianCalendar();
            inputs.qdate = pc.GetYear(DateTime.Now) + "/" + pc.GetMonth(DateTime.Now) + "/" + pc.GetDayOfMonth(DateTime.Now);
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create Advertising              
                var image = Request.Files[0];
                string url = "~/Images/ImageAd/" + DateTime.Now.Millisecond + image.FileName;
                if (image.FileName != "")
                {
                    if (image.ContentType == "image/jpeg" || image.ContentType == "image/jpg" || image.ContentType == "image/png")
                    {
                        if (image.ContentLength <= 1024000)
                        {
                            image.SaveAs(Server.MapPath(url));
                            inputs.imageUrl = url;
                            ViewBag.msg = AdvertisingTable.Create(inputs);
                        }
                    }
                }
                #endregion
            }
            else
            {
                //Update Mode
                #region Update Advertising                                          
                var image = Request.Files[0];
                string url = "~/Images/ImageAd/" + DateTime.Now.Millisecond + image.FileName;
                if (image.FileName != "")
                {
                    if (image.ContentType == "image/jpeg" || image.ContentType == "image/jpg" || image.ContentType == "image/png")
                    {
                        if (image.ContentLength <= 1024000)
                        {
                            System.IO.File.Delete(Server.MapPath(oldUrl));
                            image.SaveAs(Server.MapPath(url));
                            inputs.imageUrl = url;
                        }
                    }
                }
                else
                {
                    inputs.imageUrl = oldUrl;
                }
                AdvertisingTable.Update(inputs);
                #endregion
            }
            return Redirect("/Admin/Advertising");
        }

        public ActionResult Delete(int id)
        {
            System.IO.File.Delete(Server.MapPath((AdvertisingTable.FindById(id)).imageUrl));
            AdvertisingTable.Delete(id);
            return Redirect("~/Admin/Advertising");
        }
    }
}