# Design

## Goals

- simple uniform language
- designed for simple scripts, not complex programming tasks

## Rules

- support only simple constructs

- no any

- for in should only be used on objects, for of should be used on strings and arrays.

- while, for, and if statements should required an associated block. This is to prevent common mistakes when writing code and when modifying subsequent code. This also needs to apply to else statements, except these may also have an if statement

- no functions declared inside of functions

- no var

```json
    {
        "pass": false,
        "code": "var x = 'value'"
    }
```