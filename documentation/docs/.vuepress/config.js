module.exports = {
  base: '/Api-Doc/',
  title: 'Api Doc',
  description: 'Guideline for Api Doc',
  dest: './../docs',
  head: [
    ['link', { rel: 'icon', href: '/vue-logo.png' }]
  ],
  themeConfig: {
    repo: 'https://github.com/joaomede/api-doc',
    repoLabel: 'Github',
  	nav: [
  		{ text: 'Home', link: '/' },
      { text: 'Introduction', link: '/pages/Introduction.md' }
     	],
    sidebar: {
      '/pages/': genSidebarConfig('Guide')
    },
  },

  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },
    extendMarkdown: md => {
      md.use(require("markdown-it-katex"));
    }
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'Introduction',
        'Docker',
        'Installation',
        'Contribution',
        'Internalization',
        'About',
      ]
    }
  ]
}