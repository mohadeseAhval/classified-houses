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
   public partial class City
    {
        public int id { get; set; }        

        [ForeignKey("Province_table")]
        public int Province_id { get; set; }
        public ProvincesTb Province_table { get; set; }
        public string Province_name { get; set; }
        [MaxLength(20)]
        public string title { get; set; }
        public IList<Advertising> Ads { get; set; }

        [NotMapped]
        public string Selected { get; set; }

    }

    //CRAD
    public partial class City
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(City newRecord)
        {

            entity.City.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<City> Read()
        {
            return entity.City.Include(c => c.Province_table).ToList();
        }
        public City Read(int id)
        {
            return entity.City.Find(id);
        }

        public string Update(City newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.City.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.City.Remove(entity.City.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.City.RemoveRange(entity.City.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public IList<City> GetCities(int pid)
        {
            return entity.City.Where(c => c.Province_id.Equals(pid)).ToList();
        }
    }
}
