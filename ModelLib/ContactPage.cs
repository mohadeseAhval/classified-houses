using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public partial class ContactPage
    {
        public int id { get; set; }
        [MaxLength(20)]
        public string tell { get; set; }
        public string hoursOfWork { get; set; }
        [MaxLength(100)]
        public string address { get; set; }
    }

    //CRAD
    public partial class ContactPage
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(ContactPage newRecord)
        {

            entity.ContactPage.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<ContactPage> Read()
        {
            return entity.ContactPage.ToList();
        }
        public ContactPage Read(int id)
        {
            return entity.ContactPage.Find(id);
        }

        public string Update(ContactPage newRecord)
        {
            //link oldrecord = entity.link.Find(newRecord.id);
            entity.ContactPage.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.ContactPage.Remove(entity.ContactPage.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.ContactPage.RemoveRange(entity.ContactPage.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }

}
