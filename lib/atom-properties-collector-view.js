'use babel';

export default class AtomPropertiesCollectorView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-properties-collector');

    // Create message element
    const input=document.createElement('atom-text-editor');
    input.className='editor mini data-properties-collector-input';
    input.setAttribute('data-grammar','text plain null-grammar');
    input.setAttribute('mini','');
    input.setAttribute('tabindex','-1');
    input.setAttribute('data-properties-collector-input',1);

    this.element.appendChild(input);
    const message = document.createElement('div');
    message.textContent = 'Type name of object you want to collect';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
