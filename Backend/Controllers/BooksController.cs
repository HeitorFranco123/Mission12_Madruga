using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class BooksController : ControllerBase
{
    private readonly BookstoreContext _context;

    public BooksController(BookstoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetBooks(
        string category = "All",
        int pageSize = 5,
        int pageNum = 1,
        string sortBy = "title")
    {
        var query = _context.Books.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && category != "All")
        {
            query = query.Where(b => b.Category == category);
        }

        query = sortBy.ToLower() switch
        {
            "title_desc" => query.OrderByDescending(b => b.Title),
            _ => query.OrderBy(b => b.Title)
        };

        var totalNumBooks = query.Count();

        var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        });
    }

    [HttpGet("categories")]
    public IActionResult GetCategories()
    {
        var categories = _context.Books
            .Select(b => b.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToList();

        return Ok(categories);
    }
}
