<p align="center">
  <a href="https://github.com/SpraxDev/Fast-Directory-Size/actions/workflows/tests.yml">
    <img alt="Tests" src="https://github.com/SpraxDev/Fast-Directory-Size/actions/workflows/tests.yml/badge.svg">
  </a>
  <a href="https://sonarcloud.io/dashboard?id=SpraxDev_Fast-Directory-Size">
    <img alt="Quality Gate Status"
         src="https://sonarcloud.io/api/project_badges/measure?project=SpraxDev_Fast-Directory-Size&metric=alert_status">
  </a>
</p>

# Fast-Directory-Size
Node Module (+CLI) module to calculate the size of a directory.

It uses:

* [Sysinternals DU](https://docs.microsoft.com/en-us/sysinternals/downloads/du) on Windows, which is automatically
  downloaded during the installation
* native `du` on other platforms

## Compatibility with the original project
This version of `fast-directory-size` *should* be fully compatible with version `1.3.0` of the
[original project](https://github.com/simoneb/fast-folder-size). You can see a list of my changes in
the [compare view](https://github.com/simoneb/fast-folder-size/compare/master...SpraxDev:master).

I forked the project because I wanted to use it in my project, but it was lacking TypeScript typings.
At that time, I thought it was easier just forking the project and recode it in TypeScript.
Then I started restructuring the project to feel more like my projects... You see where this is going, right?

## Installation

```Shell
$ npm i https://github.com/SpraxDev/Fast-Directory-Size.git
```

## Usage

### Programmatically

```TypeScript
import { getDirectorySize } from 'fast-directory-size';

getDirectorySize('./')
    .then((size) => {
      console.log(`${size} bytes`);
    })
    .catch((err) => console.error(err));
```

### Command line

```shell
fast-directory-size ./
```
