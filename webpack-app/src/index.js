import image from './car-rental.jpg';
import { greeting } from "./greeting.js";

console.log(greeting);

const imageView = document.createElement('img');
imageView.src = image;

document.body.appendChild(imageView);