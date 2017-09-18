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
/*
<atom-text-editor tabindex="-1"
  class=""
  mini=""
  data-encoding="utf8"
  data-grammar="text plain null-grammar">
  <div style="position: relative; contain: strict; overflow: hidden; background-color: inherit; height: 27px; width: 100%;"><div class="scroll-view" style="position: absolute; contain: strict; overflow: hidden; top: 0px; bottom: 0px; background-color: inherit; left: 0px; width: 573px;"><div style="contain: strict; overflow: hidden; background-color: inherit; width: 573px; height: 27px; will-change: transform; transform: translate(0px, 0px);"><div class="lines" style="position: absolute; contain: strict; overflow: hidden; width: 573px; height: 27px;"><div style="contain: layout style; position: absolute; height: 27px; width: 573px; transform: translateY(0px);"><div class="highlights"></div><div class="line" data-screen-row="0"><span class="null"><span class="syntax--text syntax--plain syntax--null-grammar"></span></span> </div></div><div class="cursors" style="position: absolute; contain: strict; z-index: 1; width: 573px; height: 27px; pointer-events: none;"><input class="hidden-input" tabindex="-1" style="position: absolute; width: 1px; height: 27px; top: 0px; left: 0px; opacity: 0; padding: 0px; border: 0px;"><div class="cursor" style="height: 27px; width: 8.29688px; transform: translate(0px, 0px);"></div></div></div><div style="contain: strict; position: absolute; visibility: hidden; width: 573px;"></div><div class="line dummy" style="position: absolute; visibility: hidden;"><span>x</span><span>我</span><span>ﾊ</span><span>세</span></div></div></div></div></atom-text-editor>
*/
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
