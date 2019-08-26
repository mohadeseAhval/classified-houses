using ModelLib;
using ModelLib.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Final_Project.Controllers
{
    public class BlogController : Controller
    {
        News News_Tb = new News();
        // GET: Blog
        public ActionResult Index()
        {
            var LatestNews = News_Tb.TopNews();
            var popularNews = News_Tb.GetMostViwedNews();
            var sliders = News_Tb.ReadByCat(CatNews.Slider);
            var news = News_Tb.ReadByCat(CatNews.News);            
            return View(new NewsObject { news_o = news , slider_o = sliders , popularNews_o = popularNews , LatestNews_o = LatestNews});
        }
         public ActionResult Details(int id)
        {
            // این همون رکوردیه که هم آی دی داره و هم ما میخوایم آپدیتش کنیم
            var post = News_Tb.Read(id);
            News_Tb.IncreaseVisitCount(post);
            return View(model: post);
        }
    }
}