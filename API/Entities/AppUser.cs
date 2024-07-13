using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser
{
    
    public List<Book> Books { get; set; }
}
