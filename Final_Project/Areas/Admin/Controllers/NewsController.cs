using ModelLib;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Areas.Admin.Controllers
{
    public class NewsController : BaseAdminController
    {
        News NewsTable = new News();
        // GET: Admin/News
        public ActionResult Index()
        {
            ViewBag.userName = User.Identity.Name;
            return View(model: NewsTable.Read());
        }
        [HttpGet]
        public ActionResult Operation(int? id)
        {
            ViewBag.userName = User.Identity.Name;
            if (id != null)
            {
                //Update Mode
                return View(model: NewsTable.Read(id.Value));
            }
            else
            {
                //Create Mode
                return View(model: new News());
            }
        }
        [HttpPost]
        public ActionResult Operation(News inputs, string oldUrl)
        {
            ViewBag.userName = User.Identity.Name;
            inputs.author = Session["USER"].ToString();
            String id = Session["userid"].ToString();
            inputs.User_id = int.Parse(id);
            inputs.date = DateTime.Now;
            PersianCalendar pc = new PersianCalendar();
            inputs.qdate = pc.GetYear(DateTime.Now) + "/" + pc.GetMonth(DateTime.Now) + "/" + pc.GetDayOfMonth(DateTime.Now);
            if (inputs.id == 0)
            {
                //Create Mode
                #region Create News
                inputs.visitCount = 1000;
                var image = Request.Files[0];
                string url = "~/Images/NewsFiles/" + DateTime.Now.Millisecond + image.FileName;
                if (image.FileName != "")
                {
                    if (image.ContentType == "image/jpeg" || image.ContentType == "image/jpg" || image.ContentType == "image/png")
                    {
                        if (image.ContentLength <= 1024000)
                        {
                            image.SaveAs(Server.MapPath(url));
                            inputs.imageUrl = url;
                            ViewBag.msg = NewsTable.Create(inputs);
                        }
                    }
                }
                #endregion
            }
            else
            {
                //Update Mode
                #region Update News
                var image = Request.Files[0];
                string url = "~/Images/NewsFiles/" + DateTime.Now.Millisecond + image.FileName;
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
                NewsTable.Update(inputs);
                #endregion
            }
            return Redirect("/Admin/News");
        }

        public ActionResult Delete(int id)
        {
            System.IO.File.Delete(Server.MapPath((NewsTable.Read(id)).imageUrl));
            NewsTable.Delete(id);
            return Redirect("~/Admin/News");
        }
    }
}