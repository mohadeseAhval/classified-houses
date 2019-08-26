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
  public partial class Advertising
    {
        public int id { get; set; }
        
        [MaxLength(300,ErrorMessage ="نباید از 50 کاراکتر بیشتر باشد")]
        public string title { get; set; }
        public TypeAd typeOfAd { get; set; }

        public long Price { get; set; }
        
        public long mortgage { get; set; }
        
        public long rent { get; set; }
        
        public int area { get; set; }
        
        public numberOfRooms numberOfRooms { get; set; }
        
        public floor floor { get; set; }
        
        public numberOfFloors numberOfFloors { get; set; }
        
        public productionYear productionYear { get; set; }
        
        [MaxLength(100)]
        public string address { get; set; }
        
        [MaxLength(500)]
        public string description { get; set; }
        
        [MaxLength(20)]
        public string tell  { get; set; }        
        [MaxLength(20)]
        public string nameOfRegistrant { get; set; }
        public int User_id { get; set; }
        public string qdate { get; set; }
        public DateTime date { get; set; }       
        [ForeignKey("City_table")]
        public int City_id { get; set; }
        public City City_table { get; set; }
        public PropertyType propertyType { get; set; }

       
        public string imageUrl { get; set; }
        public Condition Condition { get; set; }
    }

    //CRAD
    public partial class Advertising
    {
        EF_DataBase entity = new EF_DataBase();

        public string Create(Advertising newRecord)
        {
            //Condition Cfalse = default(Condition);
            //newRecord.Condition = Cfalse;

            // Set unconfirmed status for new ads by default.
            newRecord.Condition = Condition.Cfalse;
            entity.Advertising.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        /// <summary>
        /// Return all ads 
        /// </summary>
        /// <returns></returns>
        public List<Advertising> Read()
        {
            return entity.Advertising.Include(a => a.City_table.Province_table).ToList();
        }

        /// <summary>
        /// Return all ads, with specific condition
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public List<Advertising> Read(Condition status)
        {
            return entity.Advertising
                .Include(a => a.City_table.Province_table)
                .Where(a => a.Condition == status)
                .ToList();
        }

        /// <summary>
        /// Return ads, related to specific user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Advertising> Read(int userId)
        {
            return entity.Advertising
                .Include(a => a.City_table.Province_table)
                .Where(a => a.User_id.Equals(userId))
                .ToList();
        }

        /// <summary>
        /// Return ads with specific condition, related to specific user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public List<Advertising> Read(int userId, Condition status)
        {
            return entity.Advertising
                .Include(a => a.City_table.Province_table)
                .Where(a => a.User_id.Equals(userId))
                .Where(a => a.Condition.Equals(status))
                .ToList();
        }

        /// <summary>
        /// Return ads with specific condition and type
        /// </summary>
        /// <param name="status"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public List<Advertising> Read(Condition status, TypeAd type)
        {
            return entity.Advertising
                .Include(a => a.City_table.Province_table)
                .Where(a => a.typeOfAd==type)
                .Where(a => a.Condition == status)
                .ToList();
        }

        /// <summary>
        /// این تابع امکان جستجوی انتخابی برای آگهی ها را فراهم میکند. هر کدام از مواردی که می توانند نال باشند، در صورت نال بودن در جستجو در نظر گرفته نمی شوند.
        /// </summary>
        /// <param name="status">تایید شده یا نشده</param>
        /// <param name="needle">یک رشته برای جستجو در نام یا نام شهر یا نام استان آگهی</param>
        /// <param name="typeAd">خرید یا رهن و اجاره</param>
        /// <param name="type">آپارتمان یا اداری ای ویلا</param>
        /// <param name="minPrice">کمترین قیمت</param>
        /// <param name="maxPrice">بیشترین قیمت</param>
        /// <param name="roomCount">تعداد خواب</param>
        /// <param name="floorsCount">تعداد طبقه</param>
        /// <param name="minArea">کمترین متراژ</param>
        /// <param name="maxArea">بیشترین متراژ</param>
        /// <returns>لیستی از آگهی ها</returns>
        public List<Advertising> Read(Condition status, string needle, TypeAd typeAd, PropertyType? type, long? minPrice, long? maxPrice, numberOfRooms? roomCount, numberOfFloors? floorsCount, int? minArea, int? maxArea)
        {
            var query = entity.Advertising
                .Where(a => a.Condition == status)
                .Where(a => a.typeOfAd == typeAd);

            if (needle != null)
            {
                query.Where(a =>
                    a.City_table.title.Contains(needle) ||
                    a.City_table.Province_table.title.Contains(needle) ||
                    a.title.Contains(needle)
                );
            }

            if (type != null)
            {
                query.Where(a => a.propertyType == type);
            }

            if (minPrice != null)
            {
                query.Where(a => a.Price >= minPrice);
            }

            if (maxPrice != null)
            {
                query.Where(a => a.Price <= maxPrice);
            }

            if (roomCount != null)
            {
                query.Where(a => a.numberOfRooms == roomCount);
            }

            if (floorsCount != null)
            {
                query.Where(a => a.numberOfFloors == floorsCount);
            }

            if (minArea != null)
            {
                query.Where(a => a.area >= minArea);
            }

            if (maxArea != null)
            {
                query.Where(a => a.area <= maxArea);
            }

            return query.ToList();
        }

        public Advertising FindById(int id)
        {
            return entity.Advertising.Include(a => a.City_table.Province_table).SingleOrDefault(a => a.id.Equals(id));
        }
        
        public string Update(Advertising newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.Advertising.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.Advertising.Remove(entity.Advertising.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.Advertising.RemoveRange(entity.Advertising.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
        public List<Advertising> GetBuyAdArea()
        {
            return entity.Advertising.OrderByDescending(n => n.area).Take(8)
                .Where(a => a.typeOfAd == ModelLib.Enums.TypeAd.Buy)                
                .ToList();
        }
        public List<Advertising> GetBuyAdPric()
        {
            return entity.Advertising.OrderBy(n => n.Price).Take(8)
                .Where(a => a.typeOfAd == ModelLib.Enums.TypeAd.Buy)
                .ToList();
        }
        public List<Advertising> GetRentAdArea()
        {
            return entity.Advertising.OrderByDescending(n => n.area).Take(8)
                .Where(a => a.typeOfAd == ModelLib.Enums.TypeAd.Rent)
                .ToList();
        }
        public List<Advertising> GetRentAdPric()
        {
            return entity.Advertising.OrderBy(n => n.Price).Take(8)
                .Where(a => a.typeOfAd == ModelLib.Enums.TypeAd.Rent)
                .ToList();
        }

    }
}
