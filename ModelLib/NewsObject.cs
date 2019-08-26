using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public class NewsObject
    {
        public List<ModelLib.News> slider_o { get; set; }
        public List<ModelLib.News> news_o { get; set; }
        public List<ModelLib.News> popularNews_o { get; set; }
        public List<ModelLib.News>  LatestNews_o {get;set;}
    }
}
