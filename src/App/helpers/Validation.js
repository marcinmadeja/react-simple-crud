import AlertModule from './AlertModule';

const Validation = (function () {
  const validFunctions = { 
    email,
  };

  const validMessages = {
    wrongEmail: 'Wrong e-mail format',
  };

  function validateForm(form) {
    if (!form || form.tagName !== 'FORM') {
      console.error('You need pass a form tag for validateForm function');
      return [];
    }

    const inputs = form.querySelectorAll('[data-jvalid]');
    AlertModule.clearErrors(inputs);
    for (const input of inputs) {
      const messages = validateByParams(input.value, input.dataset.jvalid);
      if (messages.length) {
        AlertModule.addError(input);
        // allMsg.push(AlertModule.createMsg(msg, 'alert'));
      }
    }
  }

  function validateByParams(value, params = '') {
    const allMsg = [];
    params = params.split(' ');
    for (const param of params) {
      const validFunction = validFunctions[param];
    
      if (!validFunction) {
        console.error(`There is no ${param} function`);
        continue;
      }

      allMsg.push(validFunction(value), 'error');
    }

    return allMsg;
  }

  function email(data) {
    console.log('isEmail(data)', isEmail(data));
    return !isEmail(data) ? validMessages.wrongEmail : ''; 
  }

  function isEmail(data) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(data);
  }  



  return {
    isEmail,
    validateForm,
  };
}());

export default Validation;
