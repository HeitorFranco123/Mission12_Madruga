using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class BookstoreContext : DbContext
{
    public BookstoreContext(DbContextOptions<BookstoreContext> options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>().ToTable("Books");
        modelBuilder.Entity<Book>().HasKey(b => b.BookID);

        modelBuilder.Entity<Book>().Property(b => b.BookID).HasColumnName("BookID");
        modelBuilder.Entity<Book>().Property(b => b.Title).HasColumnName("Title");
        modelBuilder.Entity<Book>().Property(b => b.Author).HasColumnName("Author");
        modelBuilder.Entity<Book>().Property(b => b.Publisher).HasColumnName("Publisher");
        modelBuilder.Entity<Book>().Property(b => b.ISBN).HasColumnName("ISBN");
        modelBuilder.Entity<Book>().Property(b => b.Classification).HasColumnName("Classification");
        modelBuilder.Entity<Book>().Property(b => b.Category).HasColumnName("Category");
        modelBuilder.Entity<Book>().Property(b => b.PageCount).HasColumnName("PageCount");
        modelBuilder.Entity<Book>().Property(b => b.Price).HasColumnName("Price");
    }
}
