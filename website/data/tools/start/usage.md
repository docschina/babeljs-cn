<<<<<<< HEAD
```js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import read from 'start-read';
import babel from 'start-babel';
import write from 'start-write';
=======
```js title="JavaScript"
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import read from '@start/plugin-read'
import babel from '@start/plugin-lib-babel'
import write from '@start/plugin-write'
>>>>>>> 6f3a798ef90ebbb277153463a27655f15199c0f1

const start = Start(reporter());

export function build() {
  return start(
    files('lib/**/*.js'),
    read(),
    babel({ sourceMaps: true }),
    write('build/')
  );
}
```

<blockquote class="alert alert--info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/start-runner/babel">start-runner/babel 项目</a>。
  </p>
</blockquote>
