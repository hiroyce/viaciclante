// viaciclante.com overrides
// dog
// target text to add span/class 
document.querySelectorAll("#tile-customer-review-ieFgX8 .ins-tile__title, #tile-customer-review-PF2zG4 .ins-tile__title").forEach((el) => {
  if (el.innerHTML.includes("starting at")) {
    el.innerHTML = el.innerHTML.replace(/starting at/g, '<span class="adjust-text">starting at</span>');
  }
});	

document.querySelectorAll("#tile-customer-review-BpeHf4 .ins-tile__title").forEach((el) => {
  if (el.innerHTML.includes("each service")) {
    el.innerHTML = el.innerHTML.replace(/each service/g, '<span class="adjust-text">each service</span>');
  }  
});

document.querySelectorAll("#tile-category-products-sRPA5C .ins-tile__title").forEach((el) => {
  if (el.innerHTML.includes("Sale")) {
    el.innerHTML = el.innerHTML.replace(/Sale/g, '<span class="collection">Sale</span>');
  }
});

document.querySelectorAll("#tile-category-collection-QtcTDn .ins-tile__title").forEach((el) => {
  if (el.innerHTML.includes("Winter Riding")) {
    el.innerHTML = el.innerHTML.replace(/Winter Riding/g, '<span class="collection">Winter Riding</span>');
  }
});

// converting plain text to hyperlink mailto
document.querySelectorAll("body *:not(a)").forEach((el) => {
  if (el.childNodes.length > 0) {
    el.childNodes.forEach((node) => {
      if (node.nodeType === 3) { // Ensure it's a text node
        let textContent = node.textContent;
        
        // Check for "sales@viaciclante.com" or "book an appointment"
        if (textContent.match(/sales@viaciclante\.com|book an appointment/gi)) {
          
          let replacedHTML = textContent.replace(
            /sales@viaciclante\.com/gi,
            '<a href="mailto:sales@viaciclante.com" class="insert-link">sales@viaciclante.com</a>'
          ).replace(
            /book an appointment/gi,
            '<a href="mailto:sales@viaciclante.com" class="insert-link">$&</a>'
          );

          let wrapper = document.createElement("span"); // Wrapper for safe replacement
          wrapper.innerHTML = replacedHTML;
          node.replaceWith(...wrapper.childNodes);
        }
      }
    });
  }
});

// Homepage icon links
function wrapElementInLink(selector, href, className) {
  const targetElement = document.querySelector(selector);

  if (targetElement && !targetElement.parentElement.matches(`a.${className}`)) {
    const link = document.createElement("a");
    link.href = href;
    link.classList.add(className);

    // Insert link before the target element and append the element inside
    targetElement.parentNode.insertBefore(link, targetElement);
    link.appendChild(targetElement);
  }
}

const elementsToLink = [
  {
    selector: "#feature-list-VvD9ih-FLT31.ins-tile__item.ins-tile__item--with-icon .ins-tile__feature-icon",
    href: "/bike-fitting",
    className: "icon-link"
  },
  {
    selector: "#feature-list-VvD9ih-FLT32.ins-tile__item.ins-tile__item--with-icon .ins-tile__feature-icon",
    href: "/mechanical-services",
    className: "icon-link"
  },
  {
    selector: "#feature-list-VvD9ih-FLT33.ins-tile__item.ins-tile__item--with-icon .ins-tile__feature-icon",
    href: "/sales",
    className: "icon-link"
  }
];

// Initial wrapping
elementsToLink.forEach(item => wrapElementInLink(item.selector, item.href, item.className));

// MutationObserver to monitor CMS changes
const observer = new MutationObserver(() => {
  elementsToLink.forEach(item => wrapElementInLink(item.selector, item.href, item.className));
});

// Start observing the body for changes in the DOM
observer.observe(document.body, { childList: true, subtree: true });



// Product description overrides
const observer = new MutationObserver((mutations) => {
  const productDescription = document.querySelector("#productDescription");
  
  if (productDescription) {
    const elements = productDescription.querySelectorAll("*");
    elements.forEach((el) => {
      el.removeAttribute("class");
      el.removeAttribute("id");
      el.removeAttribute("style");
    });
    observer.disconnect(); // Stop observing once changes are made
  }
});

observer.observe(document.body, { childList: true, subtree: true });
