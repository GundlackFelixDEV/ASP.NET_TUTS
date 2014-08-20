using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LocalBusiness.Models
{
    public class BusinessContact
    {

        public BusinessContact()
        {
            City = "Dummy City";
            StreetNumber = "000 Dummy";
            Street = "Dummy Street";
            Postalcode = "Dummy Code";
            AditionalInfo = "";
            Email = "Dummy@Dummy.de";
            Telephone = "000/Dummy";
        }
        public string City { get; set; }
        public string StreetNumber { get; set; }
        public string Street { get; set; }
        public string Postalcode { get; set; }
        public string AditionalInfo { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
    }
}