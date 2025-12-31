const inputField = document.querySelector('#searchName');
const suggestionBox = document.querySelector('#suggestions');
const listTags = suggestionBox.querySelectorAll('li');
const autoCompleteBox = document.querySelector('.autocomplete');
const ulTags = document.querySelector('ul#ul');
let activeIndex = -1;
let maxIndex = listTags.length-1;
const items = Array.from(ulTags.children);

inputField.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        suggestionBox.style.display = 'block';
    } else {
        suggestionBox.style.display = 'none';
    }
});

// listTags.forEach((li)=>{
//   li.addEventListener('click',(e)=>{
//   console.log("message from li is "+ e.target.dataset.key);
//   inputField.value = e.target.dataset.key;
//   suggestionBox.style.display = 'none';
// });
// })

ulTags.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      selectItem(e.target);
    }
});  

inputField.addEventListener('dblclick', () => {
    suggestionBox.style.display = 'block';
})

document.addEventListener('click', (e) => {
    console.log(e.target);
    if (!autoCompleteBox.contains(e.target)) {
        suggestionBox.style.display = 'none';
    }
})

// inputField.addEventListener('keydown', (e) => {
    
//     if (e.key == 'ArrowDown') {
//         suggestionBox.style.display = 'block';
//         currentIndex = (currentIndex === maxIndex)? maxIndex : currentIndex+ 1;
//         const selector = "[index='" + currentIndex + "']";
//         getListTag(currentIndex) && (document.querySelector(selector).style.background = 'Red');
//         getListTag(currentIndex-1) && (document.querySelector("[index='" + (currentIndex - 1) + "']").style.background = '');
//     } else if (e.key == 'ArrowUp') {
//         currentIndex = (currentIndex == 0) ? 0 : currentIndex - 1;
//         const selector = "[index='" + currentIndex + "']";
//         getListTag(currentIndex) && (document.querySelector(selector).style.background = 'Red');
//         getListTag(currentIndex+1) && (document.querySelector("[index='" + (currentIndex + 1) + "']").style.background = '');
//     }
//     console.log(currentIndex);
// })


function getListTag(index){
    const listTag = document.querySelector("[index='" + index + "']");
    return listTag !== null;
}

function selectItem(li) {
    inputField.value = li.dataset.key;
    suggestionBox.style.display = 'none';
    activeIndex = -1;
}
  
inputField.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (!items.length) return;
  
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      suggestionBox.style.display = 'block';
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
    }
  
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
    }
  
    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      selectItem(items[activeIndex]);
    }
    if(e.key === 'Escape' && activeIndex >=0){
        suggestionBox.style.display = 'none';
    }
    console.log(activeIndex);
    renderActiveItem();
});
  
function renderActiveItem() {
    items.forEach((li, index) => {
      li.classList.toggle('active', index === activeIndex);
    });
}
  