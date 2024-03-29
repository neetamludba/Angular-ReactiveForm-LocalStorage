// This is an interface named "TestCategory"
// It specifies the structure of an object that must have the following properties:

// A number property named "categoryID"
// A string property named "categoryName"
// A boolean property named "active"
// A string property named "createdDate"
// A boolean property named "isDeleted"

export interface TestCategory {
    categoryID: number, // This property represents the unique identifier of the category.
    categoryName: string | null, // This property represents the name of the category.
    active: boolean, // This property represents whether the category is currently active or not.
    createdDate: string, // This property represents the date the category was created.
    isDeleted: boolean // This property represents whether the category has been deleted or not.
    }