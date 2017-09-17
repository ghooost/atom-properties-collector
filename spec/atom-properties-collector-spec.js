'use babel';

import AtomPropertiesCollector from '../lib/atom-properties-collector';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomPropertiesCollector', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-properties-collector');
  });

  describe('when the atom-properties-collector:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.atom-properties-collector')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-properties-collector:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.atom-properties-collector')).toExist();

        let atomPropertiesCollectorElement = workspaceElement.querySelector('.atom-properties-collector');
        expect(atomPropertiesCollectorElement).toExist();

        let atomPropertiesCollectorPanel = atom.workspace.panelForItem(atomPropertiesCollectorElement);
        expect(atomPropertiesCollectorPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'atom-properties-collector:toggle');
        expect(atomPropertiesCollectorPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.atom-properties-collector')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-properties-collector:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let atomPropertiesCollectorElement = workspaceElement.querySelector('.atom-properties-collector');
        expect(atomPropertiesCollectorElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'atom-properties-collector:toggle');
        expect(atomPropertiesCollectorElement).not.toBeVisible();
      });
    });
  });
});
