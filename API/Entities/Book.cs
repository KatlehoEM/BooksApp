namespace API.Entities;

public class Book
{
    public int Id { get; set;}  
    public DateTime Date{get;set;} = DateTime.UtcNow;
    public string Title{get; set;}  
    public string Author{get; set;}
    public bool isRead{get; set;}   
    public string Description{get; set;}
    public string Username{get; set;}  
    public AppUser User { get; set; }
}
