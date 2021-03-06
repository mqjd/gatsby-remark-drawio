const visit = require('unist-util-visit')

module.exports = ({ markdownAST }, { language = 'drawio', theme = 'default' } = {}) => {
  visit(markdownAST, 'code', node => {
    let lang = (node.lang || '').toLowerCase()
    console.info(`lang is ${lang}`)
    if (lang === language) {
      node.type = 'html'
      node.value = `<div class="drawio-viewer" url= "${node.value}"></div>`
    }
  })
}