<span class="mcl-back-button">[[Technology/Programming Language/Typescript-Javascript/index|← Typescript-Javascript]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#typescript #fundamental 
<aside> 💡 As we learn typescript we learnt both type and interface but what are the differences between the both of them?

</aside>

Todo:

- Add generic example and explanation to both
- Create a github example for myself for reminder (a project with this kind of usage is fine too)

---

# 📔 Interface overview

---

Scope of the review

Specialty:

- Declaration merging (use case might be appending additional interface to Global namespace or interface)
- Composition

1. What is Interface in typescript?

- Interfaces are **a feature of TypeScript that allows us to define the structure or shape of an object and specify the properties and methods that an object has or should have**. Their primary function is type checking and aiding developers in catching type-related errors during development.

**Example:** Define an **Interface** and using it

```tsx
interface UserInterface {
	name: string;
	age: number;
}

const user: UserInterface = {
	name: 'Minh Lai',
	age: '30',
}
```

# 📔 Type overview

---

Scope of the review

Specialty:

- Unable append to a type

⇒ this help Type define object to be consistence overall.

⇒ Should be the default option to define value structure

- Inheritance
- Type Acrobatic Or just Type with additional condition

1. What is Type in typescript?

- In TypeScript, a type is a convenient way to refer to the different **properties** and **functions** that a **value** has. A value is anything that you can assign to a variable e.g., a number, a string, an array, an object, and a function.

**Example:** Define a **Type** and using it

```tsx
type UserType = {
	name: string;
	age: number;
}

const user: UserInterface = {
	name: 'Minh Lai',
	age: '30',
}
```

---
# ⚙️ The differences

---

1. Defining a **Type** and an **Interface** very different

**Example 1: what can be defined?**

```tsx
// Type - can be use to define anything
type TextOrStringType = string | number;
type ObjectType = {
	name: string;
	age: number;
}

// Interface - can only be used to define an object
interface TextOrStringInterface = string | number; (will not work)
interface ObjectInterface {
	name: string;
	age: number;
}
```

**Example 2: Inheritance? Extension? Appending?**

**Type**

- Type can be extended or given different types with conditions. All of this is fulfilled using operator with Type.

```tsx
// Type can have operator to help with extending types or conditional types
type AndObjectType = { name: string } & { age: number };
type OrObjectType = { name: string } | { age: number }; // This is a union type
```

- For the example below: Type `User` will have a conditional check that is if the user is `‘Male’` it will need to also contain the height property. For `‘Female’` case it will need to contain the weight property. This is `Type Acrobatic` lol.

```tsx
/**
 * {User} type with a union of two different types.
 * This type is given a required name, age along with optional choice to have one of the 2 gender types.
 * If one gender type is chosen, only the corresponding properties are required.
 */ 
type MaleProperties = {
  gender: 'Male';
  height: number;
};

type FemaleProperties = {
  gender: 'Female';
  weight: number;
};

type User = {
  name: string;
  age: number;
} & (MaleProperties | FemaleProperties);

// Can not contain weight property here
const maleUser: User = {
  name: 'Minh Lai',
  age: 30,
  gender: 'Male',
  height: 170,
};

// Can not contain height property here
const femaleUser: User = {
  name: 'Linh',
  age: 30,
  gender: 'Female',
  weight: 50,
};
```

A more real world example of Type Acrobatic

```tsx
type ApiResponse<T> = 
	| { status: 'success'; statusCode: number; data: T; timestamp: Date }
	| { status: 'error'; statusCode: number; message: string; timestamp: Date }

type SuccessData = {
	message: string;
	data: any;
}
	
const okReponse: ApiResponse<SuccessData> = {
	status: 'success',
	statusCode: 200,
	data: {
		message: 'Operation was successful',
		data: { name: 'Minh' },
	},
	timestamp: new Date(),
}

const createdResponse: ApiResponse<SuccessData> = {
	status: 'success',
	statusCode: 201,
	data: {
		message: 'Object created',
		data: { name: 'Minh' },
	},
	timestamp: new Date(),
}

const errorResponse: ApiResponse = {
	status: 'error',
	statusCode: 429,
	message: 'Too many operations',
	timestamp: new Date(),
}
```

- Usage of some special `key words` such as in this case `keyof` will create a type that contain all value of the key of the object as a string type. Example below

```tsx
type ProductType = {
  readonly id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
};

interface ProductInterface {
  readonly id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
}

/**
 * {ProductKeys} is a type that represents the keys of ProductType.
 * ProductKeys = 'id' | 'name' | 'price' | 'description' | 'image' | 'category'
 */
export type ProductKeys = keyof ProductType;

/**
 * {ProductKeys} is a type that represents the keys of ProductInterface.
 * ProductKeys = 'id' | 'name' | 'price' | 'description' | 'image' | 'category'
 */
export type ProductInterfaceKeys = keyof ProductInterface;
```

**Interface (extends - correct)**

- Interface can be extended with identifier/qualified-name with optional type arguments. To simplified, interface can be extends with other interface or type.
- The `UserInterface` will now contain the property of `NameInterface` and when a value is declared with that interface all properties must be presented.

```tsx
// Interface can be extended from other interfaces
interface NameInterface {
	name: string;
}

interface AddressInterface {
	address: string;
}

interface UserInterface extends NameInterface, AddressInterface {
	age: number;
}

const user: UserInterface = {
	name: 'Minh',
	age: 30,
	address: 'Somewhere in VietNam',
}

// Interface can be extended from other types
type NameType = {
	name: string;
}

interface UserInterfaceV2 extends NameType, AddressInterface  {
	age: number;
}

const userV2: UserInterfaceV2 = {
	name: 'Minh',
	age: 30,
	address: 'Somewhere in VietNam',
}
```

**Interface (extends - Incorrect)**

- The first case will result in an **Error** as the `NameInterface` interface has already defined the `name` property as a string, so in the extended `UserInterface` that must also be kept the same.
- The second case will also result in an **Error** as interface can only extend an identifier/qualified-name with optional type arguments. Interface does not allow in-line definition extension

```tsx
// 1st case
interface NameInterface {
	name: string;
}

interface UserInterface extends NameInterface {
	name: number;
	age: number;
}

// 2nd case
interface UserInterfaceV2 extends { name: string } {
	age: number;
}
```

**Interface (append - BAD)**

- While this is not wrong it is not recommended to do so. There are certain cases where you would like to pass along some data with `global object` or `object from library` to make it works with your use case.

⇒ Should not be used unless there is no other option.

```tsx
interface Animal {
	name: string;
}

interface Animal {
	meow(): void;
}

const animal: Animal = {
	meow: () => {},
	name: 'cat',
}

// With this the global Window interface now contain this property - weird eh?
declare global {
	interface Window {
		myGlobal: string;
	}
}
```

---
# 💡 GitHub example

---
[Fetching Data#w7fg](https://github.com/laihuynhnhatminh/common-typescript)

---
# ℹ️ Resources

---

```cardlink
url: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
title: "Documentation - Creating Types from Types"
description: "An overview of the ways in which you can create more types from existing types."
host: www.typescriptlang.org
favicon: https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae
```


```cardlink
url: https://www.youtube.com/watch?v=9i38FPugxB8&ab_channel=Joshtriedcoding
title: "How Did I Not Know This TypeScript Trick Earlier??!"
description: "This TypeScript trick to conditionally include types is so useful, especially for React props. I've asked myself how this is done many times before, and it's..."
host: www.youtube.com
favicon: https://www.youtube.com/s/desktop/b61fbcbd/img/logos/favicon_32x32.png
image: https://i.ytimg.com/vi/9i38FPugxB8/maxresdefault.jpg
```


```cardlink
url: https://www.youtube.com/watch?v=oiFo2z8ILNo&ab_channel=WebDevSimplified
title: "I Cannot Believe TypeScript Recommends You Do This!"
description: "TypeScript Simplified: https://courses.webdevsimplified.com/typescript-simplified/?utm_source=youtube&utm_medium=video-description&utm_term=video-id-oiFo2z8I..."
host: www.youtube.com
favicon: https://www.youtube.com/s/desktop/b61fbcbd/img/logos/favicon_32x32.png
image: https://i.ytimg.com/vi/oiFo2z8ILNo/maxresdefault.jpg
```


```cardlink
url: https://www.youtube.com/watch?v=dLPgQRbVquo&ab_channel=MattPocock
title: "Generics: The most intimidating TypeScript feature"
description: "Generics are a huge reason why TypeScript is SO DARN POWERFUL. Letting you create types from other types, pass types to functions, and even INFER those types..."
host: www.youtube.com
favicon: https://www.youtube.com/s/desktop/b61fbcbd/img/logos/favicon_32x32.png
image: https://i.ytimg.com/vi/dLPgQRbVquo/maxresdefault.jpg
```

