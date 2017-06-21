## 前言
今天我们要聊的是一个比较生僻的概念-反射，在JS中至少我之前没听过，直到在后来的一个项目中看到TL写的代码才知道还有这么一个概念。可能Pyhton的童鞋会反驳，因为这个概念在他们的语言中是经常被使用的，无奈偶是C语言的。。。。

在国内的技术文章中你去搜索"JS 反射"得到的大部分的内容都是在说“利用JS的for(…in…)语句实现反射机制”，但其实反射机制在如今的ES6中可以得到更大的延伸以及运用的，这个在后续会讲解。不过这些文章都用一句比较通俗的话来说什么叫**反射机制**:

    反射机制指的是程序在运行时能够获取自身的信息

明白这句话对后面的应用会受益很多。

## 1 JS的反射对象
反射机制我们在前言中提过了，那么在ES6中JS提供了一个叫做Reflect的对象。

在[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)上的反射对象是这样定义的：

    Reflect是一个内建的对象，用来提供方法去拦截JavaScript的操作。Reflect不是一个函数对象，所以它是不可构造的，也就是说它不是一个构造器，你不能通过`new`操作符去新建或者将其作为一个函数去调用Reflect对象。Reflect的所有属性和方法都是静态的。

可是MDN并没有说明为什么需要这么一个对象？

### 1.1 为什么需要Reflect对象
因为我们刚才说过了，利用JS的for..in可以实现，还有比如`Array.isArray`/`Object.getOwnPropertyDescriptor`，或者甚至`Object.keys`都是可以归类到反射这一类中。那么ECMA为什么还要这个呢？

当然是为了让JS更加强大了，相当于说提供Reflect对象将这些能够实现反射机制的方法都归结于一个地方并且做了简化，保持JS的简单。于是我们再也不需要调用`Object`对象，然后写上很多的代码。

比如：
```
var myObject = Object.create(null) // 此时myObject并没有继承Object这个原型的任何方法,因此有：

myObject.hasOwnProperty === undefined // 此时myObject是没有hasOwnProperty这个方法，那么我们要如何使用呢？如下：

Object.prototype.hasOwnProperty.call(myObject, 'foo') // 是不是很恐怖，写这么一大串的代码！！！！

```
而如果使用Reflect对象呢？

```
var myObject = Object.create(null)
Reflect.ownKeys(myObject)
```
再比如当你对象里有Symbol的时候，如何遍历对象的keys？

```
var s = Symbol('foo');
var k = 'bar';
var o = { [s]: 1, [k]: 1 };
// getOwnPropertyNames获取到String类型的key，getOwnPropertySymbols获取到Symbol类型的key
var keys = Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o));
```
而使用Reflect的话：

```
var s = Symbol('foo');
var k = 'bar';
var o = { [s]: 1, [k]: 1 };
Reflect.ownKeys(o)
```

相比较之下，Reflect对象的作用凸显出来了吧？

另外Reflect还提供了一些Object对象没有的方法，比如`Reflect.apply`。

### 1.2 Reflect方法
除了上面提到的`ownKeys`的方法(**并不会去获取那些继承的key**)之外，该对象还提供了以下方法：

#### 1.2.1 Reflect.apply(target, thisArgument [, argumentsList])
该方法类同于[Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply),二者的对比如下：

