import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestCategoryService {

  constructor() { }

  categoryArray: any = [];

  async saveCategory(categoryData: any): Promise<void> {

    //get Data form localStorage 
    let parsedCategoryData = localStorage.getItem('categories');

    // parse the data in category array.
    this.categoryArray = JSON.parse(parsedCategoryData!) || [];

    // Editing the category
    if (categoryData.categoryID) {
      this.categoryArray[categoryData.categoryID - 1] = categoryData;
    }

    //Saving the category
    else {
      // Updating categoryID so we can differentiate the data with ID
      categoryData.categoryID = this.categoryArray.length + 1;
      // Push your new Data in the array you created above to save all the data.
      this.categoryArray.push(categoryData);
    }

    // Console all data till now in a table
    console.table(this.categoryArray);

    // Strigify your data so you can save it in local storage of the browser.
    let stringifyCategoryData = JSON.stringify(this.categoryArray);

    // Now Save Data in Local Storage:
    localStorage.setItem('categories', stringifyCategoryData);
    
    return Promise.resolve(void 0);
  }

  // Creating getCategory method to gett all the data from local Storage and send it to Catagory list Component
  async getAllCategories() {

    //get Data form localStorage 
    let parsedCategoryData = localStorage.getItem('categories');

    // parse the data in category array.
    this.categoryArray = JSON.parse(parsedCategoryData!) || [];

    // Return Category Array
    return this.categoryArray;
  }

  async getCategory(categoryId: number):Promise<any> {

    //get Data form localStorage 
    let parsedCategoryData = localStorage.getItem('categories');

    // parse the data in category array.
    this.categoryArray = JSON.parse(parsedCategoryData!) || [];

    let category = this.categoryArray.find((object: { categoryID: number; }) => {
      return object.categoryID === categoryId;
    })
    // Return Category Array
    return category;
  }

  async deleteCategory(category: any) {
    // parse the data in category array after geting Data form localStorage 
    this.categoryArray = JSON.parse(localStorage.getItem('categories')!)

    // Updating isDeleted in desired data
    this.categoryArray[category.categoryID - 1].isDeleted = category.isDeleted

    // Strigify your data so you can save it in local storage of the browser.
    let stringifyCategoryData = JSON.stringify(this.categoryArray);

    // Now Save Data in Local Storage:
    localStorage.setItem('categories', stringifyCategoryData);
    
    console.table(this.categoryArray);

    // Return the updated Array of Categories
    return this.categoryArray
  }
}
