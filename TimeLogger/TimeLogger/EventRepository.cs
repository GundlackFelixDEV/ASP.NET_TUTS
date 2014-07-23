using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TimeLogger.Models;

namespace EventLogger.Data
{
    public class EventRepository
    {
        public static EventQueue events;

        public EventRepository()
        {
            if(events == null)
            {
                DateTime t = DateTime.Now;
                events = new EventQueue();
                events.addStartEvent();
                events.Last().TimePoint = t;
                events.Last().Description = "Start first Event";

                events.addStopEvent();
                events.Last().TimePoint = t.AddHours(1); ;
                events.Last().Description = "Stop first Event";


                events.addStartEvent();
                events.Last().TimePoint = t.AddHours(1).AddMinutes(1);
                events.Last().Description = "Start second Event";

                events.addStartEvent();
                events.Last().TimePoint = t.AddHours(1).AddMinutes(6);
                events.Last().Description = "Start third Event";

                events.addBreakEvent();
                events.Last().TimePoint = t.AddHours(1).AddMinutes(7);
                events.Last().Description = "Add 10min break";

                events.addStopEvent();
                events.Last().TimePoint = t.AddHours(2).AddMinutes(7);
                events.Last().Description = "Stop Third Event";

                events.addStopEvent();
                events.Last().TimePoint = t.AddHours(2).AddMinutes(7); ;
                events.Last().Description = "Stop Second Event";

                events.addStartEvent();
                events.Last().TimePoint = t.AddHours(3).AddMinutes(7); ;
                events.Last().Description = "Stop Fourth Event";
            }
        }
    }
}