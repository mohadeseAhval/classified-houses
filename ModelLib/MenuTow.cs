using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public partial class MenuTow
    {
        public int id { get; set; }
        [MaxLength(10)]
        public string title { get; set; }
        public string link { get; set; }
    }

    //CRAD
    public partial class MenuTow
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(MenuTow newRecord)
        {

            entity.MenuTow.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<MenuTow> Read()
        {
            return entity.MenuTow.ToList();
        }
        public MenuTow Read(int id)
        {
            return entity.MenuTow.Find(id);
        }

        public string Update(MenuTow newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.MenuTow.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.MenuTow.Remove(entity.MenuTow.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.MenuTow.RemoveRange(entity.MenuTow.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }
}
