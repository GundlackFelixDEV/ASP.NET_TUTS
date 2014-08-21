using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LocalBusiness.Models
{
    public class BusinessSchedule
    {
        public BusinessSchedule()
        {
            Open = DateTime.MinValue;
            Close = DateTime.MinValue;
            Break = new BusinessBreak();

        }

        public BusinessSchedule(DateTime timeOpen, DateTime timeClose)
        {
            Open = timeOpen;
            Close = timeClose;
        }


        [DisplayFormat(DataFormatString = "{0:t}",ApplyFormatInEditMode = true)]
        public DateTime Open { get; set; }

        [DisplayFormat(DataFormatString = "{0:t}", ApplyFormatInEditMode = true)]
        public DateTime Close { get; set; }
        
        public BusinessBreak Break { get; set; }

        public DayOfWeek WeekDay
        {
            get
            {
                return Open.DayOfWeek;
            }
        }

        public bool IsOpen
        {
            get
            {
                return DateTime.Compare(Open, DateTime.MinValue) != 0 
                    || DateTime.Compare(Open,Close) > 0;
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