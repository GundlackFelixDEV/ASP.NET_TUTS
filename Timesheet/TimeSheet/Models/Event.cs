using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;

namespace TimeSheet.Models
{
    public class Event
    {
        public Event():this(""){ }

        public Event(string aDescription,int aId = -1)
        {
            StartTime = StopTime = DateTime.Now;
            Description = aDescription;
            Id = aId;
        }

        public DateTime StartTime{ get; set; }

        public DateTime StopTime { get; set; }

        public TimeSpan Duration
        {
            get
            {
                return StopTime - StartTime;
            }
        }

        public void stopEvent()
        {
            StopTime = DateTime.Now;
        }

        public String Description { get; set; }

        public int Id { get; set; }
    }
}