using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IBookRepository
{
    void AddBook(Book book);
    void DeleteBook(Book book);
    void UpdateBook(Book book);
    Task<Book> GetBookById(int id, string username);
    Task<PagedList<BookDto>> GetBooks(string username, PaginationParams paginationParams);
    Task<PagedList<BookDto>> GetBooksWithinPastMonth(string usename, PaginationParams paginationParams);
    

}
