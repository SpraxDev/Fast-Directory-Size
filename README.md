<p align="center">
  <a href="https://github.com/SpraxDev/fast-directory-size/actions/workflows/tests.yml">
    <img alt="Tests" src="https://github.com/SpraxDev/fast-directory-size/actions/workflows/tests.yml/badge.svg">
  </a>
  <a href="https://sonarcloud.io/dashboard?id=SpraxDev_fast-directory-size">
    <img alt="Quality Gate Status"
         src="https://sonarcloud.io/api/project_badges/measure?project=SpraxDev_fast-directory-size&metric=alert_status">
  </a>
</p>
# fast-directory-size
Node Module (+CLI) module to calculate the size of a directory.

It uses:
* [Sysinternals DU](https://docs.microsoft.com/en-us/sysinternals/downloads/du) on Windows, which is automatically
  downloaded at during the installation
* native `du` on other platforms

## Installation
```shell
$ npm i https://github.com/SpraxDev/fast-directory-size.git
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
