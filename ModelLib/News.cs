using ModelLib.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public partial class News
    {
        public int id { get; set; }
        [MaxLength(100,ErrorMessage ="نباید از 100 کاراکتر بیشتر باشد")]
        public string title { get; set; }        
        public string desc { get; set; }        
        public string qdate { get; set; }
        public DateTime date { get; set; }
        public string keyword { get; set; }
        public int visitCount { get; set; }       
        public string imageUrl { get; set; }
        public string author { get; set; }   
        public int User_id { get; set; }
        public TypeNews type { get; set; }
        public CatNews cat { get; set; }
    }

    //CRUD
    public partial class News
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(News newRecord)
        {

            entity.News.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<News> Read()
        {
            return entity.News.ToList();
        }        

        public News Read(int id)
        {
            return entity.News.Find(id);
        }
      
        public string Update(News newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.News.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.News.Remove(entity.News.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.News.RemoveRange(entity.News.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
        public List<News> ReadByType(TypeNews type)
        {
            return entity.News.Where(a => a.type == type).ToList();
        }

        public List<News> ReadByCat(CatNews cat)
        {
            return entity.News.Where(a => a.cat == cat).ToList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="record">مدلی که برای آپدیت استفاده میشه. این مدل باید آی دی داشته باشه</param>
        /// <returns></returns>
        public string IncreaseVisitCount(News record)
        {
            News oldrecord = entity.News.Find(record.id);
            oldrecord.visitCount++;
            entity.News.Attach(oldrecord);
            entity.Entry(oldrecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        /// <summary>
        /// این تابع لیستی از اخبار پر بازدید را برمیگرداند
        /// </summary>
        /// <returns></returns>
        public List<News> GetMostViwedNews()
        {
            return entity.News.OrderByDescending(n => n.visitCount).Take(10).ToList();
        }

        /// <summary>
        /// این تابع لیستی از آخرین اخبا را برمیگرداند
        /// </summary>
        /// <returns></returns>
        public List<News> TopNews()
        {
            return entity.News.OrderByDescending(n => n.date).Take(10).ToList();
        }
    }
}
