using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace EventManager.Models
{
   
    public class EventTypeMgr
    {
        private static List<EventType> eventTypes;
        public EventTypeMgr()
        {           
            if (eventTypes == null)
                eventTypes = new List<EventType>();
        }

        public List<EventType> EventTypes
        {
            get
            {
                return eventTypes;
            }
        }

        public void AddEventType(EventType newType)        
        {
            if (ShortTitleExisting(newType))
                throw new DuplicatedShortTitleException(newType);

            int id = (eventTypes.Count > 0) ? eventTypes.Max(f => f.Id) : 0;
            newType.Id = ++id;
            eventTypes.Add(newType);
        }

        public void EditEventType(EventType aType)
        {
            if (ShortTitleExisting(aType))
                throw new DuplicatedShortTitleException(aType);

            EventType item = FindEventType(aType.Id);

            item.TitleShort = aType.TitleShort;
            item.Title = aType.Title;
            item.Description = aType.Description;
        }

        private bool ShortTitleExisting(EventType aType)
        {
            return eventTypes.Exists(f => f.TitleShort == aType.TitleShort);
        }

        public EventType FindEventType(int id)
        {
            EventType type = eventTypes.First(f => f.Id == id);

            if (type == null)
                throw new EventTypeNotFoundException(id);

            return type;
        }     
    }

    public class EventTypeNotFoundException:ArgumentException
    {
        public EventTypeNotFoundException(int id) : base(string.Format("No existing event type with id {0} could be found.", id)) { }
    }
    public class DuplicatedShortTitleException : ArgumentException
    {
        public DuplicatedShortTitleException(EventType type) : base(string.Format("Short titel {0} alread exists.", type.TitleShort)) { }
    }
}