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
    public class AdViewModel
    {
        public int id { get; set; }
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
        public string address { get; set; }
        public string description { get; set; }
        public string tell { get; set; }
        public Users UpdatedBy { get; set; }
        public Users CreatedBy { get; set; }

        public string qdate { get; set; }
        public DateTime date { get; set; }
        public City City_table { get; set; }
        public ProvincesTb Provience{ get; set; }
        public PropertyType propertyType { get; set; }
        public string imageUrl { get; set; }
        public Condition Condition { get; set; }
    }
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

        public int UpdatedBy_id { get; set; }
        [NotMapped]
        public Users UpdatedBy { get; set; }

        public int CreatedBy_id { get; set; }
        [NotMapped]
        public Users CreatedBy { get; set; }

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
            entity.Ads.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        private IQueryable<AdViewModel> SelectAdsWithCreator(IQueryable<Advertising> adsQueryable)
        {
            return adsQueryable.Select(ab => new AdViewModel
            {
                id = ab.id,
                title = ab.title,
                typeOfAd = ab.typeOfAd,
                Price = ab.Price,
                mortgage = ab.mortgage,
                rent = ab.rent,
                area = ab.area,
                numberOfRooms = ab.numberOfRooms,
                floor = ab.floor,
                numberOfFloors = ab.numberOfFloors,
                productionYear = ab.productionYear,
                address = ab.address,
                description = ab.description,
                tell = ab.tell,
                UpdatedBy = entity.Users.Where(u => u.id == ab.UpdatedBy_id).FirstOrDefault(),
                CreatedBy = entity.Users.Where(u => u.id == ab.CreatedBy_id).FirstOrDefault(),
                qdate = ab.qdate,
                date = ab.date,
                City_table = ab.City_table,
                Provience = ab.City_table.Province_table,
                propertyType = ab.propertyType,
                imageUrl = ab.imageUrl,
                Condition = ab.Condition,
            });
        }

        /// <summary>
        /// Return all ads 
        /// </summary>
        /// <returns></returns>
        public List<AdViewModel> Read()
        {
            return SelectAdsWithCreator(entity.Ads.Include(a => a.City_table.Province_table)).ToList();
        }

        /// <summary>
        /// Return all ads, with specific condition
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public List<Advertising> Read(Condition status)
        {
            return entity.Ads
                .Include(a => a.City_table.Province_table)
                .Where(a => a.Condition == status)
                .ToList();
        }

        /// <summary>
        /// Return ads, related to specific user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<AdViewModel> Read(int userId)
        {
            return SelectAdsWithCreator(
                entity.Ads
                    .Include(a => a.City_table.Province_table)
                    .Where(a => a.CreatedBy_id.Equals(userId))
            ).ToList();
        }

        /// <summary>
        /// Return ads with specific condition, related to specific user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public List<Advertising> Read(int userId, Condition status)
        {
            return entity.Ads
                .Include(a => a.City_table.Province_table)
                .Where(a => a.CreatedBy_id.Equals(userId))
                .Where(a => a.Condition.Equals(status))
                .ToList();
        }

        /// <summary>
        /// Return ads with specific condition and type
        /// </summary>
        /// <param name="status"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public IQueryable<Advertising> Read(Condition status, TypeAd type)
        {
            return entity.Ads
                .Include(a => a.City_table.Province_table)
                .OrderByDescending(a => a.date)
                .Where(a => a.typeOfAd == type)
                .Where(a => a.Condition == status);
                 
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
        public IQueryable<Advertising> Read(Condition status, string needle, TypeAd typeAd, PropertyType? type, long? minPrice, long? maxPrice, numberOfRooms? roomCount, numberOfFloors? floorsCount, int? minArea, int? maxArea)
        {
            var query = entity.Ads
                .Include(a => a.City_table.Province_table)
                .OrderByDescending(a => a.date)
                .Where(a => a.Condition == status)
                .Where(a => a.typeOfAd == typeAd);

            if (needle != null)
            {
                query = query.Where(a =>
                    a.City_table.title.Contains(needle) ||
                    a.City_table.Province_table.title.Contains(needle) ||
                    a.title.Contains(needle)
                );
            }

            if (type != null)
            {
                query = query.Where(a => a.propertyType == type);
            }

            if (minPrice != null)
            {
                query = query.Where(a => a.Price >= minPrice);
            }

            if (maxPrice != null)
            {
                query = query.Where(a => a.Price <= maxPrice);
            }

            if (roomCount != null)
            {
                query = query.Where(a => a.numberOfRooms == roomCount);
            }

            if (floorsCount != null)
            {
                query = query.Where(a => a.numberOfFloors == floorsCount);
            }

            if (minArea != null)
            {
                query = query.Where(a => a.area >= minArea);
            }

            if (maxArea != null)
            {
                query = query.Where(a => a.area <= maxArea);
            }

            return query;
        }

        public List<AdViewModel> GetBookmarderAds(int userId)
        {
            return SelectAdsWithCreator(
                entity.Bookmark
                    .Where(b => b.Users_id.Equals(userId))
                    .Include(b => b.Advertising_table)
                    .Include(b => b.Advertising_table.City_table)
                    .Select(b => b.Advertising_table)
                )
                .ToList();
        }

        public Advertising FindById(int id)
        {
            return entity.Ads.Include(a => a.City_table.Province_table)
                .SingleOrDefault(a => a.id.Equals(id));
        }

        public AdViewModel FindByIdWithCreator(int id)
        {
            return SelectAdsWithCreator(entity.Ads.Include(a => a.City_table.Province_table))
                .SingleOrDefault(a => a.id.Equals(id));
        }

        public string Update(Advertising newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.Entry(newRecord).State = EntityState.Modified;
            entity.Entry(newRecord).Property(e => e.CreatedBy_id).IsModified = false;
            if (newRecord.id == 0)
            {
                entity.Ads.Add(newRecord);
            } else
            {
                // entity.Ads.Update(newRecord);
                // entity.Ads.Add(newRecord);
            }
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.Ads.Remove(entity.Ads.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.Ads.RemoveRange(entity.Ads.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
        public List<Advertising> GetBuyAdArea()
        {
            return entity.Ads.OrderBy(n => n.area).Take(8)
                .Include(a => a.City_table)
                .Where(a => a.typeOfAd == ModelLib.Enums.TypeAd.Buy)                
                .ToList();
        }
        public List<Advertising> GetRentAdArea()
        {
            return entity.Ads.OrderBy(n => n.area).Take(8)
                .Include(a => a.City_table)
                .Where(a => a.typeOfAd == ModelLib.Enums.TypeAd.Rent)
                .ToList();
        }
        public List<Advertising> GetBuyAdPric()
        {
            return entity.Ads.OrderBy(n => n.Price).Take(8)
                .Include(a => a.City_table)
                .Where(a => a.typeOfAd == ModelLib.Enums.TypeAd.Buy)
                .ToList();
        }
       
        public List<Advertising> GetRentAdPric()
        {
            return entity.Ads.OrderBy(n => n.Price).Take(8)
                .Include(a => a.City_table)
                .Where(a => a.typeOfAd == ModelLib.Enums.TypeAd.Rent)
                .ToList();
        }
        public List<Advertising> GetSimilarAds(Advertising ad)
        {
            return entity.Ads.OrderByDescending(n=>n.date).Take(10)
                .Include(a => a.City_table)
                .Where(a => a.propertyType == ad.propertyType && a.id != ad.id && a.typeOfAd == ad.typeOfAd)                
                .ToList();
        }

    }
}
