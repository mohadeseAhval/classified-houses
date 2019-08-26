using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public partial class MenuOne
    {
        public int id { get; set; }
        [MaxLength(50)]
        public string title { get; set; }
        public string link { get; set; }
    }

    //CRAD
    public partial class MenuOne
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(MenuOne newRecord)
        {

            entity.MenuOne.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<MenuOne> Read()
        {
            return entity.MenuOne.ToList();
        }
        public MenuOne Read(int id)
        {
            return entity.MenuOne.Find(id);
        }

        public string Update(MenuOne newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.MenuOne.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.MenuOne.Remove(entity.MenuOne.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.MenuOne.RemoveRange(entity.MenuOne.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }
}
