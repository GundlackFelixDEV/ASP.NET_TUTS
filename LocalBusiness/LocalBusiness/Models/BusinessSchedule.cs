using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LocalBusiness.Models
{
    public class BusinessSchedule
    {
        public BusinessSchedule()
        {
            Open = DateTime.Now;
            Close = DateTime.Now;
            Break = new BusinessBreak();

        }

        public DateTime Open { get; set; }
        public DateTime Close { get; set; }
        public BusinessBreak Break { get; set; }
        public DayOfWeek WeekDay 
        {
            get
            {
                return Open.DayOfWeek;
            }
        }
    }

    public class BusinessBreak
    {
        public BusinessBreak()
        {
            Start = DateTime.Now;
            Stop = DateTime.Now;
        }
        DateTime Start { get; set; }
        DateTime Stop { get; set; }
    }
}