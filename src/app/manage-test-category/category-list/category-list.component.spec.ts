// Importing the necessary modules and services for testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TestCategoryService } from '../test-category.service';
import { CategoryListComponent } from './category-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatFormField } from '@angular/material/form-field';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let router: Router;
  let testCategoryService: TestCategoryService;

  beforeEach(async () => {
    // Creating a testing module that mimics the app module
    await TestBed.configureTestingModule({
      declarations: [ CategoryListComponent ],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: TestCategoryService, useValue: jasmine.createSpyObj('TestCategoryService', ['getCategories']) }
      ],
      imports:[{MatFormField}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Creating an instance of the component and its dependencies
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    testCategoryService = TestBed.inject(TestCategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    // Testing that the component is created
    expect(component).toBeTruthy();
  });

  it('should have a table data source', () => {
    // Testing that the component has a MatTableDataSource property
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
  });

  it('should have a sort property', () => {
    // Testing that the component has a MatSort property
    expect(component.sort).toBeInstanceOf(MatSort);
  });

  it('should have displayed columns', () => {
    // Testing that the component has an array of displayed columns
    expect(component.displayedColumns).toEqual(['id', 'name', 'description']);
  });

  it('should get categories from service on init', () => {
    // Testing that the component calls the getCategories method of the service on initialization
    expect(testCategoryService.getAllCategories).toHaveBeenCalled();
  });

 
});