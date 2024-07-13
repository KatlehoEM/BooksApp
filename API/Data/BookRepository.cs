using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class BookRepository : IBookRepository
{
    private readonly DataContext _context;

    public BookRepository(DataContext context)
    {
        _context = context;
    }
    public void AddBook(Book book)
    {
        _context.Books.Add(book);
        _context.SaveChangesAsync();

      
    }

    public void UpdateBook(Book book)
    {
        _context.Entry(book).State = EntityState.Modified;
        _context.SaveChangesAsync();

    }
    public async Task<Book> GetBookById(int id, string userName)
    {
        return await _context.Books.FirstOrDefaultAsync(x => x.Id == id && x.Username == userName);
        
    }

    public async Task<PagedList<BookDto>> GetBooks(string username, PaginationParams paginationParams)
    {
        var query = _context.Books
            .Where(b => b.Username == username)
            .Select(x => new BookDto
            {
                Id = x.Id,
                Date = x.Date,
                Title = x.Title,
                Author = x.Author,
                isRead = x.isRead,
                Description = x.Description

            }).AsNoTracking();

            return await PagedList<BookDto>.CreateAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
    }

    public async Task<PagedList<BookDto>> GetBooksWithinPastMonth(string username, PaginationParams paginationParams)
    {
        var pastMonth = DateTime.Now.AddDays(-30);
        var query = _context.Books
                .Where(b => b.Username == username && b.Date >= pastMonth)
                .Select(x => new BookDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Title = x.Title,
                    Author = x.Author,
                    isRead = x.isRead,
                    Description = x.Description
                }).AsNoTracking();
        return await PagedList<BookDto>.CreateAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
    }

    public void DeleteBook(Book book)
    {
        _context.Books.Remove(book);
        _context.SaveChangesAsync();
    }

}
