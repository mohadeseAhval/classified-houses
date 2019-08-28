using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLib
{
   public partial class Bookmark
    {
        public int id { get; set; }
        public string qdate { get; set; }
        public DateTime date { get; set; }
        [ForeignKey("Advertising_table")]
        public int Ad_id { get; set; }
        public Advertising Advertising_table { get; set; }

        [ForeignKey("Users_table")]
        public int Users_id { get; set; }
        public Users Users_table { get; set; }
    }

    //CRUD
    public partial class Bookmark
    {
        EF_DataBase entity = new EF_DataBase();


        public string Create(Bookmark newRecord)
        {

            entity.Bookmark.Add(newRecord);
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public List<Bookmark> Read()
        {
            return entity.Bookmark.ToList();
        }
        public Bookmark Read(int id)
        {
            return entity.Bookmark.Find(id);
        }

        public Bookmark FindByUserIdAndAdId(int userId, int adId)
        {
            return entity.Bookmark
                .Where(b => b.Users_id.Equals(userId) && b.Ad_id.Equals(adId))
                .SingleOrDefault();
        }

        public string Delete(int id)
        {
            entity.Bookmark.Remove(entity.Bookmark.Find(id));
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }

        public string Delete()
        {
            entity.Bookmark.RemoveRange(entity.Bookmark.ToList());
            try { entity.SaveChanges(); return "done"; }
            catch { return "error"; }
        }
    }
}
