# Answers to Questions

### 1\. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

* **getElementById:** getElementById returns one Element by its ID but returns null if the ID is not found. This ID is unique means we don't have same ID in any other elements of a HTML file. Its good to use when selecting a unique element. 

* **getElementsByClassName:** getElementsByClassName returns all elements using a specific class name. For example if we use a class name in 10 cards it will return all the 10 cards. It is useful when performance is matters.

* **querySelector:** Same as getElementById it returns one element (first match) by a specific class name. When we want the first matching element with a specific class name.

* **querySelectorAll:** It returns all the matching element by a specific class name. It returns elements as a NodeList. When we need to select multiple elements by a class name.

### 2\. How do you create and insert a new element into the DOM?
By document.createElement, we create a new element into the DOM and by append or appendChild we insert that new element into the DOM. 

### 3\. What is Event Bubbling? And how does it work?
_Event Bubbling_ means when an event happens on an element, it first runs on that element and then “bubbles up” through its parent elements — all the way to _document_.

### 4\. What is Event Delegation in JavaScript? Why is it useful?
Event delegation is a technique where a single event listener on a parent handles events for its child elements via event bubbling.

### 5\. What is the difference between preventDefault() and stopPropagation() methods?
_preventDefault()_ stops the browser’s default action, while _stopPropagation()_ stops the event from bubbling up to parent elements.





### 

