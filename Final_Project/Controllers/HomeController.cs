using ModelLib;
using ModelLib.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Controllers
{
    public class HomeController : Controller
    {
        ContactUs ContactUs_Tb = new ContactUs();
        ContactPage ContactPage_Tb = new ContactPage();
        //Advertising AdvertisingTable = new Advertising();
        Questions Questions_Tb = new Questions();
        AboutUs AboutUs_Tb = new AboutUs();
        Rules Rules_Tb = new Rules();
        Advertising _adsRepository = new Advertising();
        
        // GET: Home
        public ActionResult Index()
        {
            return View();  
        }

        public ActionResult About()
        {
            return View(model: AboutUs_Tb.Read());
        }

        public ActionResult Advertising()
        {
            return View();
        }

        public ActionResult Blog()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Contact()
        {
            return View(model: ContactPage_Tb.Read());
        }

        [HttpPost]
        // uni
        public JsonResult AddContact(ContactUs record)
        {
            JsonResult result = new JsonResult();

            result.Data = ContactUs.Create(record);           

            return result;
        }

        public ActionResult Faq()
        {
            return View(model: Questions_Tb.Read());
        }

        public ActionResult Landing()
        {
            return View();
        }

        public ActionResult Terms()
        {
            return View(model: Rules_Tb.Read());
        }
        //public ActionResult Buy()
        //{
           
        //    return View(model: ads);
        //}
        //public ActionResult Rent()
        //{
        //    var ads = AdvertisingTable.Read(Condition.Ctrue);
        //    return View();
        //}
        public ActionResult News()
        {
            return View();
        }
        //public ActionResult Ad_house(int id)
        //{

        //    return View(model: AdvertisingTable.Read(id));
        //}
        [HttpGet]
        public ActionResult searchAd(TypeAd sales_type, string needle, PropertyType type, long min_price, long max_price, numberOfRooms min_bedroom, int min_size, int max_size)
        {
            _adsRepository.Read(Condition.Ctrue, needle, sales_type, type, min_price, max_price, min_bedroom, null, min_size, max_size);
            return View();
        }
       
    }
}