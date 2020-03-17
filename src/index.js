class UserEmulator {
  constructor(...selector) {
    this.formInputs = this.getObjectModelArray(selector);
    this.promise = this.createPromise();
  }

  // return array of DOM elements for processing
  getObjectModelArray(selector) {
    let objectModelArray = [];

    function findElementInDOM(selector, toObserve) {
      const obsBlock = document.querySelector(toObserve);

      console.log("observeble block:", obsBlock);

      function elementSearch(block, el) {
        const getLength = el => el.childNodes.length,
          result = [];

        function findDeeppest(currElement, currBlock) {
          const children = currBlock.childNodes;

          if (getLength(currBlock)) {
            for (let i = 0; i < getLength(currBlock); i++) {
              if (
                children[i].localName &&
                children[i].localName === currElement
              ) {
                result.push(children[i]);
                if (getLength(children[i])) {
                  findDeeppest(currElement, children[i]);
                }
              } else if (getLength(children[i])) {
                findDeeppest(currElement, children[i]);
              }
            }
          }
        }
        findDeeppest(selector, obsBlock);

        return result;
      }

      return elementSearch(obsBlock, selector);
    }

    try {
      if (selector && selector.length > 1) {
        selector.forEach(element =>
          objectModelArray.push(document.querySelector(element))
        );
      }

      if (selector && document.querySelector(selector).tagName === "FORM") {
        objectModelArray = findElementInDOM("input", selector);
      } else {
        console.error("Unknown selector");
      }
      return objectModelArray;
    } catch (e) {
      throw Error(e);
    }
  }

  fillOutField(field) {
    const fillType = {
      text: {
        type: "text",
        content: "some text"
      },
      number: {
        type: "number",
        content: "999999"
      },
      tel: {
        type: "tel",
        content: "999999"
      },
      email: {
        type: "email",
        content: "test123@email.com"
      }
    };

    for (var fieldSheet in fillType) {
      if (field.type === fillType[fieldSheet].type) {
        field.value = fillType[fieldSheet].content;
      }
    }
  }

  fillOutFields() {
    const fillType = {
      text: {
        type: "text",
        content: "some text"
      },
      number: {
        type: "number",
        content: "999999"
      },
      tel: {
        type: "tel",
        content: "999999"
      },
      email: {
        type: "email",
        content: "test123@email.com"
      }
    };

    this.formInputs.forEach(field => {
      for (var fieldSheet in fillType) {
        if (field.type === fillType[fieldSheet].type) {
          field.value = fillType[fieldSheet].content;
        }
      }
    });
  }

  createPromise() {

    const inputs = this.formInputs;
    const fillOutField = this.fillOutField;
    
    // P R O M I S E ! ! !
    Promise.resolve()
      .then(function() {
        // return(this.formInputs);
        return 4;
      })
      .then(function recursiveFunction(n) {
        console.log("Entering recursive function for [", + inputs.length + "].");

        if (n === 0) {
          return 0;
        }

        var promise = Promise.resolve().then(function() {
          
          fillOutField(inputs[n]);

          setTimeout(() => recursiveFunction(n - 1), 3000);
        }); 
        return promise;
      })
      .then(function() {
        console.groupEnd();
      });
  }

  resolve(f) {
    f();
  }

  reject(e) {
    console.log(e);
  }
}

const test = new UserEmulator("form");
//  or this one option below
// const test = new UserEmulator('.man', '.woman')

console.log(test);
// test.fillOutFields();
test.createPromise();
