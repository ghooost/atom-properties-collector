'use babel';

import AtomPropertiesCollectorView from './atom-properties-collector-view';
import { CompositeDisposable } from 'atom';

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

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-properties-collector:toggle': () => this.toggle(),
      'atom-properties-collector:apply': () => this.apply(),
      'atom-properties-collector:cancel': () => this.cancel(),
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
    return this.modalPanel.hide();
  },

  apply() {
    var editor = atom.workspace.getActiveTextEditor();
    if(editor){
      var txt=editor.getText();
      var str=this.modalPanel.element.querySelector('.syntax--text').innerHTML;
      editor.insertText(str)
    };
    return this.modalPanel.hide();
  },

  toggle() {
    console.log('AtomPropertiesCollector was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
