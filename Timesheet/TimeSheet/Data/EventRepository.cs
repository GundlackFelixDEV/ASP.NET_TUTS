using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TimeSheet.Models;

namespace TimeSheet.Data
{
    public class EventRepository
    {

        public static List<TimeSheet.Models.Event> Events { get; set; }

        public EventRepository()
        {
            if(Events == null)
            {
                setupEvents();
            }
        }

        public void setupEvents()
        {
            Events = new List<TimeSheet.Models.Event>();
            Events.Add(new Event("First Event", 0));
            Events.Add(new Event("Second Event", 1));
            Events.Add(new Event("Third Event", 2));
            Events.Add(new Event("Fourth Event", 3));
            Events.Add(new Event("Fifth Event", 4));

            DateTime t = DateTime.Now;
            Events[0].StartTime = t;
            Events[1].StartTime = t.AddHours(1);
            Events[2].StartTime = t.AddMinutes(1);
            Events[3].StartTime = t.AddSeconds(30);
            Events[4].StartTime = t;

            Events[0].StopTime = t.AddSeconds(30);
            Events[1].StopTime = t.AddHours(1).AddMinutes(30);
            Events[2].StopTime = t.AddMinutes(1).AddSeconds(120);
            Events[3].StopTime = t.AddSeconds(30).AddMinutes(1);
            Events[4].StopTime = t.AddHours(2);
        }

        public TimeSheet.Models.Event FindById(int id)
        {
            return Events.FirstOrDefault(e => e.Id == id);
        }

        public void Save(TimeSheet.Models.Event aEvent)
        {
            var eventInDb = FindById(aEvent.Id);

            if(eventInDb != null)
            {
                eventInDb.Description = aEvent.Description;
                eventInDb.StartTime = aEvent.StartTime;
                eventInDb.StopTime = aEvent.StopTime;
            }
            else
            {
                aEvent.Id = Events.Max(h => h.Id) + 1;
                Events.Add(aEvent);
            }
        }

    }
}