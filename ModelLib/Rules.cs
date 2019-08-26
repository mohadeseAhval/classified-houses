using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public partial class Rules
    {
        public int id { get; set; }
        [MaxLength(300)]
        public string title { get; set; }
        public string desc { get; set; }
    }
    //CRUD
    public partial class Rules
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(Rules newRecord)
        {

            entity.Rules.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<Rules> Read()
        {
            return entity.Rules.ToList();
        }
        public Rules Read(int id)
        {
            return entity.Rules.Find(id);
        }

        public string Update(Rules newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.Rules.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.Rules.Remove(entity.Rules.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.Rules.RemoveRange(entity.Rules.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }
}
