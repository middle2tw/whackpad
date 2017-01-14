# About whackpad
Whackpad is a community fork of the Hackpad web-based realtime wiki, based on the open source EtherPad collaborative document editor, which again is a fork of etherpad.

As Hackpad had been unmaintained by Dropbox since 2015, we decided to create a fork to allow contributions to be gathered to keep the codebase alive.

## Docker image
An automated build of master is available as [whackpad/whackpad](https://hub.docker.com/r/whackpad/whackpad/) on Docker. We cannot currently say anything about the stability of this image. For building your own please refer to the [Docker build instructions](DOCKER.md).

## Automated tests
There is a suite of automated tests available in [contrib/testing](contrib/testing). Having these executed automatically is [high on the agenda](https://github.com/whackpad/whackpad/issues/48). Any contributions towards this end, even getting them to run on your own machine, are highly welcomed.

## Contributing
Your contributions, whether ideas, documentation, feedback or code are much welcomed. You can join for a chat on #whackpad:chat.weho.st on [Matrix/Riot](https://riot.im/app/#/room/whackpad:chat.weho.st) or #hackpad on [freenode](https://freenode.net/).

We keep a list of [prioritized tasks](https://github.com/whackpad/whackpad/projects/1) which you are welcomed to work on. If you find any issues with the software, please check for any [existing issues](https://github.com/whackpad/whackpad/issues) before creating one.

## License
The whackpad package is distributed under the Apache License, Version 2.0.

All other packages are redistributed under their original license terms.  See [LICENSE.deps](LICENSE.deps.md) for a license summary of redistributed software.
