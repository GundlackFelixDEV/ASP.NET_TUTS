using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LocalBusiness.Models
{
    public class BusinessEvent
    {

        public BusinessEvent()
        {
            Titel = "Dummy Event";
            Description = "Dummy Description";
            EventDateStart = DateTime.Now;
            EventDateStop = DateTime.Now;
        }
        public string Titel { get; set; }
        public string Description { get; set; }
        public DateTime EventDateStart { get; set; }
        public DateTime EventDateStop { get; set; }


        public bool IsSingleDayEvent
        {
            get
            {
                return (EventDateStart.Date == EventDateStop.Date);
            }
        }

        public bool IsMultiDayEvent
        {
            get
            {
                return !IsSingleDayEvent;
            }
        }
    }
}