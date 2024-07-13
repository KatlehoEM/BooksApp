namespace API.DTOs;

public class BookDto
{
    public int Id { get; set;}  
    public DateTime Date{get;set;} = DateTime.UtcNow;
    public string Title{get; set;}  
    public string Author{get; set;}
    public bool isRead{get; set;}   
    public string Description{get; set;}


}
