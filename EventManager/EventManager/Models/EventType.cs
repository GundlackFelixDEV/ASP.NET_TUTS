using System.ComponentModel.DataAnnotations;
using System.Drawing;

namespace EventManager.Models
{
    [MetadataType(typeof(EventTypeMethaData))]
    public class EventType
    {
        public int Id { get; set; }
        public string TitleShort { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } 
    }

    [MetadataType(typeof(FormatedEventTypeMethaData))]
    public class FormatedEventType: EventType
    {
        public Color BackgroundColor { get; set; }
        public Color FontColor { get; set; }
        public Font Font { get; set; }
    }

    public class EventTypeMethaData
    {
        [Required, Display(Name = "Event Id")]
        public object Id;

        [Required,Display(Name = "Title Short"),
        MaxLength(5,ErrorMessage = "{0} darf aus max. {1} Zeichen bestehen.")]
        public object TitleShort;

        [Display(Name = "Titel"),
        MaxLength(24,ErrorMessage = "{0} darf aus max. {1} Zeichen bestehen.")]
        public object Title;

        [Display(Name = "Description"),
        MaxLength(64,ErrorMessage = "{0} darf aus max. {1} Zeichen bestehen.")]
        public object Description;      
    }

     public class FormatedEventTypeMethaData:EventTypeMethaData
    {
        [Required, Display(Name = "Background color")]
        public object BackgroundColor;

        [Display(Name = "Font color")]
        public object FontColor;

        [Display(Name = "Font")]
        public object Font;


    }
}