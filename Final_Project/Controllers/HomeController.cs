﻿using ModelLib;
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