```
var ages = [11, 33, 12, 54, 18, 96];

// Function.prototype style:
var youngest = Math.min.apply(Math, ages);
var oldest = Math.max.apply(Math, ages);
var type = Object.prototype.toString.call(youngest);

// Reflect style:
var youngest = Reflect.apply(Math.min, Math, ages);
var oldest = Reflect.apply(Math.max, Math, ages);
var type = Reflect.apply(Object.prototype.toString, youngest);
```
上面的`Math.min.apply`可以参考这篇文章：[call&apply&bind的学习](http://blog.5udou.cn/blog/callapplybindDe-Xue-Xi-61)

Reflect提供这个方法的最大好处可以避免别人也写了一个同名的`apply`函数的时候，我们不会需要去写一大长串的代码，比如：

`Function.prototype.apply.call(context, ...args)/Function.apply.call(context, ...args)`

而是依然是简单的：

`Reflect.apply()`

#### 1.2.2 Reflect.construct(target, argumentsList [, constructorToCreateThis])
这个方法等价于调用[new target(...args)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)。

二者的对比实现如下：

```
class Greeting {
    constructor(name) {
        this.name = name;
    }
    greet() {
      return `Hello ${name}`;
    }

}

// ES5 style factory:
function greetingFactory(name) {
    var instance = Object.create(Greeting.prototype);
    Greeting.call(instance, name);
    return instance;
}

// ES6 style factory
function greetingFactory(name) {
    return Reflect.construct(Greeting, [name], Greeting);
}

// Or, omit the third argument, and it will default to the first argument.
function greetingFactory(name) {
  return Reflect.construct(Greeting, [name]);
}

// Super slick ES6 one liner factory function!
const greetingFactory = (name) => Reflect.construct(Greeting, [name]);
```
#### 1.2.3 Reflect.defineProperty ( target, propertyKey, attributes )
类同于[Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)，不同的是该方法返回的是布尔值，而不需要你像以前那样去捕捉异常(因为Object.defineProperty是在执行出错的时候直接抛错的)

#### 1.2.4 Reflect.getOwnPropertyDescriptor ( target, propertyKey )

#### 1.2.5 Reflect.deleteProperty ( target, propertyKey )
等同于调用[delete target[name]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)

#### 1.2.6 Reflect.getPrototypeOf ( target )
等同于[Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf),唯一不同的是当传参`target`不是一个对象的时候：前者会强制讲target转为一个对象。

```
// Number {constructor: function, toExponential: function, toFixed: function, toPrecision: function,
// toString: function…}
Object.getPrototypeOf(1);

// Uncaught TypeError: Reflect.getPrototypeOf called on non-object
// at Object.getPrototypeOf (<anonymous>)
//  at <anonymous>:1:9
Reflect.getPrototypeOf(1); // TypeError
```
#### 1.2.7 Reflect.setPrototypeOf ( target, proto )
等同于[Object.setPrototypeOf](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf),差别的地方和刚才的`getPrototypeOf`是一样的。如果传参没有错，那么Reflect是直接返回布尔值来标识是否成功，而后者则直接抛错来表明失败。


#### 1.2.8 Reflect.isExtensible (target)
等同于[Object.isExtensible()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible),区别也是在于返回值。

#### 1.2.9 Reflect.preventExtensions ( target )
类同于[Object.preventExtensions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)。区别也是在于返回值。
#### 1.2.10 Reflect.get ( target, propertyKey [ , receiver ])
该方法用来获取对象中某个属性的方法。这是一个全新的方法，不过该方法也是很简单的，如下：
```
const testObject = {
  a: 'you',
  b: 'like'
}
Reflect.get(testObject, 'a') === 'you' // true
Reflect.get(testObject, 'b') === 'like' // true
```
#### 1.2.11 Reflect.set ( target, propertyKey, V [ , receiver ] )
类同于上面的`get`方法。比如：
```
const testObject = {
  a: 'you',
  b: 'like'
}
Reflect.set(testObject, 'c', 'javascript') // true
Reflect.get(testObject, 'c') === 'javascript' // true
```
#### 1.2.12 Reflect.has ( target, propertyKey )
该方法类似于[in操作符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)，返回布尔值来表明该属性是否存在该对象上或者其原型链上。比如：

```
let testObject = {
  foo: 1,
};
Object.setPrototypeOf(testObject, {
  get bar() {
    return 2;
  },
  baz: 3,
});

Reflect.has(myObject, 'foo') === true
Reflect.has(myObject, 'baz') === true
```
#### 1.2.13 Reflect.ownKeys ( target )
该方法在之前说过了，它返回了目标对象已有的所有属性(不包括原型链)的一个数组。

## 2 JS反射机制在Nodejs中的运用
假设有这么一个场景：

## 参考
*感谢Keith Cirkel提供了很多有用的代码，上面的很多demo都是参考借鉴于文章4*
1. [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
2. [Ecma-262](http://www.ecma-international.org/ecma-262/6.0/#sec-reflection)
3. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
4. [Metaprogramming in ES6: Part 2 - Reflect](https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-2-reflect/)
5. [ES6 Reflection in Depth](https://ponyfoo.com/articles/es6-reflection-in-depth)