const AlertModule = (function () {
  const classes = {
    error: 'jValid-error',
  };

  function createMsg(text, label = 'info') {
    if (!text || !label) console.error('Message and label cannot be empty!');

    return { text, label };
  }

  function clearErrors(inputs) {
    for (const input of inputs) {
      input.classList.remove(classes.error);
    }
  }  

  function addError(input) {
    if (input.nodeName) {
      input.classList.add(classes.error);
    }
  }

  function createDomAlert() {

  }

  return {
    createMsg,
    addError,
    clearErrors,
    createDomAlert,
  };
}());

export default AlertModule;
