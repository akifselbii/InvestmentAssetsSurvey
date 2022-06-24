using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Utilities.Results
{
    public class ErrorResult:Result
    {
        public ErrorResult(string message) : base(false, message)//10-1:14:00
        {

        }

        public ErrorResult() : base(false)
        {

        }
    }
}
