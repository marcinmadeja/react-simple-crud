import Alert from './Alert';

const Validation = (function () {
  const validFunctions = { 
    email,
    required,
  };

  const validMessages = {
    wrongEmail: 'Wrong e-mail format',
    required: 'field is required',
  };

  function validateForm(form) {
    if (!form || form.tagName !== 'FORM') {
      console.error('You need pass a form tag for validateForm function');
      return [];
    }

    const inputs = form.querySelectorAll('[data-jvalid]');
    let isValid = true;

    Alert.clearErrors(inputs);
    Alert.clearAlertsContainer();

    for (const input of inputs) {
      const alerts = validateByParams(input);

      if (alerts.length) {
        Alert.addError(input);
        Alert.displayAlerts(alerts);
        isValid = false;
      }
    }

    return isValid;
  }

  function validateByParams(input) {
    const allMsg = [];
    let params = input.dataset.jvalid;
    params = params.split(' ');
    for (const param of params) {
      const validFunction = validFunctions[param];
    
      if (!validFunction) {
        continue;
      }

      const msg = validFunction(input);

      if (msg) {
        allMsg.push(Alert.createMsg(msg, 'error'));
      }
    }

    return allMsg;
  }

  function email(input) {
    const value = input.value;
    if (!value.length) return false;

    return !isEmail(value) ? validMessages.wrongEmail : false; 
  }

  function required(input) {
    const value = input.value;
    const name = input.name ? input.name : '';
    return !value.length ? `${name}: ${validMessages.required}` : false;
  }

  function isEmail(value) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(value);
  }  

  function initValidation(initSettings = { alertContainer: '' }) {
    if (!initSettings) {
      return false;
    }

    if (initSettings.alertContainer) {
      Alert.createAlertContainer(initSettings.alertContainer);
    }
  }

  return {
    isEmail,
    validateForm,
    initValidation,
  };
}());

export default Validation;
