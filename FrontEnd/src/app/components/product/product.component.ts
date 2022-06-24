import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[] = [];
  categoryId:number;
  dataLoaded = false;
  sum:number;
  leftBar:number;
  rightBar:number;
  searchBoxValue:string = "";
  leftClickId:number;
  rightClickId:number;
  leftVote:number;
  rightVote:number;
  voteArea:number = 0;

  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute,private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        if(params["productName"]){
          this.getProductsByProductName(params["productName"]);
        }
        else if(params["categoryId"]){
          this.categoryId=params["categoryId"]
          this.getProductsByCategory(params["categoryId"]);
        }else{
          this.getProducts();
        }
    });
    
  }

  getProducts(){
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByProductName(productName:string){
    this.productService.getProductsByProductName(productName).subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductNameByCategory(categoryId:number,productName:string){
    this.productService.getProductNameByCategory(categoryId,productName).subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getElectionBar(p:Product){
    if(p.dailyUpVotes == 0 && p.dailyDownVotes==0){
      return "grid-template-columns: 50% 50%;";
    }
    this.sum = p.dailyUpVotes+p.dailyDownVotes;

    this.leftBar = p.dailyUpVotes*100/this.sum;
    this.rightBar = p.dailyDownVotes*100/this.sum;

    
    if(this.rightBar<this.leftBar/10){
      return "grid-template-columns: 90% 10%;";
    }
    else if(this.leftBar<this.rightBar/10){
      return "grid-template-columns: 10% 90%;";
    }
    else{
      return "grid-template-columns: "+this.leftBar+"% "+this.rightBar+"%;";
    }
    
  }

  getValueFromSearchBox(){
    if(((document.getElementById("search-box") as HTMLInputElement).value) != ""){
      this.getProductNameByCategory(this.categoryId,((document.getElementById("search-box") as HTMLInputElement).value));
    }
    else{
      this.getProductsByCategory(this.categoryId);
    }
  }

  setLeftClick(id:number,vote:number){
    this.rightClickId = 0;
    this.leftClickId = id;
    this.leftVote = vote+1;
  }

  setRightClick(id:number,vote:number){
    this.leftClickId = 0;
    this.rightClickId = id;
    this.rightVote = vote+1;
  }

  getLeftClickValue(){
    return this.leftVote;
  }
  getRightClickValue(){
    return this.rightVote;
  }

  setVotingBoxNumber(product:Product,vote:string){
    if(vote == "increase"){
      product.dailyUpVotes += 1;
      this.productService.setProductVote(product).subscribe(response=>{
        console.log(response)
        this.toastrService.success(response.message,"Başarılı")
      })
    }
    else if(vote == "decrease"){
      product.dailyDownVotes += 1;
      this.productService.setProductVote(product).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      })
    }
  }

  setVoteArea(area:number){
    this.voteArea = area;
  }

  getVoteArea(){
    return this.voteArea;
  }
}
//((document.getElementById("search-box") as HTMLInputElement).value)
/*
if(params["categoryId"] && params["productName"]){
  this.categoryId=params["categoryId"]
  this.getProductNameByCategory(params["categoryId"],params["productName"]);
}
else
*/