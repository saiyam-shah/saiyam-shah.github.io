// Constructor

const TypeWriter = function(textElement, words, wait = 3000){
  this.textElement = textElement;
  this.words = words;
  this.text = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.isDeleting = false;
  this.type();
}

// Type Method

TypeWriter.prototype.type = function(){
  // Index of Current Word
  const current = this.wordIndex % this.words.length;

  // Get Current Word
  const fulltext = this.words[current];

  // Check If Deleting
  if(this.isDeleting){
    // Remove Character
    this.text = fulltext.substring(0, this.text.length - 1);
  }else{
    // Add Character
    this.text = fulltext.substring(0, this.text.length + 1);
  }

  // Insert into Element
  this.textElement.innerHTML = '<span class="text-cursor">' + this.text + '</span>';

  // Type Speed
  let typeSpeed = 200;

  if(this.isDeleting){
    typeSpeed /= 2;
  }

  // If Word is Complete
  if(!this.isDeleting && this.text == fulltext){
    // Make a pause at end
    typeSpeed = this.wait;
    this.isDeleting = true;
  }else if(this.isDeleting && this.text == ''){
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Make a pause at beginning
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
}

// Init on DOM Load

document.addEventListener('DOMContentLoaded', init);

function init(){
  const textElement = document.querySelector('.text-type');
  const words = JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');
  new TypeWriter(textElement, words, wait);
}
