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
        [Required(ErrorMessage = "این فیلد نباید خالی باشد")]
        [MaxLength(50,ErrorMessage ="نباید بیشتر از 50 کاراکتر باشد")]
        public string firstNameAndLastName { get; set; }
        [Required(ErrorMessage = "این فیلد نباید خالی باشد")]
        public string tell { get; set; }
        [Required(ErrorMessage = "این فیلد نباید خالی باشد")]
        [MaxLength(100, ErrorMessage = "نباید بیشتر از 100 کاراکتر باشد")]
        public string address { get; set; }
        [Required(ErrorMessage = "این فیلد نباید خالی باشد")]
        public string email { get; set; }
        [Required(ErrorMessage = "این فیلد نباید خالی باشد")]
        public string NationalCode { get; set; }
        [Required(ErrorMessage = "این فیلد نباید خالی باشد")]
        [MaxLength(8, ErrorMessage = "نباید بیشتر از 8 کاراکتر باشد")]
        public string password { get; set; }
        [ForeignKey("role_table")]
        public int role_id { get; set; }
        public Role role_table { get; set; }
    }

    //CRAD
    public partial class Users
    {
        EF_DataBase entity = new EF_DataBase();
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
            return entity.Users.ToList();
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
