using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using ModelLib.Enums;

namespace ModelLib
{
   public partial class Role
    {
        public int id { get; set; }
        public string title { get; set; }
        public RoleType Type { get; set; }
    }

    //CRUD
    public partial class Role
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(Role newRecord)
        {

            entity.Role.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<Role> Read()
        {
            return entity.Role.ToList();
        }
        public Role Read(int id)
        {
            return entity.Role.Find(id);
        }

        public string Update(Role newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.Role.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.Role.Remove(entity.Role.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.Role.RemoveRange(entity.Role.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }

}
