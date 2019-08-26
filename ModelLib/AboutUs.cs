using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public partial class AboutUs
    {
        public int id { get; set; }
        [MaxLength(100)]
        public string title1 { get; set; }
        public string text1 { get; set; }
        [MaxLength(100)]
        public string title2 { get; set; }
        public string text2 { get; set; }
        [MaxLength(100)]
        public string title3 { get; set; }
        public string text3 { get; set; }
        [MaxLength(100)]
        public string title4 { get; set; }
        public string text4 { get; set; }
    }

    //CRAD
    public partial class AboutUs
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(AboutUs newRecord)
        {

            entity.AboutUs.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<AboutUs> Read()
        {
            return entity.AboutUs.ToList();
        }
        public AboutUs Read(int id)
        {
            return entity.AboutUs.Find(id);
        }

        public string Update(AboutUs newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.AboutUs.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.AboutUs.Remove(entity.AboutUs.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.AboutUs.RemoveRange(entity.AboutUs.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }
}
