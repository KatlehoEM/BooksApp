using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext: IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Book> Books{get;set;}

    protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

           // Configuring the relationship between Book and AppUser
            builder.Entity<Book>()
                .HasOne(b => b.User)
                .WithMany(u => u.Books)
                .OnDelete(DeleteBehavior.Cascade);
        }


}
