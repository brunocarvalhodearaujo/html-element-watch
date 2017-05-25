/* global MutationObserver Element */
import is from 'is'
import _ from 'lodash'

export class HTMLElementWatch {

  /**
   * @param {Element} selector
   */
  constructor (selector) {
    if (!(selector instanceof Element)) {
      throw new Error('o seletor a ser rastreado não foi definido')
    }
    this.selector = selector
    this.triggers = []
  }

  /**
   * watch changes in DOM elements and start trigger
   * @returns {void}
   */
  start () {
    this.observer = new MutationObserver(mutations => mutations.forEach(({ addedNodes, removedNodes }) => {
      const type = addedNodes.length ? 'ADDED' : 'REMOVED'
      this.triggers.filter(item => item.type === type).map(({ trigger }) => trigger(addedNodes.length ? addedNodes : removedNodes))
    }))
    this.observer.observe(this.selector, { attributes: true, childList: true, characterData: true })
  }

  /**
   * stop DOM change watch
   */
  stop () {
    if (!is.undefined(this.observer)) {
      this.observer.disconnect()
    }
  }

  /**
   * run an trigger on event init
   * @param {string} type type of trigger in [ ADDED, REMOVED ]
   * @param {array} callback trigger of action
   */
  on (type, ...callback) {
    _.map(callback, trigger => {
      if (!is.function(trigger)) {
        throw new Error('callback aceita apenas funções ou métodos')
      }
      this.triggers.push({ type, trigger })
    })
    return this
  }

}
