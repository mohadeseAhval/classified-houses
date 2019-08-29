using ModelLib;
using ModelLib.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using X.PagedList.Mvc;
using X.PagedList;

namespace Final_Project.Controllers
{
    public class HomeController : Controller
    {
        ContactUs ContactUs_Tb = new ContactUs();
        ContactPage ContactPage_Tb = new ContactPage();
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
            // Breadcrumb
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb { Title = "درباره ما", Url = Url.Action(nameof(About), "Home"), Position = 2 }
            };
            return View(model: AboutUs_Tb.Read());
        }

        public ActionResult Advertising()
        {
            // Breadcrumb
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb { Title = "تبلیغات در املاک", Url = Url.Action(nameof(Advertising), "Home"), Position = 2 }
            };
            return View();
        }

        public ActionResult Blog()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Contact()
        {
            // Breadcrumb
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb { Title = "تماس با ما", Url = Url.Action(nameof(Contact), "Home"), Position = 2 }
            };
            return View(model: ContactPage_Tb.Read());
        }

        // uni
        [HttpPost]
        public JsonResult AddContact(ContactUs record)
        {
            JsonResult result = new JsonResult();

            result.Data = ContactUs.Create(record);           

            return result;
        }

        public ActionResult Faq()
        {
            // Breadcrumb
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb { Title = "سوالات متداول", Url = Url.Action(nameof(Faq), "Home"), Position = 2 }
            };
            return View(model: Questions_Tb.Read());
        }

        public ActionResult Landing()
        { // Breadcrumb
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb { Title = "همکاری", Url = Url.Action(nameof(Landing), "Home"), Position = 2 }
            };
            return View();
        }

        public ActionResult Terms()
        {
            // Breadcrumb
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb { Title = "ضوابط و قوانین", Url = Url.Action(nameof(Terms), "Home"), Position = 2 }
            };
            return View(model: Rules_Tb.Read());
        }

        public ActionResult News()
        {
            return View();
        }

        [HttpGet]
        public ActionResult searchAd(TypeAd? sales_type, string needle, PropertyType? type, long? min_price, long? max_price, numberOfRooms? min_bedroom, int? min_size, int? max_size, int? page)
        {
            ViewBag.sales_type = sales_type;
            ViewBag.needle = needle;
            ViewBag.type = type;
            ViewBag.min_price = min_price;
            ViewBag.max_price = max_price;
            ViewBag.min_bedroom = min_bedroom;
            ViewBag.min_size = min_size;
            ViewBag.max_size = max_size;

            ViewBag.FormAdTitle = sales_type == TypeAd.Buy ? "خرید" : "رهن و اجاره";

            // Breadcrumb
            ViewBag.Breadcrumb = new List<Breadcrumb> {
                new Breadcrumb { Title = "صفحه اصلی", Url = "/", Position = 1 },
                new Breadcrumb { Title = "جستجو", Url = Url.Action(nameof(searchAd), "Home",new { sales_type = ViewBag.sales_type, needle= ViewBag.needle,type=ViewBag.type,min_price=ViewBag.min_price, max_price=ViewBag.max_price, min_bedroom=ViewBag.min_bedroom, min_size=ViewBag.min_size, max_size=ViewBag.max_size }), Position = 2 },
                new Breadcrumb { Title = ViewBag.FormAdTitle,  Url = null, Position = 3 }
            };

            var resolvedSalesType = TypeAd.Buy;
            if (sales_type != null)
            {
                resolvedSalesType = (TypeAd)sales_type;
            }
            var ads = _adsRepository.Read(Condition.Ctrue, needle, resolvedSalesType, type, min_price, max_price, min_bedroom, null, min_size, max_size);
            var pageNumber = page ?? 1;
            var onePageOfAds = ads.ToPagedList(pageNumber, 2);
            return View(onePageOfAds);
        }
       
    }
}