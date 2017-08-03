import './style.css';

const Alert = (function () {
  const settings = {
    alertContainer: '',

    classes: {
      error: 'jV-error',
      alertContainer: 'jV-alertContainer',
    },
  };

  const { classes } = settings;

  function createMsg(text, label = 'info') {
    if (!text || !label) console.error('Message and label cannot be empty!');

    return { text, label };
  }

  function clearErrors(inputs) {
    for (const input of inputs) {
      input.classList.remove(classes.error);
    }
  }  

  function clearAlertsContainer() {
    const alertContainer = settings.alertContainer;

    while (alertContainer.firstChild) {
      alertContainer.removeChild(alertContainer.firstChild);
    }
  }

  function addError(input) {
    if (input.nodeName) {
      input.classList.add(classes.error);
    }
  }

  function createAlertContainer(parent) {
    if (settings.alertContainer) {
      // there is already container, no need to add another.
      return false;
    }

    if (!parent.nodeName) {
      console.error('parent must by a node element');
      return false;
    }

    const container = document.createElement('div');
    container.classList.add(classes.alertContainer);
    parent.append(container);
    setAlertContainer(container);
  }

  function setAlertContainer(newContainer) {
    if (!newContainer.nodeName) {
      console.error('newContainer must be a node element');
      return false;
    }

    settings.alertContainer = newContainer;
  }

  function displayAlerts(alerts) {
    for (const alert of alerts) {
      addAlertToContainer(alert);
    }
  }

  function addAlertToContainer(alert) {
    const parent = settings.alertContainer;
    const alertDOM = createAlert(alert);

    if (parent) {
      parent.append(alertDOM);
    }
  }

  function createAlert(alert) {
    const alertElement = document.createElement('div');
    alertElement.classList.add('jV-alert', `jV-alert__${alert.label}`);
    const alertText = document.createTextNode(alert.text);
    alertElement.append(alertText);
    console.log('--', alertElement);

    return alertElement;
  }

  return {
    createMsg,
    addError,
    clearErrors,
    clearAlertsContainer,
    addAlertToContainer,
    createAlertContainer,
    displayAlerts,
  };
}());

export default Alert;
