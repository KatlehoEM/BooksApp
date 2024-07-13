using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class BooksController : BaseApiController
{
    private readonly IBookRepository _repo;

    public BooksController(IBookRepository repo)
    {
        _repo = repo;
    }

    //GET /api/books - Get all book entries

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks([FromQuery]PaginationParams paginationParams)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var books = await _repo.GetBooks(username,paginationParams);

        Response.AddPaginationHeader(new PaginationHeader(books.CurrentPage,books.PageSize, books.TotalCount, books.TotalPages));

        if(books == null) return NotFound();

        return Ok(books);
        
    }

    [HttpPost]
    public ActionResult AddBook(BookDto bookDto)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var book = new Book
        {
            Id = bookDto.Id,

            Date = DateTime.UtcNow,
            Title = bookDto.Title,
            Author = bookDto.Author,
            isRead = bookDto.isRead,
            Description = bookDto.Description,
            Username = username
        };


        _repo.AddBook(book);
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateBook(int id, BookUpdateDto bookUpdateDto)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var existingBook = await _repo.GetBookById(id,username);

        if(existingBook == null) return NotFound();

        existingBook.Title = bookUpdateDto.Title;
        existingBook.Author = bookUpdateDto.Author;
        existingBook.isRead = bookUpdateDto.isRead;
        existingBook.Description = bookUpdateDto.Description;
        existingBook.Date = DateTime.UtcNow;

        _repo.UpdateBook(existingBook);
        return NoContent();
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> UpdateBookReadMark(int id, JsonPatchDocument<Book> book)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var existingBook = await _repo.GetBookById(id,username);

        if(existingBook == null) return NotFound();
        existingBook.Date = DateTime.UtcNow;
        book.ApplyTo(existingBook,ModelState);
       _repo.UpdateBook(existingBook);
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetBookById(int id)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var book = await _repo.GetBookById(id, username);
        
        if(book == null) return NotFound();
        
        var bookDto = new BookDto
        {
            Id = book.Id,  
            Date = book.Date,
            Title = book.Title,
            Author = book.Author,
            isRead = book.isRead,
            Description = book.Description
        };
        return bookDto;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBook(int id)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var book = await _repo.GetBookById(id,username);
        _repo.DeleteBook(book);
        return Ok();
    }

    [HttpGet("pastmonth")]
    public async Task<ActionResult<IEnumerable<BookDto>>> GetBooksWithinPastMonth([FromQuery]PaginationParams paginationParams)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var books = await _repo.GetBooksWithinPastMonth(username,paginationParams);

         Response.AddPaginationHeader(new PaginationHeader(books.CurrentPage,books.PageSize, books.TotalCount, books.TotalPages));
         
        if(books == null) return NotFound();

        return Ok(books);
        
    }
}
