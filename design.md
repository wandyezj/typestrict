# Design

## Goals

- simple uniform language
- designed for simple scripts, not complex programming tasks

## Architecture

- want to be able to attach a specific issue message to a specific node
    - do the messages need anything specific from the node? of can these all be static?
- big rules or small rules?
    - is it better to have lots of individual independent small rules than a whole function set of rules?

## Rules

- support only simple constructs

- while, for, and if statements should required an associated block. This is to prevent common mistakes when writing code and when modifying subsequent code. This also needs to apply to else statements, except these may also have an if statement

- no any

- for in should only be used on objects, for of should be used on strings and arrays.

- no functions declared inside of functions

- names are composed of only lower and upper case letters

- no var

- require initialization of all variables.

- no == or !=
- no operations on invalid types (avoid type coercion)

- access of variables declared outside of function scope

```json
    {
        "pass": false,
        "code": "var x = 'value'"
    }
```

```typescript
let i = 5;

// ArrayBindingPattern
let [a,b] = [1,2];

// ObjectBindingPattern
let {c, d} = {c:1, d:2}

// VariableDeclarationList
// Ban VariableDeclarationLists with more than one value.
let e = 1, f = 2;

```