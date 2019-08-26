using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public partial class Questions
    {
        public int id { get; set; }
        [MaxLength(300)]
        public string question { get; set; }
        public string answer { get; set; }
    }

    //CRUD
    public partial class Questions
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(Questions newRecord)
        {

            entity.Questions.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<Questions> Read()
        {
            return entity.Questions.ToList();
        }
        public Questions Read(int id)
        {
            return entity.Questions.Find(id);
        }

        public string Update(Questions newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.Questions.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.Questions.Remove(entity.Questions.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.Questions.RemoveRange(entity.Questions.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }
}
