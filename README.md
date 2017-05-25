HTMLElementWatch
================

check changes in HTML elements and execute an trigger

## How to use

```````js

import { HTMLElementWatch } from 'html-element-watch'

const selector = document.querySelector('body > .container')
const watcher = new HTMLElementWatch(selector)

watcher.on('ADDED', target => console.log('added', target))

watcher.on('ADDED', target => console.log('removed', target))

watcher.start() // start monitor

watcher.stop() // stop monitor
```````
