namespace API.Entities;

public class Game
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; } = DateTime.Now;
    public int? ResultLotteryId { get; set; }
    public Lottery? ResultLottery { get; set; }
    public List<Lottery> LotteriesPlayed { get; set; } = [];

    public int? UserId { get; set; }
    public AppUser? User { get; set; }
    public int TotalWinning { get; set; }
    public int TotalCost { get; set; }


}
