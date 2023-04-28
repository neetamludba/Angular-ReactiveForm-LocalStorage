import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryDetailsComponent } from './category-details.component';
import { TestCategoryService } from '../test-category.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;
  let testCategoryService: jasmine.SpyObj<TestCategoryService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    testCategoryService = jasmine.createSpyObj('TestCategoryService', ['getCategory', 'saveCategory']);

    await TestBed.configureTestingModule({
      declarations: [CategoryDetailsComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, MatCardModule, MatFormFieldModule, HttpClientModule],
      providers: [
        Location,
        { provide: TestCategoryService, useValue: testCategoryService },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') {
                    return '1';
                  }
                  return null; // changed to return null instead of undefined
                }
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router); 
    activatedRoute = TestBed.inject(ActivatedRoute);
    testCategoryService = TestBed.get(TestCategoryService); 
    location = TestBed.inject(Location);
    component.ngAfterViewInit(); // added ngOnInit call to set component properties
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set categoryId when route param is valid', () => {
    expect(component.categoryId).toBe(1);
  });

  it('should not set categoryId when route param is not valid', () => {
    activatedRoute.snapshot.paramMap.get = () => 'invalid';
    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    component.ngAfterViewInit(); // added ngOnInit call to set component properties
    fixture.detectChanges();


    expect(component.categoryId).toBe(0);
  });

  it('should set categoryDetailsForm with retrieved category details', async () => {
    const expectedCategory = { categoryName: 'test', active: true };
    testCategoryService.getCategory.and.returnValue(Promise.resolve(expectedCategory));

    await component.getCategory(1);

    expect(component.categoryDetailsForm.get('categoryName')?.value).toBe(expectedCategory.categoryName);
    expect(component.categoryDetailsForm.get('active')?.value).toBe(expectedCategory.active);
  });

  it('should save form data when saveForm method is called', async () => {
    const formValues = { categoryName: 'test', active: true };
    component.categoryDetailsForm.setValue(formValues);
    testCategoryService.saveCategory.and.returnValue(Promise.resolve());
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

    await component.saveForm();

    expect(testCategoryService.saveCategory).toHaveBeenCalledWith({
      id: component.categoryId,
      categoryName: formValues.categoryName,
      active: formValues.active,
      createdDate: component.categoryDate,
      isDeleted: false
    });
    expect(navigateByUrlSpy).toHaveBeenCalledWith('testCategory');
  });

  it('should reset categoryDetailsForm when resetForm method is called', () => {
    const resetSpy = spyOn(component.categoryDetailsForm, 'reset');

    component.resetForm();

    expect(resetSpy).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Reset Button Works ');
    expect(console.log).toHaveBeenCalledWith('Form reset Successfully');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set categoryId when route parameter is valid', () => {
    expect(component.categoryId).toBe(1);
  });

  it('should not set categoryId when route parameter is invalid', () => {
    // Arrange
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue(null);

    // Act
    component.ngAfterViewInit();

    // Assert
    expect(component.categoryId).toBe(0);
  });

  it('should get category details when categoryId is valid', () => {
    // Arrange
    const category = { id: 1, categoryName: 'Test Category', active: true };
    spyOn(testCategoryService, 'getCategory').and.returnValue(Promise.resolve(category));

    // Act
    component.getCategory(1);

    // Assert
    expect(component.categoryDetailsForm.value).toEqual({ categoryName: 'Test Category', active: true });
  });

  it('should not get category details when categoryId is invalid', () => {
    // Arrange
    spyOn(testCategoryService, 'getCategory').and.returnValue(Promise.resolve(null));

    // Act
    component.getCategory(0);

    // Assert
    expect(component.categoryDetailsForm.value).toEqual({ categoryName: null, active: true });
  });

  it('should save form data when saveForm method is called', fakeAsync(() => {
    // Arrange
    spyOn(testCategoryService, 'saveCategory').and.returnValue(Promise.resolve());
    const navigateSpy = spyOn(router, 'navigateByUrl');

    // Act
    component.saveForm();
    tick();

    // Assert
    expect(testCategoryService.saveCategory).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith('testCategory');
  }));

  it('should reset form data when resetForm method is called', () => {
    // Arrange
    component.categoryDetailsForm.setValue({ categoryName: 'Test Category', active: true });

    // Act
    component.resetForm();

    // Assert
    expect(component.categoryDetailsForm.value).toEqual({ categoryName: null, active: true });
  });

  it('should navigate to testCategory page when cancelForm method is called', () => {
    // Arrange
    const navigateSpy = spyOn(router, 'navigateByUrl');

    // Act
    component.cancelForm();

    // Assert
    expect(navigateSpy).toHaveBeenCalledWith('testCategory');
  });



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getCategory', () => {
    it('should call testCategoryService.getCategory with categoryId', () => {
      spyOn(testCategoryService, 'getCategory').and.returnValue(Promise.resolve({}));

      component.getCategory(1);

      expect(testCategoryService.getCategory).toHaveBeenCalledWith(1);
    });

    it('should update categoryDetailsForm with category details', fakeAsync(() => {
      const category = { categoryName: 'Category 1', active: true };
      spyOn(testCategoryService, 'getCategory').and.returnValue(Promise.resolve(category));

      component.getCategory(1);
      tick();

      expect(component.categoryDetailsForm.value).toEqual(category);
    }));
  });

  describe('saveForm', () => {
    beforeEach(() => {
      spyOn(router, 'navigateByUrl');
    });

    it('should call testCategoryService.saveCategory with form data', fakeAsync(() => {
      spyOn(testCategoryService, 'saveCategory').and.returnValue(Promise.resolve());

      component.categoryDetailsForm.setValue({ categoryName: 'Category 1', active: true });
      component.saveForm();
      tick();

      expect(testCategoryService.saveCategory).toHaveBeenCalledWith({
        id: 0,
        categoryName: 'Category 1',
        active: true,
        createdDate: jasmine.any(String),
        isDeleted: false
      });
    }));

  });

});