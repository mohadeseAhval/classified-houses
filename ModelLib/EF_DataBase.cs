namespace ModelLib
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class EF_DataBase : DbContext
    {
        public EF_DataBase()
            : base("name=EF_DataBase1")
        {
        }

        public virtual DbSet<ProvincesTb> ProvincesTb { get; set; }
        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Questions> Questions { get; set; }
        public virtual DbSet<AboutUs> AboutUs { get; set; }
        public virtual DbSet<ContactPage> ContactPage { get; set; }
        public virtual DbSet<ContactUs> ContactUs { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Bookmark> Bookmark { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Advertising> Ads { get; set; }
        public virtual DbSet<Rules> Rules { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
