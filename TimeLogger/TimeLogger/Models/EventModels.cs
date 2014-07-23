using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TimeLogger.Models
{
    public class EventQueue
    {
        private List<Event> myEvents;
        private int isValid;

        public EventQueue()
        {
            myEvents = new List<Event>();
            isValid = 0;
        }
        public void addStartEvent()
        {
            if (IsBreakValid)
            {
                isValid++;
                myEvents.Add(new Event(CreateNewEventId,Event.eType.Start));
            }
            else
            {
                throw new ApplicationException("Unable to add Start event. Break Event needs to be Terminated first!");
            }
        }
        public void addStopEvent()
        {
            if(!IsBreakValid)
            {
                throw new ApplicationException("Unable to add Stop event. Break Event needs to be Terminated first!");
            }
            if (isValid == 0)
            {
                throw new ApplicationException("Unable to add Stop event. No corresponding start event to be stopped");
            }
            isValid--;
            myEvents.Add(new Event(CreateNewEventId, Event.eType.Stop));         
        }

        public void addBreakEvent()
        {
            if(isValid > 0)
            {
                myEvents.Add(new Event(CreateNewEventId, Event.eType.Break));
            }
            else
            {
                throw new ApplicationException("Unable to add Break event. Break events need to be within a Start and Stop event!");
            }
        }

        public int CreateNewEventId
        {
            get
            {
                return (myEvents.Count == 0) ? 1 : myEvents.Max(ev => ev.Id) + 1;
            }
        }
        public Event findById(int id)
        {
            return myEvents.FirstOrDefault(e => e.Id == id);
        }

        public void removeEvent(Event aEvent)
        {
            if (myEvents.Remove(aEvent))
            {
                if(aEvent.EventType == Event.eType.Start)
                {
                    isValid--;
                }
                else if(aEvent.EventType == Event.eType.Stop)
                {
                    isValid++;
                }
            }
        }
        public List<Event> getEvents()
        {
            return myEvents;
        }

        public Event Last()
        {
            return myEvents.Last();
        }

        public int IsValid
        {
            get
            {
                return isValid;
            }
        }

        public bool IsBreakValid
        {
            get
            {
                int breakIndex = myEvents.FindLastIndex(ev => ev.EventType == Event.eType.Break);
                if (breakIndex > 1)
                {
                    return (myEvents[breakIndex].EventType == myEvents[breakIndex-1].EventType);
                }
                else
                {
                    return true;
                }
            }
        }
        public string ValidationMessage
        {
            get
            {
                string validationText = "OK";
                if (isValid < 0)
                {
                    validationText = "Invalid Configuration! Missing Start-Events!";
                }
                else if (isValid > 0)
                {
                    validationText = "Invalid Configuration! Missing Stop-Events!";
                }

                return validationText;
            }
        }
    }


    public class EventMetaData
    {
        
        [Required, Display(Name = "Zeitpunkt"), DisplayFormat(DataFormatString = "{0:O}")]
        public object TimePoint;

        [Display(Name = "Datum"), DisplayFormat(DataFormatString = "{0:D}")]
        public object Date;

        [Display(Name = "Zeit"), DisplayFormat(DataFormatString = "{0:T}")]
        public object Time;

        [Required, Display(Name = "Event Typ")]
        public object EventType;

        [Required, Display(Name = "ID")]
        public object Id;

        [Display(Name = "Notiz")]
        [StringLength(32, ErrorMessage = "{0} darf aus max. {1} Zeichen bestehen.")]
        public object Description;
    }

    [MetadataType(typeof(EventMetaData))]
    public partial class Event
    {
        public Event() : this(-1, eType.Start) { }
        public Event(int id, eType aType, String aDescription = "")
        {
            TimePoint = DateTime.Now;
            EventType = aType;
            Description = aDescription;
            Id = id;
        }

        public enum eType{ Start, Stop, Break }
        public eType EventType { get; set; }
        public int Id { get; set; }
        public String Description { get; set; }       
        private DateTime timePoint;

        public DateTime TimePoint
        {
            get
            {
                return this.timePoint;
            }
            set
            {
                this.timePoint = value;
            }
        }
        
        public DateTime Date
        {
            get
            {
                return this.timePoint;
            }
        }
        
        public DateTime Time
        {
            get
            {
                return this.timePoint;
            }
        }
    }
}