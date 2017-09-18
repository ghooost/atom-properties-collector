'use babel';

import AtomPropertiesCollectorView from './atom-properties-collector-view';
import { CompositeDisposable, TextEditor } from 'atom';

export default {

  atomPropertiesCollectorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomPropertiesCollectorView = new AtomPropertiesCollectorView(state.atomPropertiesCollectorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomPropertiesCollectorView.getElement(),
      visible: false
    });

    this.miniEditor = new TextEditor({ mini: true })
    this.miniEditor.element.addEventListener('blur', this.cancel.bind(this))

    this.message = document.createElement('div')
    this.message.classList.add('message')

    this.message.insertAdjacentHTML("beforeend",
      "Enter name of an Object to collect properties. "
      +"Example: \"_actions\" to seek for \"_actions.THIS\" and \"_actions.THAT\" to form "
      +"var _actions={ "
      +"THIS: \"filename:this\", "
      +"THAT: \"filename:that\" "
      +"};"
    );



    this.atomPropertiesCollectorView.getElement().appendChild(this.miniEditor.element)
    this.atomPropertiesCollectorView.getElement().appendChild(this.message)


    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-properties-collector:toggle': () => this.toggle(),
      'core:confirm': () => this.apply(),
      'core:cancel': () => this.cancel(),
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomPropertiesCollectorView.destroy();
  },

  serialize() {
    return {
      atomPropertiesCollectorViewState: this.atomPropertiesCollectorView.serialize()
    };
  },

  cancel() {
    this.miniEditor.setText('');
    this.modalPanel.hide();
    this.restoreFocus();
  },

  escapeRegExp(str) {
    str=str.replace(/\.$/,'');
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  },

  apply() {
    var editor = atom.workspace.getActiveTextEditor();
    if(editor){
      var txt=editor.getText();
      //var name=this.modalPanel.element.querySelector('.syntax--text').innerHTML;
      var name=this.miniEditor.getText();
      var myArray;
      var myKeys={};
      var myRe=RegExp('[^\\w_]'+this.escapeRegExp(name)+'\\.(\\w+)','mg');
      var path=editor.getTitle().toLowerCase();
      while ((myArray = myRe.exec(txt)) !== null) {
        myKeys[myArray[1]]=path+":"+myArray[1].toLowerCase();
      };
      var ret=Object.keys(myKeys).map(item=>{
        return "\t"+item+':"'+myKeys[item]+'"';
      }).join(",\n");

      if(ret){
        ret="\n"+ret+"\n";
      };
      ret="\nvar "+name+"={"+ret+"};\n";
      editor.insertText(ret);
    };
    this.modalPanel.hide();
    this.restoreFocus();
  },

  storeFocus () {
    this.previouslyFocusedElement = document.activeElement
    return this.previouslyFocusedElement
  },

  restoreFocus () {
    if (this.previouslyFocusedElement && this.previouslyFocusedElement.parentElement) {
      return this.previouslyFocusedElement.focus()
    }
    atom.views.getView(atom.workspace).focus()
  },

  toggle() {
    if(this.modalPanel.isVisible()){
      this.modalPanel.hide();
      this.restoreFocus();
    } else {
      this.storeFocus();
      this.modalPanel.show();
      this.miniEditor.element.focus()
    }
  }



};
