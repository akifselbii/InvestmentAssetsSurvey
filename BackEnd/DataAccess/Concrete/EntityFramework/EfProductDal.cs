﻿using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    //NuGet 8-1:18:50
    public class EfProductDal : EfEntityRepositoryBase<Product, NorthwindContext>, IProductDal
    {
        public List<ProductDetailDto> GetProductDetails()
        {
            using (NorthwindContext context = new NorthwindContext())
            {
                //Ürünler ile Kategorileri Join et 9-2:46:45
                var result = from p in context.Products
                             join c in context.Categories
                             on p.CategoryId equals c.CategoryId
                             select new ProductDetailDto {ProductId = p.ProductId,ProductName = p.ProductName,
                                 CategoryName = c.CategoryName, UnitsInStock = p.UnitsInStock, DailyUpVotes = p.DailyUpVotes,
                                 DailyDownVotes = p.DailyDownVotes, WeeklyUpVotes = p.WeeklyDownVotes, WeeklyDownVotes = p.WeeklyDownVotes,
                                 MonthlyUpVotes = p.MonthlyUpVotes, MonthlyDownVotes = p.MonthlyDownVotes,

                             };
                return result.ToList();
            }
        }

    }
}