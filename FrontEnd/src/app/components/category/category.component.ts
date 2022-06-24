import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories : Category[]=[];
  currentCategory :Category;

  constructor(private categoryService:CategoryService, private language: LanguageService) {}

  ngOnInit(): void {
    this.getCategories();
    
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data;
    });
  }

  setCurrentCategory(category:Category){
    this.currentCategory = category;
  }

  getCurrentCategoryClass(category:Category){
    if(category == this.currentCategory){
      return "nav-link active"
    }
    else{
      return "nav-link"
    }
  }

  public changeLanguage(lang: string) {
    console.log("as")
  }

}
