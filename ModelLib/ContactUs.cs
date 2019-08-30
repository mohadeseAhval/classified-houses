using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public partial class ContactUs
    {
        public int id { get; set; }
        [Required(ErrorMessage = "نام را وارد کنید")]
        [MaxLength(20, ErrorMessage = "طول نام بیشتر از 20 کاراکتر است")]
        public string userName { get; set; }
        [Required(ErrorMessage = "عنوان درخواست را وارد کنید")]
        [MaxLength(50, ErrorMessage = "طول عنوان بیشتر از 50 کاراکتر است")]
        public string subject { get; set; }
        [Required(ErrorMessage = "متن درخواست را وارد کنید")]
        [MaxLength(300, ErrorMessage = "طول متن بیشتر از 300 کاراکتر است")]
        public string text { get; set; }
        [Required(ErrorMessage = "ایمیل را وارد کنید")]
        public string email { get; set; }
        [Required(ErrorMessage = "شماره تماس را وارد کنید")]
        [MaxLength(11, ErrorMessage = "طول متن بیشتر از 11 کاراکتر است")]
        public string tell { get; set; }
       
    }

    //CRUD
    public partial class ContactUs
    {
        EF_DataBase entity = new EF_DataBase();


        public static string Create(ContactUs newRecord)
        {
            EF_DataBase entity = new EF_DataBase();
            entity.ContactUs.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<ContactUs> Read()
        {
            return entity.ContactUs.ToList();
        }
        public ContactUs Read(int id)
        {
            return entity.ContactUs.Find(id);
        }

        public string Update(ContactUs newRecord)
        {            
            entity.ContactUs.Attach(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete(int id)
        {
            entity.ContactUs.Remove(entity.ContactUs.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.ContactUs.RemoveRange(entity.ContactUs.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }
}
