using Microsoft.EntityFrameworkCore;
using Thuto.Models;

namespace Thuto.Data
{
    public class ThutoDataContext : DbContext
    {
        public ThutoDataContext(DbContextOptions<ThutoDataContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Document> Documents { get; set; }

        public DbSet<UserDocument> UserDocuments { get; set; }

        public DbSet<University> Universities { get; set; }

        public DbSet<PinnedUniversity> PinnedUniversities { get; set; }

        public DbSet<Funding> Fundings { get; set; }

        public DbSet<UniversityFunding> UniversityFundings { get; set; }

        public DbSet<Faculty> Faculties { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<CourseOffered> CourseOfferings { get; set; }

        public DbSet<PinnedCourse> PinnedCourses { get; set; }

        public DbSet<Career> Careers { get; set; }

        public DbSet<CourseCareer> CourseCareers { get; set; }

        public DbSet<ImportantDate> ImportantDates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Document>().ToTable("Document");
            modelBuilder.Entity<UserDocument>().ToTable("UserDocument");
            modelBuilder.Entity<University>().ToTable("University");
            modelBuilder.Entity<PinnedUniversity>().ToTable("PinnedUniversity");
            modelBuilder.Entity<Funding>().ToTable("Funding");
            modelBuilder.Entity<UniversityFunding>().ToTable("UniversityFunding");
            modelBuilder.Entity<Faculty>().ToTable("Faculty");
            modelBuilder.Entity<Course>().ToTable("Course");
            modelBuilder.Entity<CourseOffered>().ToTable("CourseOffered");
            modelBuilder.Entity<PinnedCourse>().ToTable("PinnedCourse");
            modelBuilder.Entity<Career>().ToTable("Career");
            modelBuilder.Entity<CourseCareer>().ToTable("CourseCareer");
            modelBuilder.Entity<ImportantDate>().ToTable("ImportantDate");

            // Composite primary key for UserDocument
            modelBuilder.Entity<UserDocument>()
                .HasKey(ud => new { ud.UserID, ud.DocumentID });

            // UserDocument → User
            modelBuilder.Entity<UserDocument>()
                .HasOne(ud => ud.User)
                .WithMany(u => u.UserDocuments)
                .HasForeignKey(ud => ud.UserID);

            // UserDocument → Document
            modelBuilder.Entity<UserDocument>()
                .HasOne(ud => ud.Document)
                .WithMany(d => d.UserDocuments)
                .HasForeignKey(ud => ud.DocumentID);

            modelBuilder.Entity<PinnedUniversity>()
                .HasKey(pu => new { pu.UserID, pu.UniversityID });

            modelBuilder.Entity<PinnedUniversity>()
                .HasOne(pu => pu.User)
                .WithMany(u => u.PinnedUniversities)
                .HasForeignKey(pu => pu.UserID);

            modelBuilder.Entity<PinnedUniversity>()
                .HasOne(pu => pu.University)
                .WithMany(u => u.PinnedUniversities)
                .HasForeignKey(pu => pu.UniversityID);

            modelBuilder.Entity<UniversityFunding>()
                .HasKey(uf => new { uf.UniversityID, uf.FundingID });

            modelBuilder.Entity<UniversityFunding>()
                .HasOne(uf => uf.University)
                .WithMany(u => u.UniversityFundings)
                .HasForeignKey(uf => uf.UniversityID);

            modelBuilder.Entity<UniversityFunding>()
                .HasOne(uf => uf.Funding)
                .WithMany(f => f.UniversityFundings)
                .HasForeignKey(uf => uf.FundingID);

            modelBuilder.Entity<Faculty>()
                .HasOne(f => f.University)
                .WithMany(u => u.Faculties)
                .HasForeignKey(f => f.UniversityID);


            modelBuilder.Entity<CourseOffered>()
                .HasOne(co => co.University)
                .WithMany(u => u.CourseOfferings)
                .HasForeignKey(co => co.UniversityID);

            modelBuilder.Entity<CourseOffered>()
                .HasOne(co => co.Course)
                .WithMany(c => c.CourseOfferings)
                .HasForeignKey(co => co.CourseID);

            modelBuilder.Entity<CourseOffered>()
                .HasOne(co => co.Faculty)
                .WithMany(f => f.CourseOfferings)
                .HasForeignKey(co => co.FacultyID);

            modelBuilder.Entity<PinnedCourse>()
                .HasKey(pc => new { pc.UserID, pc.CourseID });

            modelBuilder.Entity<PinnedCourse>()
                .HasOne(pc => pc.User)
                .WithMany(u => u.PinnedCourses)
                .HasForeignKey(pc => pc.UserID);

            modelBuilder.Entity<PinnedCourse>()
                .HasOne(pc => pc.Course)
                .WithMany(c => c.PinnedCourses)
                .HasForeignKey(pc => pc.CourseID);

            modelBuilder.Entity<CourseCareer>()
                .HasKey(cc => new { cc.CourseID, cc.CareerID });

            modelBuilder.Entity<CourseCareer>()
                .HasOne(cc => cc.Course)
                .WithMany(c => c.CourseCareers)
                .HasForeignKey(cc => cc.CourseID);

            modelBuilder.Entity<CourseCareer>()
                .HasOne(cc => cc.Career)
                .WithMany(c => c.CourseCareers)
                .HasForeignKey(cc => cc.CareerID);

            modelBuilder.Entity<ImportantDate>()
                .HasOne(id => id.University)
                .WithMany(u => u.ImportantDates)
                .HasForeignKey(id => id.UniversityID);
        }
    }
}
