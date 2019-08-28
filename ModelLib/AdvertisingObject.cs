using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X.PagedList;

namespace ModelLib
{
   public class AdvertisingObject
    {
        public List<ModelLib.Advertising> area_o { get; set; }
        public List<ModelLib.Advertising> ads_o { get; set; }
        public List<ModelLib.Advertising> price_o { get; set; }
        public AdViewModel ad_o { get; set; }
        public IPagedList<ModelLib.Advertising> pagedAds_o { get; set; }
    }
}
