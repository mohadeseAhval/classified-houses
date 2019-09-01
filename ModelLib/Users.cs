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
   public partial class Users
    {
        public int id { get; set; }

        [Required(ErrorMessage = " نام کاربری را وارد کنید")]
        [MaxLength(20, ErrorMessage = "طول نام بیشتر از 20 کاراکتر است")]
        public string firstNameAndLastName { get; set; }

        [Required(ErrorMessage = "شماره تماس را وارد کنید")]
        [MaxLength(11, ErrorMessage = "طول متن بیشتر از 11 کاراکتر است")]
        [RegularExpression("([0-9]+)", ErrorMessage = "فقط عدد قابل قبول است")]
        public string tell { get; set; }

        [Required(ErrorMessage = " آدرس را وارد کنید")]
        [MaxLength(100, ErrorMessage = "طول آدرس بیشتر از 100 کاراکتر است")]
        public string address { get; set; }

        [EmailAddress(ErrorMessage = "ایمیل صحیح نیست")]
        [Required(ErrorMessage = "ایمیل را وارد کنید")]
        public string email { get; set; }

        [Required(ErrorMessage = "کد ملی را وارد کنید")]
        [RegularExpression("([0-9]+)", ErrorMessage = "فقط عدد قابل قبول است")]
        public string NationalCode { get; set; }

        [Required(ErrorMessage = "رمز عبور را وارد کنید")]
        [MinLength(6, ErrorMessage = "طول رمز عبور کمتر از 6 کاراکتر است"), MaxLength(8,ErrorMessage = "طول رمز عبور بیشتر از 8 کاراکتر است")]
        public string password { get; set; }

        [NotMapped]
        public string repeadPassword { get; set; }

        [ForeignKey("role_table")]
        public int role_id { get; set; }
        public Role role_table { get; set; }
    }

    //CRUD
    public partial class Users
    {
        EF_DataBase entity = new EF_DataBase();

        public bool IsEmailUnique(string email)
        {
            return !entity.Users.Any(u => u.email.Equals(email));
        }

        public bool IsFirstNameAndLastNameUnique(string firstNameAndLastName)
        {
            return !entity.Users.Any(u => u.firstNameAndLastName.Equals(firstNameAndLastName));
        }

        public bool Authentication(string firstNameAndLastName, string password)
        {
            return entity.Users.Any(item => item.firstNameAndLastName == firstNameAndLastName && item.password == password);
        }

        public Users GetByfirstNameAndLastName(string firstNameAndLastName)
        {
            return entity.Users.Where(item => item.firstNameAndLastName == firstNameAndLastName).FirstOrDefault();
        }        
        public string Create(Users newRecord)
        { 
            newRecord.role_id = 2;
            entity.Users.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch (Exception ex) { return "error"; }
        }
        public List<Users> Read()
        {
            return entity.Users.Where(u => u.role_id != 1).ToList();
        }

        public List<Users> FindByUserId(int id)
        {
            return entity.Users.Where(u => u.id.Equals(id)).ToList();
        }

        public Users Read(int id)
        {
            return entity.Users.Find(id);
        }
        public string Update(Users newRecord)
        {
            // user oldrecord = entity.user.Find(newRecord.id);
            entity.Users.Add(newRecord);
            entity.Entry(newRecord).State = EntityState.Modified;
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
        public string Delete(int id)
        {
            entity.Users.Remove(entity.Users.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.Users.RemoveRange(entity.Users.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

    }
}
