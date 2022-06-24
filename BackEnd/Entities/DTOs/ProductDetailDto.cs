using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class ProductDetailDto:IDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string CategoryName { get; set; }
        public short UnitsInStock { get; set; }
        public int DailyUpVotes { get; set; }
        public int DailyDownVotes { get; set; }
        public int WeeklyUpVotes { get; set; }
        public int WeeklyDownVotes { get; set; }
        public int MonthlyUpVotes { get; set; }
        public int MonthlyDownVotes { get; set; }

    }
}
