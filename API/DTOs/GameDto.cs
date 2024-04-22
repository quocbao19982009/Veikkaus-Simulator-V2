namespace API.DTOs
{
    public class GameDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public DateTime Date { get; set; }
        public LotteryDto? ResultLottery { get; set; }
        public ICollection<LotteryDto> LotteriesPlayed { get; set; } = [];
        public int TotalWinning { get; set; }
        public int TotalCost { get; set; }
        public string UserName { get; set; } = String.Empty;
    }
}