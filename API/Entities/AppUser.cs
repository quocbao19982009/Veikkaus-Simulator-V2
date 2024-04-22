using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser<int>
{
    public DateTime Created { get; set; } = DateTime.Now;
    public ICollection<AppUserRole> UserRoles { get; set; } = [];
    public ICollection<Game> Games { get; set; } = [];
    public ICollection<BalanceTransaction> BalanceTransactions { get; set; } = [];
    public decimal Balance { get; set; }
}