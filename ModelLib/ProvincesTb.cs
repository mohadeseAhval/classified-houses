using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;

namespace ModelLib
{
  public partial class ProvincesTb
    {
        public int id { get; set; }
        [MaxLength(20)]
        public string title { get; set; }

        [NotMapped]
        public string Selected { get; set; }
    }

    //CRUD
    public partial class ProvincesTb
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(ProvincesTb newRecord)
        {

            entity.ProvincesTb.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<ProvincesTb> Read()
        {
            return entity.ProvincesTb.ToList();
        }
        public ProvincesTb Read(int id)
        {
            return entity.ProvincesTb.Find(id);
        }

        public string Update(ProvincesTb newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.ProvincesTb.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.ProvincesTb.Remove(entity.ProvincesTb.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.ProvincesTb.RemoveRange(entity.ProvincesTb.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }
}
