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
    }
}
