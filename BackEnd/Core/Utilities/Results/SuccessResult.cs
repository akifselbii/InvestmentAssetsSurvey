using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Utilities.Results
{
    public class SuccessResult:Result
    {
        public SuccessResult(string message):base(true,message)//10-1:14:00
        {

        }

        public SuccessResult():base(true)
        {

        }
    }
}
